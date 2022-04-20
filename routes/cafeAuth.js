const router = require('express').Router();
const Cafe_controller = require('../controllers/cafeAuth.controller');
const Order_Controller = require('../controllers/order.controller');
const Cart_Controller = require('../controllers/cart.controller');

const verifyUser = require('../middlewares/verifyUser');






// router.use(verifyUser)



// Cafe Admin & STAFF Login
router.post('/login', Cafe_controller.login);

// Cafe Admin Activity 
router.post('/register',verifyUser, Cafe_controller.register);
router.get('/getAll',verifyUser,  Cafe_controller.getAllUsers);
router.delete('/delete/:id', verifyUser,  Cafe_controller.deleteUser);
router.get('/getOne/:id', Cafe_controller.getOneUser);
router.put('/update/:id', Cafe_controller.updateUser);



// Order Routes
router.post('/TakeOrder', verifyUser, Order_Controller.createOrder);
router.get('/OrderDetails', verifyUser, Order_Controller.viewOrder);
router.put('/UpadteOrder', verifyUser, Order_Controller.updateOrder);
router.delete('/DeleteOrder', verifyUser, Order_Controller.deleteOrder);


// Cart Routes
router.post('/CreatCart', verifyUser, Cart_Controller.createCart);
router.post('/CartItem', verifyUser, Cart_Controller.createCartItem);
router.put('/Update-CartItem', verifyUser, Cart_Controller.updateCartItem);


module.exports = router;