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

router.get('/:strainId', isLoggedIn, async (req, res) => {
    let strainId = req.params.strainId
    const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/flavors/${strainId}`;
    axios.get(url)
    await (response => {
        let flavors = response.data;
        db.strain.findOne({
            where: {
                strainId: req.body.strainId
            }
        }); await ((foundStrain) => {
            db.flavor.create({
                strainId: foundStrain.strainId,
                flavors: flavors.toString()
            })
        }) 
        res.send({ flavors: flavors.toString()})
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router