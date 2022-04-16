require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {

    // cek jika header ada param authorization standar bearer
    if (req.headers.authorization) {
        // mengambil Bearer token dari header
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                return res.status(500).send({ auth: false, message: err })
            }
            next()
        })
    } else {
        res.status(401).send({
            auth: false,
            message: 'Token required'
        })
    }
}
