const express= require('express');
const route= express.Router();
const fnJoi= require('../Joi/rentalJoi');
const {Rental} = require('../models/rentalModel');
const {Movie} = require('../models/movieModel');
const {Customer} = require('../models/customerModel');


route.get('/', async (req, resp) => {
    const rentals = await Rental.find().sort('-dateOut');
    resp.send(rentals);
  });

route.get('/:id', async (req, resp) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return resp.status(404).send('The rental with the given ID was not found.');
  
    resp.send(rental);
});
  
route.post('/', async (req, resp) => {
    const joiResult= fnJoi(req.body);
    if(joiResult.error){
      resp.status(400).send(joiResult.error.details[0].message);
      return;
    }
  
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return resp.status(400).send('Invalid customer.');
  
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return resp.status(400).send('Invalid movie.');
  
    if (movie.numberInStock === 0) return resp.status(400).send('Movie not in stock.');
  
    let rental = new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone,
        isGold: customer.isGold,
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });
    rental = await rental.save();
  
    movie.numberInStock--;
    movie.save();
    
    resp.send(rental);
  });
  
module.exports=  route; 