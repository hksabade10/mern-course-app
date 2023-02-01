const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const db = process.env.MY_MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log('MongoDB connected...');
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = connectDB;

