const express = require('express');
const Client = require('ssh2').Client;
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const wol = require('wol');

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES :D
const controlRouter = require('./router/control');
app.use('/control', controlRouter);

const statusRouter = require('./router/status');
app.use('/status', statusRouter);

const dockerRouter = require('./router/docker');
app.use('/docker', dockerRouter);


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });