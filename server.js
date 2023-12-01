const express = require('express');
const { exec} = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/startup', (req, res) => {
    res.sendStatus(200);

});

app.post('/shutdown', (req, res) => {
    res.sendStatus(200);
    serverStatus();
});

app.get('/status', (req, res) => {
    res.sendStatus(200);

});


function serverStatus() {
    // TODO: change this to local Server, this wont work if NGINX Server is down but the Server is up
    exec('ping -w 1 semiko.tech', console.log);
}
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });