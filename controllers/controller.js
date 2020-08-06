const { User } = require('../models/index.js');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const axios = require("axios")

class Controller {
    static userLogin(req, res, next){
        let {email,password} = req.body
        User.findOne({
            where:{
                email
            }})
            .then(data=>{
                if (data) {
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
                        res.status(400).json(err)
                    }
                } else {
                    res.status(404).json(err)
                }
            })
            .catch(err=>res.status(500).json(err))
    }

    static userRegister(req, res, next){
        let {email,password} = req.body
        User.create({email,password}) //hash in db hooks -mas Hardim 2020
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>res.status(400).json(err))
    }

    static googleLogin(req, res, next){
        //welp
    }

    static async home(req, res, next){
        try {
                let holidayDate = await axios({
                    method:"GET",
                    url:`https://holidays.abstractapi.com/v1/?api_key=${process.env.HOLIDAY_KEY}&country=ID&year=2020&month=08&day=17`
                })
                let motivationQuote = await axios({
                    method:"GET",
                    url:"https://api.adviceslip.com/advice",
                })
                let currency = await axios({
                    method:"GET",
                    url:`http://api.coinlayer.com/api/live?access_key=${process.env.CURRENCY_KEY}`
                })
                // console.log(holidayDate.data)
                // console.log(motivationQuote.data)
                // console.log(currency.data.rates)
                res.status(200).json("success")
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = Controller


