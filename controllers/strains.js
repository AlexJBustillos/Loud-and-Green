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


//strains route
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
        res.status(400).render('404')
    })
});
    
//strains details route
router.get('/details/:strainId', isLoggedIn, (req, res) => {
    let strainId = req.params.strainId;
    const open = [];
    const flavorsUrl = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/flavors/${strainId}`;
    const effectsUrl = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/effects/${strainId}`;
    db.strain.findOne({
        where: { strainId: strainId }
    })
    .then((foundStrain) => {
        const strains = foundStrain;
        axios.get(effectsUrl)
        .then(response => {
            const effects = response.data;
            open.push(effects);
            let string = open.join(', ');
            db.effect.findOrCreate({
            where: {
                strainId: strainId
            },
            defaults: {
                effects: string
            }
        })
        .catch(err => {
            res.status(400).render('404')
        })
        axios.get(flavorsUrl)
        .then(response => {
            const flavors = response.data;
            let flavorString = flavors.toString(', ');
            db.flavor.findOrCreate({
                where: {
                    strainId: strainId
                },
                defaults: {
                    flavors: flavorString
                }
            })
            res.render('strains/details', {effects: open, flavors: flavors, strain: strains})
        })
        })
        .catch(err => {
        res.status(400).render('404')
        });
    
    });
});

//search for strain not in strains page
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
                strainArray.push(strainObject);
                db.strain.findOrCreate({
                    where: { strainId: strainObject.strainId },
                    defaults: {
                        name: strainObject.name,
                        race: strainObject.race,
                        description: strainObject.description
                    }
                });
            };
            res.render('strains/search', { strainArray })
        }
    }).catch(err => {
        res.status(400).render('404')
    });
})
            
module.exports = router

            
        