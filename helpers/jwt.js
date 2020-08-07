const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET)
}

const verifyToken = (payload) => {
    return jwt.verify(payload, SECRET)
}

module.exports = { generateToken, verifyToken }