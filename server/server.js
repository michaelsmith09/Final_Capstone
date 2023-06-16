const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))