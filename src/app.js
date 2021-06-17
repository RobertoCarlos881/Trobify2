const express = require('express');
const routes = require('./routes/index');
const path = require('path');//Cargar ruta de archivos
const exphbs = require("express-handlebars");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local');
let MySQLStore = require('express-mysql-session');
let flash = require('connect-flash');
require("./lib/passport");

const port="3000";



//crear una app de express
const app= express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieParser('hola como estas'));

let database = {
    connectionLimit: 100,
    host: 'localhost',
    port: '3306',
    database: 'trobify',
    user: 'roberto',
    password: '123456',
}

app.use(flash());

app.use(session({
    secret: 'ROBERTO Y PRAX',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

app.use( (req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.failure = req.flash('failure');
    app.locals.user = req.user;
    next();
});


app.use(passport.initialize());
app.use(passport.session());
/* passport.use(new passportLocal((username, password, done)=>{

})) */

//middlewares
app.use((req,res, next)=>{
    console.log(`${req.url} - ${req.method}`);
    next();
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));//leer los datos enviados por el formulario

//routes
app.use(routes);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
app.listen(port,()=>{
    console.log("The server is up")
});