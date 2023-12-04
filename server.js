const express = require('express');
const Client = require('ssh2').Client;
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const wol = require('wol');


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

app.post('/shutdown', (req, res) => {
    res.sendStatus(200);
    executeCommand('shutdown -P now');
});

app.get('/status/uptime', (req, res) => {
    res.sendStatus(200);
    console.log(executeCommand('uptime'));
});


async function executeCommand(cmd) {
    let result = 'TEST';
    const conn = new Client;
    await conn.on('ready', () => {
        conn.exec('sudo ' + cmd, {pty: true}, (err, stream) => {
            if (err) throw err;
            stream.on('data', (data) => {
                if (data.indexOf(':') >= data.length - 2) stream.write(process.env.PASSWORD + '\n');
                else result = data;
            }).on('close', (code, signal) => {
                console.log('STREAM END');
                conn.end();
            });
        })
    }).on('error', err => {
        console.log('CONNECTION ERROR: ' + err);
    }).connect({
        host: process.env.HOST,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    });
    return result;
}
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });