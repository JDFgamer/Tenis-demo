const User = require('../models/user');
const { authPassword, encriptedPassword } = require('../utils/encrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const createUser = async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !email) return res.status(400).send('Missing data')
    const userValidate = await User.findOne({ where: { email } })
    if (userValidate?.userGoogle) {
        const token = await jwt.sign({
            email: userValidate.email,
            name: userValidate.name,
            rol: userValidate.rol,
            id: userValidate.id,
            admin: userValidate.admin,
            userGoogle: userValidate.userGoogle
        }, process.env.SECRET.toString(), { expiresIn: 86400 } /* 24 horas */
        )
        return res.status(200).json(token)
    }
    if (userValidate) return res.status(400).send('already registered user')
    if (!password) {
        const newUserGoogle = await User.create({
            name,
            email,
            userGoogle: true
        })
        if (!newUserGoogle) return res.status(500).send('internal server error')
        const token = await jwt.sign({
            email: newUserGoogle.email,
            name: newUserGoogle.name,
            rol: newUserGoogle.rol,
            id: newUserGoogle.id,
            admin: newUserGoogle.admin,
            userGoogle: newUserGoogle.userGoogle
        }, process.env.SECRET.toString(), { expiresIn: 86400 } /* 24 horas */
        )
        return res.status(200).json(token)
    } else {
        const newUser = await User.create({
            name,
            password: await encriptedPassword(password),
            email,
        })
        if (!newUser) return res.status(500).send('internal server error')
        const token = await jwt.sign({
            email: newUser.email,
            name: newUser.name,
            rol: newUser.rol,
            id: newUser.id,
            admin: newUser.admin,
            userGoogle: newUser.userGoogle
        }, process.env.SECRET.toString(), { expiresIn: 86400 } /* 24 horas */
        )
        return res.status(200).json(token)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('missing data');
    const validateUser = await User.findOne({ where: { email } });
    if (!validateUser) return res.status(400).send('email not found');
    const validatePassword = authPassword(validateUser.password, password)
    if (!validatePassword) res.status(400).send('password not found');
    const token = jwt.sign({
        id: validateUser.id,
        name: validateUser.name,
        email: validateUser.email,
        admin: validateUser.admin,
        userGoogle: validateUser.userGoogle,
    }, process.env.SECRET.toString(), { expiresIn: 86400 })
    return res.status(200).json(token)
}

const upgradeUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const token = req.headers["x-access-token"];
    const decoder = jwt.verify(token, process.env.SECRET.toString());
    if (id != decoder.id) return res.status(400).send('invalid token')
    if (!name && !email && !password) return res.status(400).send('missing data');
    const validateUser = await User.findByPk(id);
    if (!validateUser) return res.status(400).send('user not found');
    if (validateUser.googleUser) return res.status(400).send('invalid user');
    const newUser = await User.update({
        name,
        email,
        password: await encriptedPassword(password)
    }, { where: { id } })
    if (!newUser) return res.status(500).send('failed create user')
    const newToken = jwt.sign({
        id: validateUser.id,
        name: validateUser.name,
        email: validateUser.email,
        admin: validateUser.admin,
        userGoogle: validateUser.userGoogle,
    }, process.env.SECRET.toString(), { expiresIn: 86400 })
    return res.status(200).json(newToken)
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    let token = req.headers["x-access-token"];
    const decoder = jwt.verify(token, process.env.SECRET.toString());
    if (id != decoder.id) return res.status(400).send('invalid token')
    await User.destroy({ where: { id } });
    return res.status(200).send('')
}


module.exports = {
    createUser,
    loginUser,
    upgradeUser,
    deleteUser
}