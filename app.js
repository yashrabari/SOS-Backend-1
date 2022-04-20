// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const { createPaymentLink } = require('./util/createPaymentLink');

//settingUpMorgan for logging logs
const morgan = require('morgan');
app.use(morgan('dev'));


// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: true },);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(formidable());


app.use(express.static('public'));

//home route
app.get('/', (req, res) => {
    res.send('You are at wrong place');
});


//authentication route
app.use('/auth', require('./routes/auth'));


//Cafe 
app.use('/temp-cafe', require('./routes/tempCafe'));

// CafeUsers
app.use('/cafe-user', require('./routes/cafeAuth'));

// Menu
app.use('/product', require('./routes/product'));

// Menu Category
app.use('/productCat', require('./routes/productCategory'));

// Customer
app.use('/customer', require('./routes/customer'));

// Tables
app.use('/table', require('./routes/table'));

//getting a authorized upload url of aws s3
app.use('/upload-files', require('./routes/uploadFiles'));



const port = 8000;

db.once('open', function () {
    console.log('Connected!');
    app.listen(port, () => {
        console.log('Server is up and running on port numner ' + port);
    });
});