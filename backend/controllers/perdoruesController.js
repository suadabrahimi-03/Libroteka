const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Perdorues = require('../models/perdoruesModel');

const gjeneroToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

};

const regjistroPerdorues = asyncHandler(async (req, res) => {
    const {emri, email, password} = req.body;

    if (!emri || !email || !password) {
        res.status(400);
        throw new Error('Ju lutem plotesoni te gjitha fushat');
    }

    const perdoruesEkziston = await Perdorues.findOne({email});

    if(perdoruesEkziston) {
        res.status(400);
        throw new Error('Ky email eshte rregjistruar me pare');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const perdorues = await Perdorues.create({
        emri,
        email, 
        password: passwordHash,
    });

    if (perdorues) {
        res.status(201).json({
            _id: perdorues.id,
            emri: perdorues.emri,
            email: perdorues.email,
            token: gjeneroToken(perdorues._id),
        });
    } else {
        res.status(400);
        throw new Error('Te dhenat e perdoruesit nuk jane te sakta');
    }
});

const hyrPerdorues = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const perdorues = await Perdorues.findOne({email});

    if (perdorues && (await bcrypt.compare (password, perdorues.password))) {
        res.json ({
            _id: perdorues.id,
            emri: perdorues.emri,
            email: perdorues.email,
            token: gjeneroToken(perdorues._id),
        });
    
    } else {
        res.status(400);
        throw new Error('Email ose password eshte i pasakte');
    }
});

const merrPerdoruesAktual = asyncHandler(async (req, res) => {
    res.json(req.perdorues);
});

module.exports = {
    regjistroPerdorues,
    hyrPerdorues,
    merrPerdoruesAktual,
};


