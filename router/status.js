const express = require('express');
const router = express.Router();

const wol = require("wol");
const execute = require("../functions/execute");



router.get('/uptime', async (req, res) => {
    res.sendStatus(200);
    await execute.command('uptime');
});

module.exports = router;