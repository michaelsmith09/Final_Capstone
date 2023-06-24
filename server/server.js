require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const { getCards, addTurn } = require('./ctrl')

app.get("/api/getCards", getCards);
app.post("/api/addTurn", addTurn)

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))