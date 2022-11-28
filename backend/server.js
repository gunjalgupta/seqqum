require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const session = require("express-session");

const passport = require('passport');


mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(session({secret: "secret"}))

require('./middleware/passport')(passport);
//require("./routes/userRouter")(app);
//require("./routes/favRouter")(app);

const userRouter = require('./routes/userRouter')
app.use('/userRouter', userRouter)

const favRouter = require('./routes/favRouter')
app.use('/favRouter', favRouter)



app.listen(8000, () => console.log('Server Started'));