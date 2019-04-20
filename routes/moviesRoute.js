const express= require('express');
const route= express.Router();
const fnJoi= require('../Joi/movieJoi');
const {Movie} = require('../models/movieModel'); 
const {Genre} = require('../models/genreModel');


route.get('/', async (req, resp) => {
  const movies = await Movie.find().sort('name');
  resp.send(movies);
});

route.get('/:id', async (req, resp) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return resp.status(404).send('The movie with the given ID was not found.');

  resp.send(movie);
});

route.post('/', async (req, resp) => {
  const joiResult= fnJoi(req.body);
    if(joiResult.error){
      resp.status(400).send(joiResult.error.details[0].message);
      return;
    }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return resp.status(400).send('Invalid genre.');

  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  
  resp.send(movie);
});

route.put('/:id', async (req, resp) => {
  const joiResult= fnJoi(req.body);
    if(joiResult.error){
      resp.status(400).send(joiResult.error.details[0].message);
       return;
    }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return resp.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return resp.status(404).send('The movie with the given ID was not found.');
  
  resp.send(movie);
});

route.delete('/:id', async (req, resp) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return resp.status(404).send('The movie with the given ID was not found.');

  resp.send(movie);
});

module.exports=  route; 