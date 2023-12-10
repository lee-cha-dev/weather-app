// NODEJS REQUIRE PACKAGES HERE
const express = require('express');
const path = require("path");

// INIT APP
const app = express();

// SET THE SOURCE DIRECTORY
app.use(express.static("src"));

// DATA CALLS
app.get('/data', (req, res) => {
    const user = {
        name: "Test Data",
        age: "99",
        title: "Web Developer"
    };
    res.json(user);
});

// SERVER LISTENING ON PORT 8080
app.listen('8080', () => {
    console.log("Server is listening on port 8080");
});