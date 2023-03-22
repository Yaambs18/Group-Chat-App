const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const sequilize = require("./util/database");
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);


sequilize.sync().then((result) => {
    app.listen(3000);
})
.catch(err => console.log(err));