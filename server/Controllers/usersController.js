const user = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
    username : Joi.string().alphanum().min(3).max(10).required(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
});

function validation(username, email, password){
    const valid = schema.validate({username, email, password});
    if (valid.error == undefined){
        return true;
    }else {
        return false;
    }
};

async function register(req, res){
    try{
        const {username, email, password} = req.body;
        const valid = validation(username, email, password);
        if (valid){
            const hashPassword = await bcrypt.hash(password, 10);
            const add = user.addUser(username, email, hashPassword);
            add.then((result) => {
                console.log(result);
                res.status(201).json("User added successfuly");
            }).catch((error) => {
                console.log("here3");
                res.status(400).json(error.detail);
            });
        } else{
            res.status(400).json({error : "values is not valid or one missing"});
        }
    }catch (error){
        res.status(501).json(error);
    }
};

async function login(req, res){
    try{
        const {email, password} = req.body;
        const valid = validation("anything", email, password);
        if (valid){
            const getUser = user.login(email);
            getUser.then((value) => {
                bcrypt.compare(password, value.password, (error, result) => {
                    if (error) {
                        res.status(400).json('email not found');
                    } else if (result) {
                        const accessToken = jwt.sign({id : value.id, username : value.username, email : value.email},process.env.SECRET_KEY, {expiresIn: '1h'});
                        res.cookie('token', accessToken, { httpOnly: true });
                        res.status(200).json(accessToken);
                    } else {
                        res.status(400).json('incorrect password');
                    }
                  });
            }).catch((error) => {
                res.status(400).json(error.detail);
            });
        } else {
            res.status(400).json({error : "values is not valid"});
        }
    } catch(error){
        res.status(500).json("error in login");
    }
};

function cont(req, res){
    res.status(200).json("you are in");
};


module.exports = {
    register,
    login,
    cont,
};

// const isValid = bcrypt.compare(value.rows[0].password, password);
//                 isValid.then((result) => {
//                     console.log(result);
//                     if (result) {
//                         const accessToken = jwt.sign({id : value.rows[0].id, username : value.rows[0].username, email : value.rows[0].email},process.env.SECRET_KEY, {expiresIn: '1d'});
//                         res.status(201).json(accessToken);
//                     } else {
//                         res.status(400).json('incorrect password');
//                     }
//                 }).catch((error) =>{
//                     res.status(400).json("incorrect password");
//                 })