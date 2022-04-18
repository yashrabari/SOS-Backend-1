const express = require('express');
const router = express.Router();
const uploadFile = require('../middlewares/singleUploadMiddleware');
const verifyUser = require('../middlewares/verifyUser');
const auth_controller = require('../controllers/auth.controller');



//admin authentication route
// router.post('/admin/register', auth_controller.adminRegister);
router.post('/admin/login', auth_controller.adminLogin);




//onboarder authentication route
router.post('/onboarder/register', verifyUser, auth_controller.onboarderRegister);
router.post('/onboarder/login', auth_controller.onboarderLogin);



//cafeuser authentication route
router.post('/cafeuser/login', auth_controller.cafeuserLogin);




module.exports = router;