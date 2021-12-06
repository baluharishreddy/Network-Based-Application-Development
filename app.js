//Importing modules
const express = require("express");
const morgan = require("morgan");
const eventRoutes = require('./routes/eventRoutes');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const userRoutes = require('./routes/userRoutes');
const mainRoutes = require('./routes/mainRoutes');

//Creating Application
const app = express();

//Configure Application
let port = 3000;
let host = "localhost";
app.set('view engine', 'ejs');


// connect to database
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/eventsdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });

    })
    .catch(err => console.log(err.message));


//Mount middleware functions
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'asfhjgjhbnhjabgnbm',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/eventsdb' }),
    cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.userName = req.session.userName || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    //console.log(req.session);
    next();
});

//Set up route
// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/contact', (req, res) => {
//     res.render('contact');
// });

// app.get('/about', (req, res) => {
//     res.render('about');
// });
app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
        //console.log(err.message);
        err.message = ("Internal Server Error");
    }
    res.render("error", { error: err });
});