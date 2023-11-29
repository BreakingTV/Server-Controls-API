const express = require('express');
const exec = require('child_process').exec;
const bodyParser = require('body-parser');
const http = require("http");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/startup', (req, res) => {
    exec("ping -c 1 google.com", (err, stdout, stderr) => {
        console.log(stdout);
    });
    res.sendStatus(200);
});

app.post('/shutdown', (req, res) => {
    exec("ping -c 1 stadtlohn-hlr.de", (err, stdout, stderr) => {
        console.log(stdout);
    });
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});