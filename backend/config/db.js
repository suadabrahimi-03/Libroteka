const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB u lidh: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Gabim gjate lidhjes me MongoDB: %{error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

