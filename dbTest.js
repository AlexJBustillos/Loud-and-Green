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

// review model works
// async function another() {
//     const user = await db.user.findOne()
//     const strain = await db.strain.findOne()
//     const review = await db.review.create({
//         content: 'This was really good',
//         userId: user.id,
//         name: 'Alex',
//         strainId: strain.strainId
//     })
//     console.log(review);
// }
// another();

// add strain to user
db.user.findOne({
    where: {
        name: 'Alex'
    }
}).then((alex) => {
    db.strain.findOne({
        where: {
            strainId: 32
        }
    }).then((foundStrain) => {
        alex.addStrain(foundStrain)
    })
})



// add flavors to strain at flavors table
// let strainId = 20;    
// const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/flavors/${strainId}`;
//     axios.get(url)
//     .then(response => {
//         let flavors = response.data;
//         console.log(flavors);
//         db.strain.findOne({
//             where: {
//                 strainId: 20
//             }
//         }).then((foundStrain) => {
//             db.flavor.create({
//                 strainId: foundStrain.strainId,
//                 flavors: flavors.toString()
//             })
//         })
//     })

// add effects to strain at strain table
// let strainId = 20;
// const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/effects/${strainId}`;
// axios.get(url)
// .then(response => {
//     const effects = response.data;
//     // console.log(effects);
//     for (const [key, value] of Object.entries(effects)) {
//         let string = `${key}: ${value}`
//         db.strain.findOne({
//             where: {
//                 strainId: 20
//             }
//         }).then((foundStrain) => {
//             db.effect.create({
//                 strainId: foundStrain.strainId,
//                 effects: string
//             })
//         })
//     }
    
// })

