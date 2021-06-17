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
router.get('/', async (req, res) =>{
  if(req.isAuthenticated()){ //Si ya esta logeado que lo lleve a home
    res.redirect('/index2');
  }
  else{ //Si no a la página principal
    const inmuebles = await pool.query('SELECT * FROM inmueble');
    res.render('index',{inmuebles});
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

router.post('/nuevoInmueble', async (req, res) =>{
  let { nombre, tipo_compra, ubicacion, latitud, longitud, precio, imagen, recamaras } = req.body;
  let data ={
    nombre,
    tipo_compra,
    ubicacion,
    latitud,
    longitud,
    precio,
    imagenes: imagen,
    recamaras_no: recamaras
  }
  await pool.query('INSERT INTO inmueble set ?', [data] );
  res.redirect('/');
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