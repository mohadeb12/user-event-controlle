const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/envConfig');


const authouserCheck = async (req,res,next) =>{
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message : 'AccessToken is missing or invalid'});
    }
    const token = authHeader.split(' ')[1];

    try{ 
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
    
    }catch(err){
        return res.status(403).json({message: 'Invalide token ro expire'})
    };

};

const authAdminCheck = async(req, res, next) =>{
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message : 'AccesseToken is invalid'})
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.role !== 'admin'){
            return res.status(403).json({message : 'Access is denie. invialid'});
        }
        req.user = decoded;
        next();
    }catch(err){
        return res.status(403).json({message : ' invalid token or expire token'});
    }

};

module.exports = {authouserCheck,authAdminCheck};