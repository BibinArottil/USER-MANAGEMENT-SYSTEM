const express = require("express");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const path = require("path");
const UserPageRoute = require("./Routes/userRoute");
const AdminPageRoute = require("./Routes/adminRoute");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(
  sessions({
    resave: true,
    saveUninitialized: true,
    secret: "secretpassword",
  })
);

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

require("./Model/databaseModel");
require("./Model/adminModel");
require("./Model/userModel");

app.use(UserPageRoute);
app.use(AdminPageRoute);

const StaticPath = path.join(__dirname, "Public");

app.use(express.static(StaticPath));

app.listen(6060, () => {
  console.log(`Port listening on 6060`);
});
