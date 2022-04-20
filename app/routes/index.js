const userController = require('../controllers/user.controller');
const orderController = require('../controllers/order.controller');
const router = require('express').Router();
const validation = require('../middleware/validation');
const verifyToken = require('../middleware/verify_token')

//register
router.post('/register', validation.registerValidation, validation.runValidation, userController.register);
//login
router.post('/login', validation.loginValidation, validation.runValidation, userController.login);
//logout
router.delete('/logout', userController.logout);
//create order
router.post('/order/:id', verifyToken.verifyToken,  orderController.order);
//delete order
router.delete('/order/delete/:id', verifyToken.verifyToken, orderController.delete);
//list order berdasarkan user_id
router.get('/order/list/:id', verifyToken.verifyToken,  orderController.getAllOrderUser);
//edit order
router.put('/order/update/:id', verifyToken.verifyToken,  orderController.updateOrder);
//list semua order (hanya admin)
router.get('/order/list', verifyToken.verifyToken,  orderController.getAllOrder);
//list semua user (hanya admin)
router.get('/user/list', verifyToken.verifyToken,  userController.getAllUser);

module.exports = router;