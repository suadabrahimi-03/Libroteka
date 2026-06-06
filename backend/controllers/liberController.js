const asyncHandler = require('express-async-handler');
const Liber = require('../models/liberModel');

const merrLibrat = asyncHandler(async (req, res) => {
    const librat = await Liber.find({ perdorues: req.perdorues.id });

    res.status(200).json(librat);
});

const shtoLiber = asyncHandler(async (req, res) => {
    const { titulli, autori, kategoria, statusi, kopertina } = req.body;

    if (!titulli || !autori || !kategoria) {
        res.status(400);
        throw new Error('Ju lutem plotesoni titullin, autorin dhe kategorine');
    }

    const liber = await Liber.create({
        perdorues: req.perdorues.id,
        titulli,
        autori,
        kategoria,
        statusi,
        kopertina,
    });

    res.status(201).json(liber);
});

const ndryshoLiber = asyncHandler(async (req, res) => {
    const liber = await Liber.findById(req.params.id);

    if (!liber) {
        res.status(404);
        throw new Error('Libri nuk u gjet');
    }

    if (liber.perdorues.toString() !== req.perdorues.id) {
        res.status(401);
        throw new Error('Nuk je i autorizuar te ndryshosh kete liber');
    }

    const liberINdryshuar = await Liber.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(liberINdryshuar);
});

const fshiLiber = asyncHandler(async (req, res) => {
    const liber = await Liber.findById(req.params.id);

    if (!liber) {
        res.status(404);
        throw new Error('Libri nuk u gjet');
    }

    if (liber.perdorues.toString() !== req.perdorues.id) {
        res.status(401);
        throw new Error('Nuk je i autorizuar te fshish kete liber');
    }

    await liber.deleteOne();

    res.status(200).json({
        id: req.params.id,
        message: 'Libri u fshi me sukses',
    });
});

module.exports = {
    merrLibrat,
    shtoLiber,
    ndryshoLiber,
    fshiLiber,
};