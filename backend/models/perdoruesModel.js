const mongoose = require('mongoose');

const perdoruesSchema = mongoose.Schema(
    {
        emri: {
            type: String,
            required: [true, 'Emri eshte i detyrueshem'],
        },
        email: {
            type: String, 
            required: [true, 'Email eshte i detyrueshem'],
            unique: true, 
        },
        password: {
            type: String,
            required: [true, 'Password eshte i detyrueshem'],
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Perdorues', perdoruesSchema);
