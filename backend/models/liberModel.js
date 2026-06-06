const mongoose = require('mongoose');

const liberSchema = mongoose.Schema(
    {
        perdorues: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Perdorues',
        },
        titulli: {
            type: String,
            required: [true, 'Titulli eshte i detyrueshem'],
        },
        autori: {
            type: String,
            required: [true, 'Autori eshte i detyrueshem'],
        },
        kategoria: {
            type: String,
            required: [true, 'Kategoria eshte e detyrueshme'],
        },
        statusi: {
            type: String,
            enum: ['Dua ta lexoj', 'Po e lexoj', 'E perfundova'],
            default: 'Dua ta lexoj',
        },
        kopertina: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Liber', liberSchema);
