require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig')

const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, (req, res) => {
    res.send('I can see flavors')
})

module.exports = router