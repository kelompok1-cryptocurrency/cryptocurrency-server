const { User } = require('../models/index.js');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const nodemailer = require('nodemailer')



const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOLE);


class Controller {
    static userLogin(req, res, next){
        console.log('reached login') //del later
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
                        console.log({
                            id:data.id,
                            email:data.email,
                            access_token //del later
                        })
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
        console.log('reached register') //del later
        let {email,password} = req.body
        User.create({email,password})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>res.status(400).json(err.name))
    }


    static async home(req, res, next){
        
    }
    static async rates(req, res, next){
        try {
                let currency = await axios({
                    method:"GET",
                    url:`http://api.coinlayer.com/api/live?access_key=${process.env.CURRENCY_KEY}`
                })
                console.log(currency.data.rates)
                res.status(200).json({
                    rates:currency.data.rates
                })
        } catch (error) {
            // res.status(500).json(error)
        }
    }

    static async text(req, res, next){
        try {
                let holidayDate = await axios({
                    method:"GET",
                    url:`https://holidays.abstractapi.com/v1/?api_key=${process.env.HOLIDAY_KEY}&country=ID&year=2020&month=08&day=17`
                })
                let motivationQuote = await axios({
                    method:"GET",
                    url:"https://api.adviceslip.com/advice",
                })
                res.status(200).json({
                    holidayDate:holidayDate.data,
                    motivationQuote:motivationQuote.data.slip.advice
                })
        } catch (error) {
            // res.status(500).json(error)
        }
    }


    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.g_token,
                audience: process.env.CLIENT_ID_GOOLE,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            // console.log(req.headers.g_token,'<<<<<<<')
            // console.log({
            //     name:payload.name,
            //     email:payload.email,
            //     picture:payload.picture,
            // })
            let randomstring = Math.random().toString(36).slice(-8);
            // console.log(randomstring)

            User.findOne({
                where: {
                    email: payload.email
                }
            }).then(user => {
                // jika data usernya ada
                if (user) {
                    // lempar ke promise lagi
                    return user
                } else {
                    return User.create({
                        email: payload.email,
                        password: randomstring
                    })
                }
            }).then(user => {
                Controller.sendEmail(user.email, randomstring)
                let access_token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.JWT_SECRET)

                res.status(200).json({
                    id: user.id,
                    email: user.email,
                    access_token
                })
            }).catch(err => {
                next(err)
            })

            // res.status(200).json({
            //     name:payload.name,
            //     email:payload.email,
            //     picture:payload.picture,
            //     pw: randomstring
            // })
        } catch (err) {
            next(err)
        }
    }





    static sendEmail(email, pass) {
        //step 1
        //call transporter and authenticator
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pancakebantet@gmail.com',
                pass: 'coba@7890'
                //silahkan diisi, ini bisa diisi langung, bisa juga diisi dengan dotenv:
                //kalo gamau langsung coba liat dokumentasi dotenv
                //call with process.env.
                //.env di ignore
                //di dalem .env isi :
                //PASSWORD:
                //EMAIL:
                //referensi: https://www.youtube.com/watch?v=Va9UKGs1bwI&t

                // pancakebantet@gmail.com
                // coba@7890
            }
        })
        //step 2 define delivery path
        let mailOptions = {
            from: '',
            //jangan lupa diisi from-nya
            to: `${email}`,
            subject: 'Thank you!',
            text: `Thank you for registering on our website. this is your password "${pass}", please change it or you can use it`
        }
        //IMPORTANT!
        //Before sending, check you email provider regarding the authority for nodemailer use
        //for an example, you must turn on this feature if you use gmail: https://myaccount.google.com/lesssecureapps

        //Step 3 (Time to send it!)

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log('hooray! email is sent!')
            }
        })
    }
}

module.exports = Controller


