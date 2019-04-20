const winston = require('winston');

exports.error = (err,req,resp,next) => {
  winston.error(err.message, err);
  resp.status(500).send("Somethng is wrong AGAIN");
}

// exports.asyncMiddleware = (handler) => {
//     return async (req,resp,next) => {
//       try{
//         console.log('asyncMiddleware');
//         await handler(req,resp);
//       } 
//       catch(ex) {
//         next(ex);      
//       }
//     }
// }