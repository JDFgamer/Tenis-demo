const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const routes = require('./router/index')

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//rutas

app.use('/api', routes)

module.exports = app;