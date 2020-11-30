require('dotenv').config();
const db = require('./models')
const axios = require('axios')
const API_KEY = process.env.API_KEY;

// user model works
// db.user.findOrCreate({
//     where: { 
//         name: 'Alex',
//         email: 'alexjbustillos@gmail.com',
//         password: 'BrandNewLoudGreen',
//         age: 30

//     }  
// });

// profile model works
// async function test() {
//     const user = await db.user.findOne()
//     const profile = await db.profile.create({
//         content: 'What do i want to see',
//         userId: user.id,
//         title: 'Welcome to the matrix'
//     })
//     console.log(profile);
// }
// test();

// async function work() {
//     const url = `strainapi.evanbusse.com/${API_KEY}/strains/search/name/alien`;
//     axios.get(url)
//     await (response => {
//         if (response.status === 200) {
//             let len = response.data.results.length;
//             for (let i = 0; i < len; i++) {
//                 let strainResultObject = response.data.results[i];
//                 const finalObject = {
                    
//                 }
//             }
//         }
//     })
// }