"use strict"

const {User} = require("../models/index.js")
const jwt = require("jsonwebtoken")

function authenticate(req,res,next) {
    let access_token = req.headers.access_token
    if (access_token) {
        let credential = jwt.verify(access_token,process.env.JWT_SECRET)
        User.findOne({where:{
            email:credential.email
        }})
        .then(data=>{
            req.access_id = data.id //mind this variable
            next()
        })
        .catch(err=>{
            next(err)
        })
    } else {
        next(new Error("Invalid token")) //IDK IF THIS WORKS
    }
}

module.exports = {authenticate}