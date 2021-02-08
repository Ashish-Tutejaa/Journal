const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


//Body Parser Middleware
app.use(bodyParser.json());

const app = express();


app.listen(3000, () => {
    console.log("LISTENINF AT PORT 3000")
})