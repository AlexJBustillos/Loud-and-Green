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

router.get('/:strainId', isLoggedIn, (req, res) => {
    let strainId = req.params.strainId
    const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/flavors/${strainId}`;
    axios.get(url)
    .then(response => {
        let flavors = response.data;
         
        res.render('strains/flavors', { flavors: flavors })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router