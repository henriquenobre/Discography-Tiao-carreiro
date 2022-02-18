var express = require('express');
var logger = require('morgan');
var app = express();
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions))  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


require('./database/index')

//ROUTES
const albumRouter = require('./routes/album');
const faixaRouter = require('./routes/faixa')

app.use('/album', albumRouter);
app.use('/faixa', faixaRouter);



module.exports = app;
