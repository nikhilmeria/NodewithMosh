const Joi= require('joi'); // Joi is an class

//Function to use Joi for data validation
const fnJoi= (data) => {
    const schema = {
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required()
    };
  
    return Joi.validate(data, schema); //Joi.validate() returns an object.
  };

module.exports= fnJoi;