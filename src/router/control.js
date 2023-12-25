const express = require('express');
const router = express.Router();

const wol = require("wol");
const execute = require("../functions/execute");



router.post('/startup', (req, res) => {
    res.json({command: 'STARTUP', data: 'Server has been STARTED UP'});

    wol.wake(process.env.MAC, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
    })

    //Maybe add check for when the Server is fully online
});

router.post('/shutdown', async (req, res) => {
    res.json({command: 'SHUTDOWN', data: 'Server has been SHUTDOWN'});
    await execute.command('shutdown -P now');
});

module.exports = router;