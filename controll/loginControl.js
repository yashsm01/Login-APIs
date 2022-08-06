const users = require("../models/users");
const BirthDayReminder = require("./BirthDayReminder");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//To get all objects
const index = (req,res,next) => {
    users.find()
    .then((response) => {
        res.status(200).json({
            response
        })
    })
    .catch((err) => {
        res.status(400).json({
            message:"error Occures !"
        })
    })
};

//To Registor User
const store = (req,res,next) => {
    let body = req.body;

    bcrypt.hash(body.Password,10)
    .then(hashPass => {
        const url = req.protocol + "://" + req.get("host");
    let newUser = new users({
        Name: body.Name,
        Password: hashPass,
        Email: body.Email,
        Image: url + "/middleware/images/" + req.file.filename,
        BirthDate : body.BirthDate
    })
    newUser.save()
    .then((response) => {
        res.status(200).json({
            Message: "Sussfully Registor User",
            response
        })
    })
    .catch((err) => {
        res.status(400).json({
            message:"Fail To Registor..!"
        })
    })
    })
    .catch(err => {
        res.status(501).json({
            error: err
        })
    })
    
};

//To Login user And Authenicate
const authLogin = (req,res,next) => {
    var Email = req.body.Email;
    var password = req.body.Password;
    users.findOne({Email:Email})
    .then((user) =>{
       if(user){
           bcrypt.compare(password,user.Password)
           .then(result => {
            if(result){  
                var days = BirthDayReminder(user.BirthDate);
                res.status(200).json({
                    message:"Login Successfull ->",
                    _id: user._id,
                    DaysLeft: days,
                    user
                })
            }  else{
             res.status(500).json({
                 message:"Password Does Not Match!"
             })
         }
           })
           .catch(err => {
            res.json({
                error: err
            })
           }) 
       }  
       else
       {
            res.status(500).json({
                message:"No User Found!"
            })
        }
    })
    .catch(error =>{
        res.status(501).json({
            message:"An Error Occured!"
        })
    })

};

//To Get User Data From User Unique ID
const userProfile = (req,res,next) => {
    users.findOne({_id:req.body._id})
    .then((user) =>{
        var days = BirthDayReminder(user.BirthDate);
        var userData = {
            Name: user.Name,
            Email: user.Email,
            Image: user.Image,
            BirthDate: user.BirthDate,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            DaysLeft: days
        };
        if(days == ""){
            userData ={
                Name: user.Name,
                Email: user.Email,
                Image: user.Image,
                BirthDate: user.BirthDate,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                };
        }
        res.status(200).json({
            message:"Successfully Get User Data ",
            _id: user._id,
            user :userData
        })
    })
    .catch(error =>{
        res.status(501).json({
            message:"An Error Occured!"
        })
    })

};

module.exports = {index,store,authLogin,userProfile};