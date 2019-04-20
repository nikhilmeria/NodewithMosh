const express= require('express');
const route= express.Router();
const fnJoi= require('../Joi/genreJoi');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre} = require('../models/genreModel');


route.get('/',  async (req,resp) => {
  const listOfGenres= await Genre.find().sort('name')   
  resp.send(listOfGenres);
})

route.get('/:id', async (req,resp)=> {
  let getGenre= await Genre.findById(req.params.id);
  console.log('getGenre : ', getGenre);
  if(!getGenre){
    resp.status(404).send('Genre not found');
    return;
  }

  resp.send(getGenre);
})

route.post('/', auth, async (req,resp) => {
  const joiResult= fnJoi(req.body);
  if(joiResult.error){
    resp.status(400).send(joiResult.error.details[0].message);
    return;
  }

  let newGenre= new Genre({
    name: req.body.name
  });
  newGenre= await newGenre.save()
    .then(newGenre =>{
    resp.send(newGenre);
    })
    .catch((err) => console.log('newGenre err', err))

})

route.put('/:id', async (req,resp) => {
  //Validate with Joi using the Joi fnc 'fnJoi'
  const result= fnJoi(req.body);
  if(result.error){
    resp.status(400).send(result.error.details[0].message);
    return;
  }

  const uptGenre= await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name}, {new: true}) 
  //respond to whether genre found or not
  if(!uptGenre){
    resp.status(404).send('genre not found');
    return;
  }

  resp.send(uptGenre); 
})

route.delete('/:id',[auth, admin], async (req,resp)=> {
  let delGenre=await Genre.findByIdAndRemove(req.params.id);
  console.log('delGenre : ', delGenre);
  if(!delGenre){
    resp.status(404).send('Genre not found');
    return;
  }

  resp.send(delGenre);
})

exports.route = route;