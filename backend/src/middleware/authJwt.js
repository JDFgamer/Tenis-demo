const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('no token provider');
    const decoder = jwt.verify(token, process.env.SECRET.toString());
    const validateUser = await User.findByPk(decoder.id);
    if (!validateUser) return res.status(404).send('user not found');
    next();
}

module.exports = verifyToken;