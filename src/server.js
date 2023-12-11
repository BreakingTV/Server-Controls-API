const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const pug = require('pug');

/* ===============>
     -- Environment Configuration --
 <=============== */
if (!process.env.DOCKER) {
    const dotenv = require("dotenv");
    dotenv.config();
}

/* ===============>
     --  Express Configuration --
 <=============== */
const app = express();

/* --- Frontend Configuration --- */
app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')


/* --- Backend Configuration --- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


/* ===============>
     -- Routing --
 <=============== */

/* --- Backend Routing --- */
const controlRouter = require('./router/control');
app.use('/api/control', controlRouter);

const statusRouter = require('./router/status');
app.use('/api/status', statusRouter);

const dockerRouter = require('./router/docker');
app.use('/api/docker', dockerRouter);


/* --- Frontend Routing --- */
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Server-Information-API',
        message: 'A cool Web-presence will be build here!'
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });