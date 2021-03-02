const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const workersRouter = require('./routes/workers');
const cutRouter = require('./routes/cut');
const cropRouter = require('./routes/crops');
const sellRouter = require('./routes/sells');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workers', workersRouter);
app.use('/cuts', cutRouter);
app.use('/crops', cropRouter);
app.use('/sells', sellRouter);

module.exports = app;
