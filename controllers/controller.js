const { User } = require('../models/index.js');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

class Controller {
    static userLogin(req, res, next){
        let {email,password} = req.body
        User.findOne({
            where:{
                email
            }})
            .then(data=>{
                if (data) {
                    console.log(data)
                    let status = bcrypt.compareSync(password,data.password)
                    if (status) {
                        let access_token = jwt.sign({
                            id:data.id,
                            email:data.email
                        },process.env.JWT_SECRET)
                        res.status(200).json({
                            id:data.id,
                            email:data.email,
                            access_token
                        })
                    } else {
                        next({
                            status:"404",
                            message:"Wrong email/password"
                        })
                    }
                } else {
                    next({
                        status:"404",
                        message:"Wrong email/password"
                    })
                }
            })
            .catch(err=>next(err))
    }

    static userRegister(req, res, next){
        let {email,password} = req.body
        User.create({email,password}) //hash in db hooks -mas Hardim 2020
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>next(err))
    }

    static googleLogin(req, res, next){
        //welp
    }

    static home(req, res, next){
        
    }
}

module.exports = Controller


/*"use strict"

const axios = require("axios")

async function apiGetHoliday() {
    const key = '27c1007c-3436-438a-95b1-6542aa92a588'
    axios({
        method:"GET",
        url:`https://holidayapi.com/v1/holidays?pretty&key=${key}&country=ID&year=2019`
    })
    .then(data=>{message = data.data})
    .catch(err=>{return err})
}

async function apiGetMotivation() {
    axios({
        method:"GET",
        url:"https://api.adviceslip.com/advice",
    })
    .then(data=>{console.log(data.data)})
    .catch(err=>{return err})
}

async function apiGetCurrency(curr="") {
    const key = '2e19c000616e2e8908160923e2553fa5'
    axios({
        method:"GET",
        url:`http://api.coinlayer.com/api/live?access_key=${key}`
    })
    .then(data=>console.log(data.data.rates))
    .catch(err=>{return err})
}

apiGetHoliday()
apiGetMotivation()
apiGetCurrency() */