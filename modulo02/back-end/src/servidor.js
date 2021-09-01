const express = require('express');
const roteador = require('./roteador');

const app = express();

app.use(express.json());
app.use(roteador);

module.exports = app;