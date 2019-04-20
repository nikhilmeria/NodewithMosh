const express= require('express');
const route= express.Router();
const bcrypt= require('bcrypt');
const fnJoi= require('../Joi/userJoi');
const auth = require('../middleware/auth');
const {User} = require('../models/userModel');

route.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  console.log(user);
  res.send(user);
});

route.post('/',  async (req,resp) => {
  const joiResult= fnJoi(req.body);
    if(joiResult.error){
      resp.status(400).send(joiResult.error.details[0].message);
      return;
    }

    //chk if the user is nt already registered
    let user= await User.findOne({email: req.body.email});
    if(user){
      return resp.status(400).send('user already registered');
    }

    user= new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    //Hashing password
    const salt= await bcrypt.genSalt(10);
    user.password=  bcrypt.hashSync(user.password, salt) ;
    await user.save()

    // resp.send(user); //we will not use way bcoz we dnt want to send password to users
    const token = user.generateAuthToken();
    resp.header('x-auth-token', token).send({
      id: user_id,
      name: user.name,
      email: user.email
    });
})

exports.route = route;