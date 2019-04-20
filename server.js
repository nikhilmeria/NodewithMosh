const winston = require('winston');
const express= require('express');
const app = express();
const port= process.env.PORT || 3500;

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/config')();
require('./startup/validateId')();
require('./startup/production')(app); 

//Node Server
app.listen(port, () => {
  winston.info(`Listening on POrt ${port}: `);
})