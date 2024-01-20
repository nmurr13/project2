const express = require("express");
const { append } = require("express/lib/response");
const Book = require("../models/book");

// CREATE THE ROUTER
const router = express.Router();

// ERROR HANDLER
function errorHandler(error, res) {
  res.json(error);
}

// ROUTERS

// INDUCES

// INDEX ROUTE - GET - LIST ALL BOOKS

router.get("/", async (req, res) => {
  try {
    // get all books
    const books = await Book.find({});
    // render a template
    // books/index.ejs = views/books/index.ejs
    res.render("books/index.ejs", {books})
  } catch (error) {
    console.log("-----", error.message, "------");
    res.status(400).send("error, read logs for details");
  }
});


// NEW ROUTE - GET - GET THE NEW FORM

router.get("/new", (req, res) => {
  res.render("books/new.ejs");
});

// DESTROY ROUTE - DELETE - DELETES ONE BOOK

router.delete("/:id", async (req, res) => {
  try {
    // get the id from params
    const id = req.params.id;
    // delete the book
   await Book.deleteOne({});
    // redirect user back to index page
    res.redirect("/books");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// UPDATE ROUTE - PUT - UPDATES ONE BOOK

//update route
router.put("/:id", async (req, res) => {
  try {
    // get the id from params
    const id = req.params.id;
    // make sure startedReading and finishedReading is true or false
  req.body.startedReading = Boolean(req.body.startedReading);
  req.body.finishedReading = Boolean(req.body.finishedReading);
    // update the book
    await Book.findByIdAndUpdate(id, req.body, { new: true });
    // redirect user back to main page when fruit
    res.redirect("/books");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// create route
router.post("/", async (req, res) => {
  try {
    // check if the readyToEat property should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false;

  req.body.startedReading =req.body.startedReading === "on" ? true : false;
  req.body.finishedReading = req.body.finishedReading === "on" ? true : false;
    // create the new book
    await Book.create(req.body);
    // redirect the user back to the main bookshelf page after book created
    res.redirect("/books");
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// edit route
router.get("/:id/edit", async (req, res) => {
  try {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    const book = await Book.findById(id);
    // render template and send it a book
    res.render("books/edit.ejs", { book });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// SHOW ROUTE - GET - GETS ONE BOOK

router.get("/:id", async (req, res) => {
  try {
    // get the id from params
    const id = req.params.id;

    // find the particular book from the database
    const book = await Book.findById(id);

    // render the template with the data from the database
    res.render("books/show.ejs", { book });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// export the routes
module.exports = router;