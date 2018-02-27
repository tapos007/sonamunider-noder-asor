const express = require('express');
const cons = require('consolidate');
const mongoose = require('mongoose');
const flash = require('express-flash-2');
const session = require('express-session');
const  bodyParser = require('body-parser');
const app = express();

// assign the swig engine to .html files
app.engine('html', cons.nunjucks);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// add body parser here
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// end body parser code

mongoose.connect('mongodb://localhost/blogApplication');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connection open");
});
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized:true}));
// use  the flash middleware
app.use(flash());
var AdminCategoryRoute = require('./route/adminCategoryRouter');

// all my route find loaded here
app.use('/admin/category', AdminCategoryRoute);
app.get('/', (req, res) => res.send('Hello World! dfdf'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));