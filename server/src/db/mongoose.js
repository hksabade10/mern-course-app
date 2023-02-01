const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

const db = process.env.MY_MONGO_URI;

await mongoose.connect(db, {
    useNewUrlParser: true
});
