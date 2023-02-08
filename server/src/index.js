const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const connectDB = require('./db/mongoose');

connectDB();

const userRouter = require('./routers/user');
const courseRouter = require('./routers/course');

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(userRouter);
app.use(courseRouter);

app.use(express.static(path.join(path.join(__dirname, './../../client'), 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../../client/build', 'index.html'));
});

app.listen(port, () => {
    console.log("server is running on port" , port);
});

