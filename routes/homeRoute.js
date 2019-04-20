const express= require('express');
const route= express.Router();
const winston = require('winston');

route.get('/', (req,resp) => {
  winston.info('from HOME ...');
  resp.send('Baby Hanuman');
})
  
route.get('/:name/:age', (req,resp) => {
    resp.send(req.params);
})

module.exports= route;