const router = require('express').Router();
const { createCourt, listCourt, filterCourt, userPayment, userReserved, listCourtAdmin } = require('../controller/court')
const verifyToken = require('../middleware/authJwt')

router.post('/createcourt', createCourt);
router.get('/listcourt', listCourt);
router.get('/filtercourt', filterCourt);
router.get('/courtpayment/:courtId', verifyToken, userPayment);
router.get('/courtreserved/:courtId', verifyToken, userReserved);

router.get('/admin/listcourt', verifyToken, listCourtAdmin);

module.exports = router