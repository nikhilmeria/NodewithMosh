const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mosh")
    .then(() => console.log('Connected to DB, mosh'))
    .catch(() => console.log('No connection to DB, mosh'))

//'Schema' is an class and 'moshSchema' is an instance of this class.
const moshSchema = new mongoose.Schema({
    name: String,
    age: Number,
    subjects: [String]
});

//Creating a Model. 'mongoose.model' returns a class, so 'Course' is a class.
const Course = mongoose.model('Course', moshSchema);

/*
//Saving 'course' which is the document in our 'Course' collection of 'mosh' db
async function saveDoc() {
    //Creating a new 'Course' document. course' is an instance of the class 'Course'
    const course = new Course({
        name: 'Baby Hanuman',
        age: 1,
        subjects: ['CS', 'Creator']
    });
    const saveResult = await course.save();
    console.log('Data Saved :',saveResult);
}

saveDoc();
*/

/*
//Retrive for Find data in collection(s)
async function findResultFn() {
    // const findResult = await Course.find();
    // findResult.map(ei => {
    //     console.log('Data Found :', ei);
    // });
    // const findResult = await Course.find({ name: "Baby Hanuman" });
    // const findResult = await Course.find({ age: { $gt: 30 } });
    // const findResult = await Course.find({ age: { $lte: 1, $gte: 35 } });
    // console.log('Data Found :', findResult);
    const findResult = await Course.find()
        .or([{ name: "Baby Hanuman" }, { age: 35 }])
        .count();
    console.log('Data Found :', findResult);
}
findResultFn();
*/

/*
// Updating a document in a collection by 1) first search for data, b) update, 3) save
async function UpdateFn(id) {
    let result = await Course.findById(id)
    console.log(result);
    if (!result) return
    result.set({
        name: "Nikhil"
    }) // updating data
    let saveUpdate = await result.save()
    console.log(saveUpdate);
}

UpdateFn('5b7824d5f9484b1a4c4a5aee')
*/

/*
// Updating a document in a collection by 'update' method, here we dnt query & explicitly save.
//'$set' is a mongodb update operator, google it.
async function UpdateFn() {
    let result = await Course.update({ age: 35 }, {
        $set: {
            name: "Mosh"
        }
    });
    console.log(result);
}

UpdateFn('5b7824d5f9484b1a4c4a5aee')
*/

//Delete
async function deleteFn(id) {
    let result = await Course.deleteOne({ _id: id });
    console.log(result);
}

deleteFn('5b797a3c778197166cb80451')






