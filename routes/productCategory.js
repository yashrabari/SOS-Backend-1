var express = require('express');
var router = express.Router();
const verifyUser = require('../middlewares/verifyUser');

// Yash: Require the controllers WHICH WE DID NOT CREATE YET!!
//  Rahul: Bhai It's Done!
var productCat_controller = require('../controllers/productCategory.controller');






router.use(verifyUser)


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', productCat_controller.test);


router.post('/create' , productCat_controller.productCategory_create);

router.get('/getAll', productCat_controller.productCategory_All);

router.get('/:id', productCat_controller.productCategory_details);

router.put('/:id/update', productCat_controller.productCategory_update);

router.delete('/:id/delete', productCat_controller.productCategory_delete);


module.exports = router;    