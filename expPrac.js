//RestFul Services using Express

const express = require('express');
const Joi = require('joi');

let app = express();


let port = process.env.PORT || 3000;
let users = [
    { name: 'BabyHanuman' },
    { name: 'Nikhil' },
    { name: 'Jadu' },
];

app.get('/home', ((req, resp) => {
    //  resp.send('Hello Baby Hanuman');
    console.log('User GET', users);
    resp.send(users);
}));

//Route with parameter
app.get('/:name', ((req, resp) => {
    resp.send(req.params.name);
}));

app.use(express.json()); // Middleware to parse 'post' request.
app.post('/api/users', ((req, resp) => {
    const schema = {
        name: Joi.string().min(3).required(),
    }
    let joiValidateObj = Joi.validate(req.body, schema);
    if (joiValidateObj.error) {
        resp.status(400).send(joiValidateObj.error.details[0].message);
        return;
    }
    users.name = req.body.name;
    console.log('User POST', users);
    resp.send(users);
}));

app.put('/api/users/:name', ((req, resp) => {
    const schema = {
        name: Joi.string().min(3).required(),
    }
    let joiValidateObj = Joi.validate(req.body, schema);
    if (joiValidateObj.error) {
        resp.status(400).send(joiValidateObj.error.details[0].message);
        return;
    }
    users.name = req.params.name;
    console.log('User PUT', users);
    resp.send(users);
}));

app.delete('/api/users/:name', ((req, resp) => {
    if (users.name === req.params.name) {
        console.log('User DELETE= ', req.params.name);
        delete users.name;
    }
    resp.send(users);
}));


app.listen(port, () => {
    console.log(`Listening to port = ${port}`);
});

