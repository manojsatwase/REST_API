const express = require("express");
// import packages and execute
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

// body parser middleware every time we heat req bodyparser run
app.use(bodyParser.json());

// middleware
// all middleware we can amazin function execute when we heat
// we can import routes
const postsRoute = require("./routes/posts");

// create middleware
app.use("/posts", postsRoute);

// routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

// connect to databse

mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log(`connect to db`);
});

// How to we start lisning to the server
app.listen(PORT, () => console.log(`Server Running At ${PORT}`));
