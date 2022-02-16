var express = require('express');
var logger = require('morgan');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./database/index')

//ROUTES
var albumRouter = require('./routes/album');

app.use('/album', albumRouter);


module.exports = app;
