const express = require('express');
const router = express.Router();

const {
    regjistroPerdorues,
    hyrPerdorues,
    merrPerdoruesAktual,
} = require('../controllers/perdoruesController');

const { mbrojt } = require('../middleware/authMiddleware');

router.post('/', regjistroPerdorues);
router.post('/hyr', hyrPerdorues);
router.get('/aktual', mbrojt, merrPerdoruesAktual);

module.exports = router;

