const express = require('express');
const router = express.Router();

const wol = require("wol");
const execute = require("../functions/execute");



router.get('/list', async (req, res) => {
    res.sendStatus(200);
});

module.exports = router;