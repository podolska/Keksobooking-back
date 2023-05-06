const express = require('express');
const path = require('path');
const cors = require('cors');
const getData = require('./data/getData')();
const offertsRouter = require('./routes/offert');

const app = express();
app.listen(3000, () => console.log('Server is running'));

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/offert", offertsRouter);