const express = require('express')

const app = express()
const port = 3000
const User = require('./models/user');
const userRouter = require('./routes/userRoute');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
var cors = require('cors');
const mongoConfig= require('./dbconfig/dbonfig');
const mongoose = require('mongoose');
app.use(cors())

const connect = mongoose.connect(mongoConfig.mongoUrl, { useNewUrlParser: true });
connect.then((db) => {
  console.log('Connected to the mongodb Server');
}, (err) => { console.log(err) });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})