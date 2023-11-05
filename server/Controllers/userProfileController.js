const userProfileModel = require('../Models/userProfileModel');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { func } = require('joi');
const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
    username : Joi.string().alphanum().min(3).max(10).required(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
});

function validation(username = "anything", email = "anything", password = "anything"){
    const valid = schema.validate({username, email, password});
    if (valid.error == undefined){
        return true;
    }else {
        return false;
    }
};

async function information(req, res){
    try{
        const userID = req.user.id;
        const theUser = await userProfileModel.getInfornation(userID);
        res.status(200).json(theUser);
    } catch(error){
        res.status(500).json(error);
    }
};

async function wishlist(req, res){
    try{
        const userID = req.user.id;
        const wishlist = await userProfileModel.getWishlist(userID);
        res.status(200).json(wishlist);
    } catch(error){
        res.status(500).json(error);
    }
};

async function history(req, res){
    try{
        const userID = req.user.id;
        const history = await userProfileModel.getWishlist(userID);
        res.status(200).json(history);
    } catch(error){
        res.status(500).json(error);
    }
};

async function editInformation(req, res){
    try{
        const {username, email} = req.body;
        const userID = req.user.id;
        let newData = validation(username, email);
        if (newData){
            const newuser = await userProfileModel.editInfo(userID, username, email);
            res.status(200).json(newuser);
        }else {
            res.status(400).json("invalid inputs");
        }
    } catch(error){
        res.status(500).json(error);
    }
};

async function editWishlist(req, res){
    try{
        const {product_id} = req.body;
        const userID = req.user.id;
        const wishlist = await userProfileModel.deleteFromWishlist(userID, product_id);
        res.status(200).json("has been deleted");
    } catch(error){
        res.status(500).json(error);
    }
};


module.exports = {
    information,
    wishlist,
    history,
    editWishlist,
    editInformation
};