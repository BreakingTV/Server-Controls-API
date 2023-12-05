const express = require('express');
const router = express.Router();

const wol = require("wol");
const execute = require("../functions/execute");



router.post('/startup', (req, res) => {
    res.sendStatus(200);

    wol.wake(process.env.MAC, (err, res) => {
        if (err) console.log(err);
        else console.log(res);
    })
});

router.post('/shutdown', async (req, res) => {
    res.sendStatus(200);
    await execute.command('shutdown -P now');
});

module.exports = router;