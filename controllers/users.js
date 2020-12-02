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
router.get('/:name', isLoggedIn, (req, res) => {
    let name = req.params.name;
    const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/search/name/${name}`;
    axios.get(url)
    .then(response => {
        if (response.status === 200) {
            let len = response.data.length;
            const strainArray = [];
            for (let i = 0; i < len; i++) {
                let strainResultObject = response.data[i];
                const strainObject = {
                    strainId: strainResultObject.id,
                    name: strainResultObject.name,
                    race: strainResultObject.race,
                    description: strainResultObject.desc
            
                };
            strainArray.push(strainObject) 
            }
        res.render('strains/strainIndex', { strainArray })
        }
    })
    .catch(err => {
        console.log(err);
    });
});

// post strain in profile
router.post('/', isLoggedIn, (req, res) => {
    db.strain.findOrCreate({
        where: {
            strainId: req.body.strainId
        }
    }).then((foundStrain) => {
        db.user.findOne({
            where: {
                id: req.body.id
            }
        }).then((id) => {
            id.addStrain(foundStrain)
        })
    }).catch(err => {
        console.log(err);
    })
    res.redirect('strains/strainIndex')

});

module.exports = router