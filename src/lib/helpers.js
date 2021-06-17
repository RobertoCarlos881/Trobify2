const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
  //const salt = await bcrypt.genSalt(10);
  const salt = "$2a$10$luhs9q1h6hjDuDeB2ijOce";
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;


//Hash de nuestra contraseña (el 10 significa las veces que se cifrara)