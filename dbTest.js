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

//strain model works
    // const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/search/name/alien`;
    // axios.get(url)
    // .then(response => {
    //     if (response.status === 200) {
    //         // console.log(response.data);
    //         let len = response.data.length;
    //         for (let i = 0; i < len; i++) {
    //             let strainResultObject = response.data[i];
    //             const finalObject = {
    //                 strainId: strainResultObject.id,
    //                 name: strainResultObject.name,
    //                 race: strainResultObject.race,
    //                 description: strainResultObject.desc

    //             };
    //             // console.log(finalObject);
    //             db.strain.findOrCreate({
    //                 where: { strainId: finalObject.strainId },
    //                 defaults: {
    //                     name: finalObject.name,
    //                     race: finalObject.race,
    //                     description: finalObject.description,
    //                 }
    //             }).then(([strain, created]) => {
    //                 console.log(created);
    //             })
    //         }
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    // });

