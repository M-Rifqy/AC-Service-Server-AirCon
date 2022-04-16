const userController = require('../controllers/user.controller');
const orderController = require('../controllers/order.controller');
const router = require('express').Router();
const validation = require('../middleware/validation');
const verifyToken = require('../middleware/verify_token')

router.post('/register', validation.registerValidation, validation.runValidation, userController.register);
router.post('/login', validation.loginValidation, validation.runValidation, userController.login);
router.delete('/logout', userController.logout);
router.post('/order/:id', verifyToken.verifyToken,  orderController.order);
router.delete('/order/delete/:id', verifyToken.verifyToken, orderController.delete);
router.get('/order/list/:id', verifyToken.verifyToken,  orderController.getAllOrderUser);
router.put('/order/update/:id', verifyToken.verifyToken,  orderController.updateOrder);



module.exports = router;