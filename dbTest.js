require('dotenv').config();
const db = require('./models')
const axios = require('axios')
const API_KEY = process.env.API_KEY;





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
    //             console.log(finalObject.name);
    //             // db.strain.findOrCreate({
    //             //     where: { strainId: finalObject.strainId },
    //             //     defaults: {
    //             //         name: finalObject.name,
    //             //         race: finalObject.race,
    //             //         description: finalObject.description,
    //             //     }
    //             // }).then(([strain, created]) => {
    //             //     console.log(created);
    //             // })
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
// db.user.findOne({
//     where: {
//         name: 'Alex'
//     }
// }).then((alex) => {
//     db.strain.findOne({
//         where: {
//             strainId: 32
//         }
//     }).then((foundStrain) => {
//         alex.addStrain(foundStrain)
//     })
// })

//old post route
// db.user.findOrCreate({
//     where: {
//         name: req.user.name
//     },
//     include: [db.strain]
// }).then((user, created) => {
//     console.log('>>>>', user);
//     db.strain.findOrCreate({
//         where: {
//             strainId: req.body.strainId
//         }
//     }).then((strain, created) => {
//         console.log('>>>>', strain);
//         user.addStrain(strain).then(() => {
//             console.log(strain.strainId, 'added to', user.userId);
//         })
//     })


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

// let strainId = req.params.strainId;
    // const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/effects/34`;
    // axios.get(url)
    // .then(response => {
    //     const open = []
    //     const effects = response.data;
    //     // console.log(effects);
    //     // let descriptor = Object.getOwnPropertyDescriptor(effects, 'positive')
    //     // console.log(descriptor);
    //     // for (let key in effects) {
    //     //     let value = effects[key];
    //     //     console.log('>>>>>', key, value);
            
    //     // }
    //     open.push(effects);
    //     console.log(open);
    //     // for (const [key, value] of Object.entries(effects)) {
    //     //     let string = `${key}: ${value}`;
    //     //     const effectObject = {
    //     //         effects: string
    //     //     }
    //     // open.push(effectObject)
    //     // }
    //     // res.send({effects: open})
    // }).catch(err => {
    //     console.log(err);
    // })

    // const url = `https://strainapi.evanbusse.com/${API_KEY}/strains/data/flavors/34`;
    // axios.get(url)
    // .then(response => {
    //     let flavors = response.data;
    //     console.log(flavors);
        
    // }).catch(err => {
    //     console.log(err);
    // })


//     router.post('/', isLoggedIn, (req, res) => {
//         // console.log(req.user.id);
//     db.user.findOne({
//         where: {
//             id: req.body.userId
//         }
//     }).then((user) => {
//     db.strain.findOrCreate({
//         where: {
//             strainId: req.body.strainId,
//             name: req.body.name,
//             race: req.body.race,
//             description: req.body.description
//         }
//     }).then((foundStrain) => {
//         user.addStrain(foundStrain)
//         console.log(foundStrain, 'added to', user);
//     }).catch(err => {
//         console.log(err);
//     })
//     }).catch(err => {
//                 console.log(err);
//             })
//     res.redirect('/profile')
// })