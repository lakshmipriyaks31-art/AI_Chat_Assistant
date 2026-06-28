const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const userroute = require('./app/routes/user.routes');
const chatroute = require('./app/routes/chat.routes');
const messageroute = require('./app/routes/message.routes');

const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
   credentials: true,
   origin: 'http://localhost:3000'
}));
app.use(cookieParser());
/* -------------------- Basic route Check -------------------- */

app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use('/api/user',userroute)
app.use('/api/chat',chatroute)
app.use('/api/message',messageroute)
app.use(errorMiddleware)

module.exports = app