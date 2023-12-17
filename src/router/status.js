const express = require('express');
const router = express.Router();

const wol = require("wol");
const execute = require("../functions/execute");
const timers = require("timers");



router.get('/uptime', async (req, res) => {
    await execute.command('uptime').then(result => {
        let uptime = result.toString().split('up ')[1].split(',')[0];
        let average = result.toString().split('load average: ')[1].replace(/(\r\n|\n|\r)/gm, "");
        res.json({data: {time: uptime, loadAverage: average}});
    }).catch(err => console.log(err));
});

module.exports = router;