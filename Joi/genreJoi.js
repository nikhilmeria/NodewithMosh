const Joi= require('joi'); // Joi is an class

//Function to use Joi for data validation
const fnJoi= (data) => {
    const schema= {
      name: Joi.string().min(3).max(20).required()
    };
  
    return Joi.validate(data, schema); //Joi.validate() returns an object.
  };

module.exports= fnJoi;