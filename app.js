const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const colors = require("colors")
require("dotenv/config")
const authJwt = require("./helpers/jwt")
const errorHandler = require("./helpers/error-handler")

app.use(cors())
app.options("*", cors())

const api = process.env.API_URL

const productsRoutes = require("./routes/products")
const categoryRoutes = require("./routes/categories")
const usersRoutes = require("./routes/users")
const ordersRoutes = require("./routes/orders")

// MiddleWare
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(authJwt())
app.use("/public/uploads", express.static(__dirname + "/public/uploads"))
app.use(errorHandler)

// Router
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoryRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connention is Ready...!!".white.bold)
  })
  .catch((err) => {
    console.log(err)
  })

// Development
// app.listen(3000, () => {
//   console.log("Server is running http://localhost:3000".cyan.bold)
// })

// Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port
  console.log("Express is Working on PORT " + port)
})
