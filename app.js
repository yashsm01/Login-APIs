const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const routes = require("./Router/routes");

mongoose.connect("mongodb+srv://user2:Qaswedfr123@cluster0.q7fla.mongodb.net/myDB?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected Database...");
})
.catch(() => {
    console.log("Connection failed...!");
});



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Accept, Width, Accept-Language, Content-Language","Authorization"
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(  
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS, TRACE, CONNECT"
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/api",routes);

module.exports = app;