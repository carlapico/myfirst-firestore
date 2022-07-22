import { initializeApp, cert } from 'firebase-admin/app'
import{getFirestore} from 'firebase-admin/firestore'
//const {credentials} = require ('./credentials.js') // ES5 way 
import {credentials} from './credentials.js' //ES6 way // import the variable from the credenitals file in this folder
    // doesn't usually matter which order you import stuff but in convention we tend to import things from libraries first and then our own stuff


initializeApp({
    credential: cert(credentials) // this is how we connect to the entire project 
})

const db = getFirestore() // now we are connected to the database and we want to be able to reference it so we call it db

/* 'CRUD' */

// const car= { make:'Ferrari', model: "GTO", year: 2008, color: "red"}

// db.collection('cars')
//     .add(car) // database is flexible enough that if there is no cars collection then it will create it // this will now put the car we created above in the collection
//     .then(doc => {
//         console.log('Doc added', doc.id) // we created a sting called 'doc added' which isn't necessary but can be done so we can see what id was randomly generated 
//     }) //we are adding a promise here // 
//     .catch (err => console.error(err)) // handle the error first as good habits to instill

// when using .set it needs to have a doc name, it will not create a generated document id number 
// db.collection('cars').doc('lambo') // doc is a reserved word and naming it lambo // both the collection and the document are case sensitive so if it were different it would create another one. 
//     .set({make:'Lamborghini', model: 'Diablo', year:2020, color:'yellow'}) // set is reserved word that creates the document only once // set adds the details in the object in that document // any changes to this document can be edited here 

// db.collection('cars').doc('lambo')
//     .update( {model:'Diablo', color:'hot pink'} )

// get a single document: 
db.collection ('cars').doc('lambo').get()
    .then (doc => {
        console.log(doc.id) // id is a property // 'lambo'
        console.log(doc.data()) // data is method // { year: 2020, make: 'Lamborghini', model: 'Diablo', color: 'hot pink' } // properties can come in different order 
    })
    .catch (console.error) //could do it shorthand as well 

// get a whole collection: //not the most efficient and kinda the ugly way of doing it 
db.collection('cars').get() // get works in a document or collection
    .then (collection => {
        collection.docs.forEach(doc => console.log(doc.id, doc.data())) //advanced array method that only exists in Javascript // replaces a for loop for each of the documents in the collection
    })
    .catch (console.error)

// Query docs from collection:
db.collection('cars')
    .where('year', '>=', 2015) // param1 is what we are filtering on(filed), param2 is the operation string, param3 is the value that we are evaluating 
    // when you start to put more then one where it doesn't automatically create an index and it may take a very long time for it to do it. 
    // .where ('color', '==', 'red') // you can't do an OR // OR is only on mongo but you can make another query // firestore is limited
    // .where ('mileage', '<', 20000) // you can't do more than one inequality in one query // you would have to do this separately
    .get()
        .then(collection => {
        const cars= collection.docs.map(doc=> {  // another advanced array method .map that also takes a callback function but is always going to return an array and the array length will be the same as the amount of docs in the collection
            let car = doc.data() // creating a variable called car and asking for all the document data to be there // {make, model, color, year}
            car.id = doc.id  // add to that a property called id to the object car and make that equal the same thing as the document id // this property is not added to the database // {make, model, color, year}
            return car}) // we just added the doc.id into the array for each car 
            console.log(cars)
        })
        .catch(console.error)
        
