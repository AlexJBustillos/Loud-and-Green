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


// users strains route
router.get('/', isLoggedIn, (req, res) => {
    db.strain.findAll({
        include: [
            { model: db.effect, model: db.flavor }
        ]
    })
    .then(strain => {
        res.render('strains/index', { strain })
    })
    .catch(err => {
        console.log(err);
    })
});
    

router.get('/details/:strainId', isLoggedIn, (req, res) => {
    let strainId = req.params.strainId;
    const effectsUrl = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/effects/${strainId}`;
    axios.get(effectsUrl)
    .then(response => {
        const open = []
        const effects = response.data;
        open.push(effects);
    })
    .catch(err => {
        console.log(err);
    })
    .then(() => {
        const flavorsUrl = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/flavors/${strainId}`;
        axios.get(flavorsUrl)
        .then(response => {
        let flavors = response.data;
        db.strain.findOne({
            where: { strainId: strainId }
        })
        .then((foundStrain) => {
            db.flavor.findOrCreate({
                where: {
                    strainId: foundStrain
                },
                defaults: {
                    flavors: flavors
                }
            })
            .then(() => {
                db.effects.findOrCreate({
                    where: {
                        strainId: foundStrain
                    },
                    defaults: {
                        effects: open
                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
          }) 
        })
        .catch(err => {
        console.log(err);
        })
    })
    res.render('strains/details', {effects: open, flavors, foundStrain})
})

router.get('/search', isLoggedIn, (req, res) => {
    let name = req.query.name;
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
                db.strain.findOrCreate({
                    where: { strainId: strainArray.strainId },
                    defaults: {
                        name: strainArray.name,
                        race: strainArray.race,
                        description: strainArray.description
                    }
                }).then(([strain, created]) => {
                    console.log(strain, created);
                }) 
            };
            res.render('strains/search', { strainArray })
        }
    }).catch(err => {
        console.log(err);
    });
})
            

router.delete('/', async (req, res) => {
    const name = req.body.strainId;
    db.strain.findOne({
        where: { name }
    })
    await (foundStrain)
    foundStrain.destroy();
    res.redirect('/profile');
})

module.exports = router