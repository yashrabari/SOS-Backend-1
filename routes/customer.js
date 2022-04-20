var express = require('express');
var router = express.Router();
const verifyUser = require('../middlewares/verifyUser');

var Customer_controller = require('../controllers/customer.controller');


router.post('/Register', Customer_controller.create_sosUser);

router.get('/:id', Customer_controller.getSosUser);


module.exports = router;    
