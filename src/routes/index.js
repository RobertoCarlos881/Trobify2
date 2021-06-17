const express = require ('express');
const router = express.Router();
const passport = require("passport");

//importar rutas
const sesion_controler = require
('../controllers/index.js');

var pool = require('../conexionDB');
const { isLoggedIn , isNotLoggedIn } = require('../lib/auth');

/*
 * Páginas comúnes
 */

//Página principal
router.get('/', (req, res) =>{
  if(req.isAuthenticated()){ //Si ya esta logeado que lo lleve a home
    res.redirect('/index2');
  }
  else{ //Si no a la página principal
    res.render('index');
  }
});

router.get('/api/inmuebles', async (req, res) => {
  const links = await pool.query('SELECT * FROM inmueble');
  return res.send(Object.values(links));
});

router.get('/index2', (req, res) =>{
  if(req.isAuthenticated()){
    res.redirect('/index2.html');
  }
  else {
    res.redirect('/login');
  }
});


/*
 * Páginas de signin/signup
 */

router.get('/login', (req, res) =>{
  if(req.isAuthenticated()){
    res.redirect('/index2');
  }
  else{
    res.redirect('/login.html');
  }
});

router.get('/register', (req, res) =>{
  if(req.isAuthenticated()){
    res.redirect('/index2');
  }
  else {
    res.redirect('/register.html');
  }
});

router.post('/login', async (req, res,next)=>{
  await isLoggedIn;
  passport.authenticate('local.login', {
    successRedirect: '/index2',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/index2',
  failedRedirect: '/register.html',
  failureFlash: true
}));

router.get('/logout', isLoggedIn, (req, res) =>{
  req.logOut();
  res.redirect('/');
});

module.exports = router;