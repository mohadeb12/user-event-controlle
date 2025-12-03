const {createUserService,loginUserService,getAllUserService} = require('./user.service');



exports.createUserController = async(req,res) =>{
    try{
        const user = await createUserService(req.body);
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({message : err.message})
    };
}
exports.loginUserController = async( req, res) =>{
    try{
        const {accessToken,refreshToken,user} = await loginUserService(req.body);
        res.status(200).json({
            accessToken,
            refreshToken,
            user : {id: user._id, email: user.email}
        });

    }catch(err){
        res.status(500).json({message : err.message})
    };
    
};


exports.getAllUserController = async(req,res) =>{
    try{
        const allUser = await getAllUserService();
        res.status(200).json(allUser);
    }catch(err){
        res.status(500).json({message : err.message});
    }
};
