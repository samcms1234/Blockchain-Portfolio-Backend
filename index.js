const express = require('express')
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;



app.listen(PORT, () => console.log(`The app is listening at ${PORT}`))