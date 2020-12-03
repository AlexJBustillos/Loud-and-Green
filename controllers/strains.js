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
router.get('/', (req, res) => {
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
            }
        res.render('strains/index', { strainArray })
        }
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router