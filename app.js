const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const routes = require("./routes/mainRoute.js");
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Example app listening on port ${port}`);
  }
});
