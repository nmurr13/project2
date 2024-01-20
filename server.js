// Dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const BookRouter= require("./controllers/book")


// create app object
const app = express()

//middleware
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static('public'))
app.use("/books", BookRouter)

// routes
app.get("/", (req, res) => {
    res.send("It's Working")
})

// turn on the server (the listener)
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
