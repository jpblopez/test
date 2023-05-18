const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.DATABASE_URI);

    console.log(`DATABASE CONNECTED: ${conn.connection.host}`);
};

module.exports = connectDB;