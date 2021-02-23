const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./Routes/UserRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', userRoutes);

module.exports = app;