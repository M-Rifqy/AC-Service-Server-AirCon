const db = require("../models");
const Orders = db.order;
const Users = db.users;

exports.order = async (req, res) => {
    // create a book
    const order = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      address:req.body.address,
      date: req.body.date,
      message: req.body.message,
      user_id: req.params.id
    };

    // save book in the database
    Orders.create(order)
      .then((data) => {
        res.json({
          message: "Order successfully.",
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

  exports.delete = async (req, res) => {
      Orders.destroy({
        where: {
            id: req.params.id
        }
      });
      res.status(200).json({ msg: "order deleted"})
  }


exports.getAllOrderUser = async (req, res) => {

    Orders.findAll({
        where: {
            user_id: req.params.id
        }
    })
    .then((data) => {
        // kalau kita berhasil mendapatkan data / database tidak kosong maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
        if(data.length > 0){
            res.status(200).send(data);
        }else{
            res.status(404).json({msg:"empty"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "err"
        });
    });

}


exports.updateOrder = async (req, res) => {
    Orders.update(req.body, {
        where:{
          id: req.params.id
        }
      }).then((data) => {
        // kalau kita berhasil mengupdate data maka akan menjalankan fungsi rs kalau sebaliknya maka akan menjalankan fungsi re
        if(data){
            res.status(200).send('updated');
        }else{
            res.status(400).json({msg:"update fail"});
        }
      }).catch((err) => {
        re(res, err);
      });
}


exports.getAllOrder = async (req, res) => {
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
    const order = await Orders.findAll({})
    res.status(200).send(order)

}