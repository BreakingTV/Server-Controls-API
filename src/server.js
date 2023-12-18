const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

/* ===============>
     -- Environment Configuration --
 <=============== */
if (!process.env.DOCKER) {
    const dotenv = require("dotenv");
    dotenv.config({path: '../.env'});
}

/* ===============>
     --  Express Configuration --
 <=============== */
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


/* ===============>
     -- Routing --
 <=============== */

const controlRouter = require('./router/control');
app.use('/control', controlRouter);

const statusRouter = require('./router/status');
app.use('/status', statusRouter);

const dockerRouter = require('./router/docker');
app.use('/docker', dockerRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
