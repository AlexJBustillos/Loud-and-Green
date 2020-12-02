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

// users strains route
router.get('/strains', isLoggedIn, (req, res) => {
    const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/search/name/alien`;
    axios.get(url)
    .then(response => {
        if (response.status === 200) {
            let len = response.data.length;
            for (let i = 0; i < len; i++) {
                let strainResultObject = response.data[i];
                const finalObject = {
                    strainId: strainResultObject.id,
                    name: strainResultObject.name,
                    race: strainResultObject.race,
                    description: strainResultObject.desc
                };
                const strain = db.strain.findOrCreate({
                    where: { strainId: finalObject.strainId },
                    defaults: {
                        name: finalObject.name,
                        race: finalObject.race,
                        description: finalObject.description
                    }
                }).then(() => {
                     res.render('profile', { strain })
                    
                })
            }
        }
    })
    .catch(err => {
        console.log(err);
    })
})

// post review on strains
router.post('/strains', isLoggedIn, async (req, res) => {
    const user = await db.user.findOne({
        where: {
            name: req.body.name
        }
    })
    const strain = await db.strain.findOne({
        where: {
            strainId: req.body.strainId
        }
    })
    const review = await db.review.create({
        content: req.body.content,
        userId: user.id,
        name: user.name,
        strainId: strain.strainId
    })
    res.redirect('/strains', { review: review })

})

module.exports = router;