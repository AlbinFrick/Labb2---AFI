const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
app.use(require('./routes/companies.js'));
app.use(require('./routes/adverts.js'));
app.use(morgan("dev"));

mongoose.connect('mongodb://localhost:27017/Adverts', {
    useNewUrlParser: true
});

//Fixa CORS!! npm i cors
app.use(cors())

app.get('/', (req, res) => {
    res.send('h3llo');
});

module.exports = app;