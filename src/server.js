const express = require('express');
const Client = require('ssh2').Client;
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const wol = require('wol');

const execute = require('./functions/execute');


const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/startup', (req, res) => {
    res.sendStatus(200);

    wol.wake(process.env.MAC, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
    })
});

app.post('/shutdown', async (req, res) => {
    res.sendStatus(200);
    await execute.command('shutdown -P now');
});

app.get('/status/uptime', async (req, res) => {
    res.sendStatus(200);
    await execute.command('uptime');
});

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });