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
router.get('/', isLoggedIn, async (req, res) => {
    const user = await db.user.findOne({
        where: { id: req.user.id },
        include: [db.profile]
    })
    res.render('profile', { user: user });
  });

// users strains route
router.get('/strains', isLoggedIn, (req, res) => {
    res.send('I can see my strains')
})

router.post('/strains/:id', isLoggedIn, (req, res) => {
    res.redirect('/strains/:id')
})

module.exports = router;