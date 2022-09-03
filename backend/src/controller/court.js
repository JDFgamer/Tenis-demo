const Court = require('../models/court');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { mercadopago } = require('../utils/mercadopago')

const createCourt = async (req, res) => {
    const { type, price, availableDate, turn } = req.body;
    if (!type || !price || !availableDate || !turn) return res.status(404).send('missing data');
    const token = req.headers["x-access-token"];
    const decoder = jwt.verify(token, process.env.SECRET.toString());
    if(!decoder.admin) return res.status(400).send('dont have permissions to the action')
    const date = new Date(availableDate);
    const options = { day: "numeric", month: "numeric", year: "numeric", timeZone: 'UTC' };
    const newDate = date.toLocaleDateString("es-ES", options).replaceAll('/', '-');
    const newCourt = await Court.create({
        type,
        price,
        availableDate: newDate,
        turn,
    })
    if(!newCourt) return res.status(500).send('faild creation court')
    return res.status(200).json('success creation')
}

const listCourt = async (req, res) => {
    const courtList = await Court.findAll({
        where: {
            reserved: false
        }
    }
    );
    return res.status(200).json(courtList)
}

const filterCourt = async (req, res) => {
    let { date } = req.query;
    if (!date) return res.status(400).send('missing date data')
    date = new Date(date);
    const options = { day: "numeric", month: "numeric", year: "numeric", timeZone: 'UTC' };
    const newDate = date.toLocaleDateString("es-ES", options).replaceAll('/', '-');
    const filterCourt = await Court.findAll({
        where: {
            availableDate: newDate,
            reserved: false
        }
    })
    console.log(filterCourt.length);
    if (filterCourt.length === 0) return res.status(400).send('date not available')
    return res.status(200).json(filterCourt)
}

const listCourtAdmin = async (req, res) => {

    const courtList = await Court.findAll({
        where: {
            reserved: true
        }
    }
    );
    courtList.sort((a,b)=>{
      return a.id - b.id
    })
    return res.status(200).json(courtList)
}

const userPayment = async (req, res) => {
    const { courtId } = req.params;
    const court = await Court.findByPk(courtId)
    const trolley = {
        items: [
            {
                title: `La cancha ${court.type} sera reservada el dia ${court.availableDate} para el turno ${court.turn}`,
                currency_id: "ARS",
                quantity: 1,
                unit_price: court.price
            }
        ],
        back_urls: {
            success: "http://localhost:3000/congrats",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/congrats",
        },
    }
    mercadopago.preferences.create(trolley)
        .then((response) => {
            res.status(200).json(response.body.init_point)
        })
        .catch((err) => {
            console.log(err)
        })
}

const userReserved = async (req, res) => {
    const { courtId } = req.params;
    const token = req.headers["x-access-token"];
    const decoder = jwt.verify(token, process.env.SECRET.toString());
    const user = await User.findByPk(decoder.id)
    const court = await Court.update({
        reserved: true
    }, { where: { id: courtId } }, { attributes: [courtId] })
    user.addCourt(court)
    return res.status(200).send('reserved court')
}

module.exports = {
    createCourt,
    listCourt,
    filterCourt,
    userPayment,
    userReserved,
    listCourtAdmin
}