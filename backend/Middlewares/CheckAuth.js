const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.token_key);
        req.userData = decoded;      
        next();
    }catch(error){
        return res.status(403).send({message:'Invalid token', success:'false'});
    }
}
module.exports = checkToken