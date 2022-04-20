const router = require('express').Router();
const Cafe_controller = require('../controllers/cafeAuth.controller');
const Order_Controller = require('../controllers/order.controller');

const verifyUser = require('../middlewares/verifyUser');






// router.use(verifyUser)



// Cafe Admin & STAFF Login
router.post('/login', Cafe_controller.login);

// Cafe Admin Activity 
router.post('/register',verifyUser, Cafe_controller.register);
router.get('/getAll',verifyUser,  Cafe_controller.getAllUsers);
router.delete('/delete/:id', verifyUser,  Cafe_controller.delete_staff);
// router.get('/getOne/:id', Cafe_controller.getOne);
// router.post('/update/:id', Cafe_controller.update);



// Order Routes
router.post('/TakeOrder', verifyUser, Order_Controller.createOrder);
router.post('/OrderDetails', verifyUser, Order_Controller.viewOrder);

// Cart Routes
router.post('/CreatCart', verifyUser, Order_Controller.createCart);



module.exports = router;