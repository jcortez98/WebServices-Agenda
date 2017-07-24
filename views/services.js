var jwt = require('jsonwebtoken');
var services = {};
services.verificar = function(req,res,next){
    console.log("Funcion verificar ");
    var token = services.getToken();
    jwt.verify(token, '', function(error, decoded){
        if(err){
            return res.json =

            }
        }
    })
    jwt.
}

services.getToken = function(req, res){
    console.log("se llamo la funcion GetHeaders");
    var header = req.headers.authorization;
    if (typeof header != 'undefined'){
        var headerArray = header.split(" ");
        var token = headerArray.pop;
        if (token){
            return token;
        } else {
            console.log('no existe el token'),
            res.json({
                estado: false;
                mensaje: "NO esxiste el token"
            })
        }
    }else{
        console.log("NO existe la cabecera authorizacion");
        res.json({
            estado: false;
            mensaje: "NO existge la cabecera de Authorizacion")
        })
    }
}

module.exports = services;