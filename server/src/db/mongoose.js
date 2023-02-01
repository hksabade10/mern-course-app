const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const db = process.env.MY_MONGO_URI;

mongoose.connect(db, {
    useNewUrlParser: true
});
