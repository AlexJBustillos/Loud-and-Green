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
    res.render('users/profile', { user, currentUser: res.locals.currentUser });
});

router.get('/edit/:id', async (req, res) => {
    const user = await db.user.findOne({
        where: { id: req.user.id }
    })
    res.render('users/edit', { user, currentUser: res.locals.currentUser })
})

router.put('/edit/:id', async (req, res) => {
    const newName = await db.user.update({
        name: req.body.name
    }, {
        where: { id: req.params.id }
    })
    res.redirect('/profile')
})


router.post('/', isLoggedIn, (req, res) => {
    db.user.findOne({
        where: { id: req.body.userId}
    }).then((user) => {
        db.strain.findOne({
            where: { strainId: req.body.strainId},
            defaults: {
                name: req.body.name,
                race: req.body.race,
                description: req.body.description
            }
        }).then((foundStrain) => {
            user.addStrain(foundStrain)
        })
    }).catch(err => {
        console.log('Error', err);
    })
    res.redirect('/profile')
});
    

router.get('/details/:strainId', isLoggedIn, (req, res) => {
    let strainId = req.params.strainId
    db.strain.findOne({
        where: { strainId: strainId },
        include: [
            {model: db.effect, model: db.flavor}
        ]
    })
    .then(strain => {
        res.render('users/details', { strain })
    })
    .catch(err => {
        console.log('Error', err);
    })
});



router.delete('/details/:strainId', isLoggedIn, (req, res) => {
    const strainId = req.params.strainId;
    db.user.findOne({
        where: { id: req.body.userId }
    }).then((user) => {
        db.strain.findOne({
            where: { strainId: strainId }
        }).then((foundStrain) => {
            foundStrain.destroy()
        })
    }).catch(err => {
        console.log('Error', err);
    })
    res.redirect('/profile');
})


        




module.exports = router