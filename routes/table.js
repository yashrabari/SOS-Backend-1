var express = require('express');
var router = express.Router();
const verifyUser = require('../middlewares/verifyUser');

// Require the controllers WHICH WE DID NOT CREATE YET!!
var table_controller = require('../controllers/table.controller');

router.use(verifyUser)


// a simple test url to check that all of our files are communicating correctly.


router.post('/create', table_controller.table_create);

router.get('/:id', table_controller.table_details);

router.get('/TablesList', table_controller.tabel_all);

router.put('/:id/update', table_controller.table_update);

router.delete('/:id/delete', table_controller.table_delete);



module.exports = router;    