const mercadopago = require("mercadopago");
require('dotenv').config()

mercadopago.configure({
    access_token: process.env.MERCADOPAGO,
});

module.exports = { mercadopago }