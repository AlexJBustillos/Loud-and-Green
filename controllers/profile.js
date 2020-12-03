require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig')
const axios = require('axios')
const API_KEY = process.env.API_KEY;
const isLoggedIn = require('../middleware/isLoggedIn');

// profile route
router.get('/', isLoggedIn, async (req, res) => {
    const user = await db.user.findOne({
        where: { id: req.user.id },
        include: [db.strain]
    })
    res.render('profile', { user });
  });



// post strain in profile
router.post('/', isLoggedIn, (req, res) => {
    db.strain.findOrCreate({
        where: {
            strainId: req.body.strainId
        }
    }).then((foundStrain) => {
        db.user.findOne({
            where: { id: req.user.id },
            include: [db.strain]
        }).catch(err => {
            console.log(err);
        }).then((user) => {
            user.addStrain(foundStrain)
        })
    }).catch(err => {
        console.log(err);
    })
    res.redirect('/profile')

})

module.exports = router