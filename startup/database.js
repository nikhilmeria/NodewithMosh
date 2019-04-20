const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
 //Setting up MongoDb
  mongoose.connect("mongodb://localhost:27017/Vidly",
   {  
     useNewUrlParser: true,
     useCreateIndex : true
   }
  )
   .then(() => winston.info('Connected to DB, Vidly'))
 //  .catch(() => console.log('No connection to DB, Vidly')); //bcoz exception will log it.
}
