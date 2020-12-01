require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig')

const isLoggedIn = require('../middleware/isLoggedIn');

// profile route
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
  });

// users strains
router.get('/strains', isLoggedIn, (req, res) => {
    res.send('I can see my strains')
})

module.exports = router;