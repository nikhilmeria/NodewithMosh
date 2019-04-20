const express= require('express');
const route= express.Router();
const fnJoi= require('../Joi/customerJoi');
const {Customer} = require('../models/customerModel'); 


route.get('/',  async (req,resp) => {
  const customers = await Customer.find().sort('name');
  resp.send(customers);
})

route.get('/:id', async (req,resp)=> {
  const customer = await Customer.findById(req.params.id);
  console.log('getGenre : ', getGenre);
  if(!customer){
    resp.status(404).send('Genre not found');
    return;
  }

  resp.send(customer);
})

route.post('/', async (req,resp) => {
  const joiResult= fnJoi(req.body);
  if(joiResult.error){
    resp.status(400).send(joiResult.error.details[0].message);
    return;
  }

  let customer = new Customer({ 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    });
    customer = await customer.save();
    
    resp.send(customer);

})

route.put('/:id', async (req,resp) => {
  //Validate with Joi using the Joi fnc 'fnJoi'
  const result= fnJoi(req.body);
  if(result.error){
    resp.status(400).send(result.error.details[0].message);
    return;
  }

  const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true });
  
    if (!customer) return resp.status(404).send('The customer with the given ID was not found.');
    
    resp.send(customer);
})

route.delete('/:id', async (req,resp)=> {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if(!customer){
    resp.status(404).send('Genre not found');
    return;
  }

  resp.send(customer);
})

module.exports= route;