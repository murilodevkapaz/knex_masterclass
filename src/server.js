const express = require('express');
const knex = require('./database');
const app = express();

app.get('/users', (req, res)=>
     knex('users')
        .then(results=> res.json(results))
)

app.listen(3333, ()=> console.log('Server is running!'));

