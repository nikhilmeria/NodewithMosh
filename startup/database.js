const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
 //Setting up MongoDb
  mongoose.connect("mongodb+srv://hanuman:goolluu@we2india-00raw.mongodb.net/admin?retryWrites=true",
   {  
     useNewUrlParser: true,
     useCreateIndex : true
   }
  )
   .then(() => winston.info('Connected to DB, Vidly'))
 //  .catch(() => console.log('No connection to DB, Vidly')); //bcoz exception will log it.
}
