const router = require('express').Router();
const Cafe_controller = require('../controllers/cafeAuth.controller');
const verifyUser = require('../middlewares/verifyUser');






router.use(verifyUser)

router.post('/register', Cafe_controller.register);
// router.post('/login', Cafe_controller.login);
router.get('/getAll', Cafe_controller.getAllUsers);
// router.get('/getOne/:id', Cafe_controller.getOne);
// router.post('/update/:id', Cafe_controller.update);
// router.delete('/delete/:id', Cafe_controller.delete);


module.exports = router;