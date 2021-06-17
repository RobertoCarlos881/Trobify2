const fs = require ('fs');
const path = require ('path');

exports.inicioSesion = async (req, res)=>{
    return res.status(200).send({
        status: 'succes',
        message : 'generando token'
    })
}