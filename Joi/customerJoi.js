const Joi= require('joi'); // Joi is an class

//Function to use Joi for data validation
const fnJoi= (data) => {
    const schema= {
      name: Joi.string().min(2).max(20).required(),
      phone: Joi.string().min(7).max(10).required(),
      isGold: Joi.boolean()
    };
  
    return Joi.validate(data, schema); //Joi.validate() returns an object.
  };

module.exports= fnJoi;