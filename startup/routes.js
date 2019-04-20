const express= require('express');
const homeRoute = require('../routes/homeRoute');
const {route: genreRoute} = require('../routes/genreRoute');
const moviesRoute = require('../routes/moviesRoute');
const rentalRoute = require('../routes/rentalRoute');
const customerRoute = require('../routes/customerRoute');
const {route: userRoute} = require('../routes/userRoute');
const authRoute= require('../routes/authRoute');
const {error}= require('../middleware/error');

module.exports = (app) => {
    app.use(express.json()); //bodyParser Middleware. Use it first b4 any routes.

    app.use('/api/genres', genreRoute); 
    app.use('/api/customers', customerRoute);
    app.use('/api/movies', moviesRoute);
    app.use('/api/rental', rentalRoute);
    app.use('/api/user', userRoute);
    app.use('/api/auth', authRoute);
    app.use('/', homeRoute);

    app.use(error); //express error handling middleware, so only for errors in process request pipeline ie in route handlers.
}