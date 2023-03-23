const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const User = require('./models/user');
const Chat = require('./models/chat');

const sequilize = require("./util/database");
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use(express.json());

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});

sequilize.sync().then((result) => {
    app.listen(3000);
})
.catch(err => console.log(err));