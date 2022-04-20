const db = require("../models");
const Users = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// create a book
exports.register = async (req, res) => {
  // validate request
    if(req.body.password !== req.body.confPassword) return res.status(400).json({msg: "Konfirmasi password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create a book
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    confPassword:req.body.confPassword,
    no_telephone: req.body.phone_number,
    role: req.body.role
  };

  // save book in the database
  Users.create(user)
    .then((data) => {
      res.json({
        message: "Register successfully.",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while register.",
        data: null,
      });
    });
};

// retrieve all books
exports.login = async (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(401).json({
          message:
            "email tidak ditemukan"
        });
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if(!match) return res.status(400).json({msg: "Password dan Email tidak cocok"});
      else {
        const accessToken = jwt.sign(
          {
            userId: user.id, 
            name: user.name, 
            phone_number: user.no_telephone
          }, 
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '1d'
          }
        );
      const refreshToken = jwt.sign(
        {
          userId: user.id, 
          name: user.name, 
          phone_number: user.no_telephone
        }, 
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '1d'
        }
      );
      await Users.update({refresh_token: refreshToken},{
          where:{
              id: user.id
          }
      });
      res.cookie('refreshToken', refreshToken,{
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
      });
      return res.status(200).json({
        message: "welcome!",
        token: accessToken
      });
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "err"
      });
    });
}

//logout
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken) return res.status(204);
    Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    })
    .then(async user => {
    if(!user) return res.status(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.status(200).json({msg: "logout"});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "err"
      });
    });
    
}


exports.getAllUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findOne({
            where:{
                refresh_token: refreshToken
            }
        });
    if(!user) return res.sendStatus(403);
    if(user.role === "user"){
        return res.status(404).json({
            status: false,
            massage: "Only admin can access"
        })
    }
    const order = await Users.findAll({})
    res.status(200).send(order)

}