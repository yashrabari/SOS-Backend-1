const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser');
const auth_controller = require('../controllers/auth.controller');
const fileUploadController = require('../controllers/fileUpload.controller');


// router.use(verifyUser);

//admin authentication route
router.get('/', fileUploadController.getFileUpload);



module.exports = router;