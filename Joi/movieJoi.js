const Joi= require('joi'); // Joi is an class

//Function to use Joi for data validation
const fnJoi= (data) => {
    const schema = {
      title: Joi.string().min(5).max(50).required(),
      genreId: Joi.objectId().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(data, schema); //Joi.validate() returns an object.
  };

module.exports= fnJoi;