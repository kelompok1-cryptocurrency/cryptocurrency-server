"use strict"

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
apiGetCurrency()

//use this as copy/paste and delete this file later (i cannot export it as a function :((   )