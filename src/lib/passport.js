const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var pool = require('../conexionDB.js');
const helpers = require('./helpers.js');

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, Nombre, pass, done) => {
  console.log(Nombre);
  console.log(pass);
  const rows = await pool.query('SELECT * FROM usuario WHERE Nombre = ?', [Nombre]);
  console.log(rows);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(pass, user.pass.toString());
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.Nombre));
    } else {
      done(null, false, req.flash('failure', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('failure', 'El correo no existe.'));
  }
}));

passport.use('local.register', new LocalStrategy(
  async function(username, password, done) {
    console.log(username);
    console.log(password);
    //const { username } = req.body;
    const newUser ={
      Nombre: `${username}`,
      sexo: 'otro',
      correoE: 'example@example.com',
      pass: `${password}`,
      fechaNac: '2000-04-19',
      tipoUsuario: 'normal'
    };
    newUser.pass = await helpers.encryptPassword(password);
    console.log(newUser.pass);
    const result = await pool.query('INSERT INTO usuario SET ?', [newUser]);
    console.log(result);
    const user = newUser;
    console.log(newUser);
    //newUser.email = result.insertId;
    //newUser.curp = result.insertId;
    return done(null, newUser);
  }
));


passport.serializeUser((user,done) =>{
  done(null, user.Nombre);
});

passport.deserializeUser(async (Nombre, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE Nombre = ? ', [Nombre]);
  done(null, rows[0]);
});