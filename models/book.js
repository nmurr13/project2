const mongoose = require("./connection")

// Book SCHEMA - Definition/Shape of the Data Type

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    genre: String, 
    numOfPages: Number,
    startedReading: Boolean,
    finishedReading: Boolean,
}, {timestamps: true})

// Book Model - Interface with the database for books
const Book = mongoose.model("Book", bookSchema)

// Export the Book Model
module.exports = Book