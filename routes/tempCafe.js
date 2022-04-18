const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser');
const tempCafeController = require('../controllers/tempCafe.controller');


router.use(verifyUser)

router.get('/', tempCafeController.getAllTempCafe);
router.get('/otp/:id', tempCafeController.generateOTP);
router.get('/payment-link/:id', tempCafeController.generatePaymentLink);
router.post('/verify-otp/:id', tempCafeController.verifyOTP);
router.get('/:id', tempCafeController.getTempCafeById);
router.put('/:id', tempCafeController.updateTempCafe);
router.delete('/:id', tempCafeController.deleteTempCafe);
router.post('/', tempCafeController.createTempCafe);


module.exports = router;