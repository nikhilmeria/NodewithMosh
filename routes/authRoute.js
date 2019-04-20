const express= require('express');
const route= express.Router();
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const fnJoi= require('../Joi/authJoi');
const {User}= require('../models/userModel');

//for logging in User
route.post('/',  async (req,resp) => {
  const joiResult= fnJoi(req.body);
    if(joiResult.error){
      resp.status(400).send(joiResult.error.details[0].message);
      return;
    }

    //chk if the user is already registered
    let user= await User.findOne({email: req.body.email});
    if(!user){
      return resp.status(400).send('Invalid email id');
    }
    else{
      const validPassword= await bcrypt.compare(req.body.password, user.password);
      if(!validPassword){
        return resp.status(400).send('Invalid password');
      }
      else{
        const jwtToken= jwt.sign({id: user._id}, 'jwtprivateKey');
        resp.send(jwtToken);
      }
    }
})

module.exports= route;
