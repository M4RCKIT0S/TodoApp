const mongoose = require('mongoose');
const User = require('../Models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req,res)=>{
    try{
        const {username, name, email, password} = req.body;
        const salt = await bcrypt.genSaltSync(9);
        const passwordHashed = await bcrypt.hashSync(password,salt);
        const user = new User({
            username, name, email, password: passwordHashed
        });
        const savedUser = await user.save()
        return res.status(200).send({message:'User registered succesfully', savedUser});
    }catch(error){
        return res.status(500).send({message:'Error creating user', error});
    }
}
const login = async(req,res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isValidLogin = await bcrypt.compareSync(password, user.password);
        if(isValidLogin){
            const token = await jwt.sign({id: user._id, username, email: user.email}, process.env.token_key,{expiresIn:'1h'});
            return res.status(200).send({success:true, message:'Login succesfully', token});
        }
        return res.status(403).send({success: false, message: 'Invalid credentials'});
    } catch (error) {
        return res.status(403).send({success: false, message: 'Invalid credentials'});
    }
 }
const getUserById = async(req,res)=>{
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.token_key);
        const user = await User.findById(decoded.id);
        return res.status(200).send({success: true, message:'User found succesfully', user});
    } catch (error) {
        return res.status(404).send({success: false, message:'Error finding user'});
    }
}
const deleteUser = async(req,res)=>{
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.token_key);
        const deletedUser = await User.findOneAndDelete({_id: decoded.id});
        return res.status(200).send({message:'User deleted succesfully', deletedUser});
    }catch(error){
        return res.status(404).send({message:'User to be deleted not found'});
    }
}
const updateUser = async(req,res)=>{
    try {
        if(!req.body.password){
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, process.env.token_key);
            const entries = Object.keys(req.body);
            const updates ={};
            for(let i=0;i<entries.length;i++){
              updates[entries[i]] = Object.values(req.body)[i];
            }
            console.log(updates);
            const userUpdated = await User.findByIdAndUpdate(decoded.id,{$set:updates},{runValidators: true, new:true});
            return res.status(200).send({success: true, userUpdated});
        }else{
            return res.status(400).send({succes:false, message:'Can´t update password'})
        }
    } catch (error) {
        return res.status(404).send({success: false, message: 'User not found'})
    }
}


module.exports = {
    register,
    login,
    getUserById,
    deleteUser,
    updateUser
}