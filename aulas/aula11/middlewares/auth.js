const jwt = require('jsonwebtoken');

function gerarToken(payload) {
    try {
        const expiresIn = "5m";
        const token = jwt.sign(payload, process.env.JWT_SEGREDO,{ expiresIn });
        return token;
    } catch(err){
        throw Error("Erro ao gerar um token");
    }
}

function verificarToken(req, res, next){}

module.exports = { gerarToken }
