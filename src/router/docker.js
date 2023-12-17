const express = require('express');
const router = express.Router();

const wol = require("wol");
const execute = require("../functions/execute");



router.get('/list', async (req, res) => {
    await execute.command(`docker ps --no-trunc --format '{"ID":"{{ .ID }}", "Image": "{{ .Image }}", "Names":"{{ .Names }}", "Status":"{{ .Status }}"}' | jq -s -M`).then(result => {
        res.json(JSON.parse(result));
    });
});

module.exports = router;