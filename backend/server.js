const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ exteended: false}));


app.get('/' , (req, res) => {
    res.send('API i Librotekes po funksionon');
});

app.use('/api/perdoruesit', require('./routes/perdoruesRoutes'));
app.use('/api/librat', require('./routes/liberRoutes'));

app.listen(port, () => {
    console.log(`Serveri po punon ne porten ${port}`);
});
