import { initializeApp, cert } from 'firebase-admin/app'
import{getFirestore} from 'firebase-admin/firestore'
//const {credentials} = require ('./credentials.js') // ES5 way 
import {credentials} from './credentials.js' //ES6 way // import the variable from the credenitals file in this folder
    // doesn't usually matter which order you import stuff but in convention we tend to import things from libraries first and then our own stuff


initializeApp({
    credential: cert(credentials) // this is how we connect to the entire project 
})

const db = getFirestore() // now we are connected to the database and we want to be able to reference it so we call it db

const car= {
    make:'Audi', model: "A3", year: 2018, color: "grey"
}

db.collection('cars').add(car) // database is flexible enough that if there is no cars collection then it will create it // this will now put the car we created above in the collection
