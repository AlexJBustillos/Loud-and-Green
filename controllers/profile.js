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
    res.render('profile', { user, currentUser: res.locals.currentUser });
  });



// post strain in profile
router.post('/', isLoggedIn, async (req, res) => {
        // console.log(req.user.id);
    // console.log('>>>>>>>',req.body.name, req.body.race, req.body.description);
    let user =  await db.user.findOne({
        where: {
            id: req.body.userId
        }
    }) 
    if (user) {
        let [strain, created] = await db.strain.findOrCreate({
            where: { strainId: req.body.strainId },
            defaults: {
                name: req.body.name,
                race: req.body.race,
                description: req.body.description
            }
        });
        return [strain, created];
    }
    try {
        user.addStrain(strain)
        console.log('>>>>>', strain, 'added to', user);

    } catch {
        console.log('error in updating strain');
    }
    
    res.redirect('/profile')

});

// router.get('/:strainId/delete', isLoggedIn, async (req, res) => {
//     res.send('delete me please')
// })

// router.


        




module.exports = router