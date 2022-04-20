const { check, validationResult } = require('express-validator');
const db = require("../models");
const Users = db.users;


exports.runValidation = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            status: false,
            massage: errors.array()[0].msg
        })
    }
    next();
}

exports.registerValidation = [
    check('name', 'name cant be empty').notEmpty().isLength({min: 6}).withMessage('your name is too short').isAlphanumeric(),
    check('password', 'password cant be empty').notEmpty().isLength({min: 8}).withMessage('your password is to short').isStrongPassword().withMessage('Password must contain uppercase, lowercase letters, symbols, numbers and at least 8 characters'),
    check('email', 'email cant be empty').notEmpty().isEmail().normalizeEmail(),
    check('phone_number', 'phone_number cant be empty').notEmpty().isNumeric().withMessage('only can input number').isMobilePhone() 
]

exports.loginValidation = [
    check('password', 'password cant be empty').notEmpty().isLength({min: 8}).withMessage('your password is to short'),
    check('email', 'address cant be empty').notEmpty().isEmail()
]
