const connectDB= require('../conexionDB')

connectDB.conexion;

connectDB.connect;

const index=(req, res)=>{
    res.redirect('index.html');
}

const lista=(req, res)=>{
    res.redirect('resultados');
}


const registro=(req, res)=> {
    console.log('se pidio un metodo post')
}

module.exports={
    index,
    lista,
    registro
};