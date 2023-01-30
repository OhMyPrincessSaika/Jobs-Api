const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');
const {UnauthenticatedError} = require('../errors')
const register = async( req, res) => {
    const {name, email, password} = req.body;
    // if(!name || !email || !password) {
    //     throw new BadRequestError('Please provide name,password and email')
    // }
    const user = await User.create({...req.body});
    const token = await user.createJWT()

    res.status(StatusCodes.CREATED).json({user : {name : user.name} , token})
}
const login =  async (req, res) => {
    const {email, password}  = req.body;
    if(email=="" || password=="") {
        throw new BadRequestError('Please provide name and password')
    }
    const user = await User.findOne({email});
  
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const isPassWordCorrect = await user.comparePass(password);
    console.log(isPassWordCorrect)
    if(!isPassWordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({user : {username : user.name} , token})
}

module.exports = {
    register,
    login
}