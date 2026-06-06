const express = require('express');
const router = express.Router();

const {
    merrLibrat,
    shtoLiber,
    ndryshoLiber,
    fshiLiber,
} = require('../controllers/liberController');

const { mbrojt } = require('../middleware/authMiddleware');

router.route('/')
    .get(mbrojt, merrLibrat)
    .post(mbrojt, shtoLiber);

router.route('/:id')
    .put(mbrojt, ndryshoLiber)
    .delete(mbrojt, fshiLiber);

module.exports = router;