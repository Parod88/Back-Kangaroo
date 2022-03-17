'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocs = require('./swagger.json');
var dotenv = require('dotenv');
const cors = require('cors');

const loginRoutes = require('./routes/api/v1/login');
const jwt = require('./middlewares/jwtAuth');

//Create server express
const app = express();

// Config for load .env files
dotenv.config();

// Create connection database Mongo whit Mongoose
const connection = require('./services/connectionBD_Mongo');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// General functions server setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
const swagger = require('swagger-node-express');
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Directory static files
app.use(express.static(path.join(__dirname, 'public')));

//==================================================================
//Configura Swagger for documentation API
//==================================================================
app.use(
  '/api/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    explorer: true,
    swaggerOptions: {}
  })
);
swagger.setAppHandler(app);

//==================================================================
//Routes
//==================================================================
// Website routes
app.use('/', require('./routes/index'));

// Api routers
app.use('/api/v1/user', require('./routes/api/v1/users'));
app.use('/api/v1/advertisements', require('./routes/api/v1/advertisement'));
app.use('/api/v1/categories', require('./routes/api/v1/category'));
app.use('/api/v1/login', loginRoutes);

//==================================================================
//Errors
//==================================================================
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
