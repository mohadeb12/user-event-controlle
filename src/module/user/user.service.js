const jwt = require('jsonwebtoken');
const User = require('./user.model');
const bcrypt = require('bcrypt');
const {REFRESH_TOKEN_EXPIRES_IN,ACCESS_TOKEN_EXPIRES_IN,JWT_SECRET} = require('../../config/envConfig')


exports.createUserService = async({name,email,password, role}) =>{
    const usercheck = await User.findOne({email});
    if(usercheck) throw new Error('user already exist');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({name,email, password: hashedPassword, role : role || 'user'});
    return await user.save();
};

exports.loginUserService = async({email, password}) =>{
    const user = await User.findOne({email}).select('+password');
    if(!user) throw new Error ('user not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error ( 'password dosenot match');

    const accessToken = jwt.sign(
        {_id : user._id, email: user.email, role : user.role },
        JWT_SECRET,
        {expiresIn :ACCESS_TOKEN_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
        {_id : user._id},
        JWT_SECRET,
        {expiresIn: REFRESH_TOKEN_EXPIRES_IN}

    );

    user.refreshToken = refreshToken;
    await user.save();

    return{accessToken,refreshToken,user};

};

exports.getAllUserService = async() => {
    const allUser = User.find().select('-password -refreshToken');
    return allUser;
};