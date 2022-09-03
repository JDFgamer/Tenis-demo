const router = require('express').Router();
const { createUser, deleteUser, loginUser, upgradeUser } = require('../controller/user');
const verifyToken = require('../middleware/authJwt')

router.post('/createuser', createUser);
router.post('/loginuser', loginUser);
router.put('/updateuser/:id', verifyToken, upgradeUser);
router.delete('/deteleuser/:id', verifyToken, deleteUser);


module.exports = router