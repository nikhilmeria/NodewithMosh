const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = () => {
 //For handling errors outside express preview.
 winston.exceptions.handle(
   new winston.transports.File({
    filename: 'exceptionLogFile.log'
   }),
   new winston.transports.Console({
     colorize: true, 
     prettyPrint: true
   })
 )
  //For handling rejections(promise) outside express preview.
  process.on('unhandledRejection', (ex) => {
    console.log('Goolluu Rejection');
    throw(ex);
  })
  
  //for logging in console
  winston.add(
    new winston.transports.Console({
      colorize: true, 
      prettyPrint: true
    })
  );

  //for logging in log file
  winston.add(new winston.transports.File({filename:'logFile.log'}));

  //for logging in DB
  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost:27017/Log',
    level: 'info'
  }));  
}