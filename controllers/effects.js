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
    let strainId = req.params.strainId;
    const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/effects/${strainId}`;
    axios.get(url)
    await (response => {
        const effects = response.data;
        for (const [key, value] of Object.entries(effects)) {
            let string = `${key}: ${value}`;
            db.strain.findOne({
                where: {
                    strainId: req.body.strainId
                }
            }); await ((foundStrain) => {
                db.effect.create({
                  strainId: foundStrain.strainId,
                  effects: string  
                })
            })
        }
        res.send({effects: effects})
    }).catch(err => {
        console.log(err);
    })
})









module.exports = router