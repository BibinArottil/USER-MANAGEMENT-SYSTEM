const User = require("../Model/userModel");

//User signup
const InsertUser = async (req, res) => {
  let user1;
  try {
    user1 = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (email == user.email) {
      res.render("../Views/User/usersignup.ejs",{error: "E-mail already exist"});
    }
  } catch (error) {
    const UserData = user1.save();
    res.render("../Views/User/usersignup.ejs", {
      success: "Registration success please login",
    });
    console.log(error);
  }
};

let user;
const UserVerification = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    user = await User.findOne({ email: email });

    if (user) {
      if (email === user.email && password === user.password) {
        req.session.user = req.body.email;
        console.log("session created");
        res.redirect("/userhome");
      } else {
        res.render("../Views/User/userlogin.ejs", {
          wrong: "Invalid Email or Password",
        });
      }
    } else {
      res.render("../Views/User/userlogin.ejs", { wrong: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.render("usersignup", { wrong: "User not found" });
  }
};

//User login page
const UserLogin = async (req, res) => {
  if (req.session.user) {
    res.redirect("/userhome");
  } else {
    try {
      res.render("../Views/User/userlogin.ejs");
    } catch (error) {
      console.log(error.message);
    }
  }
};

//User signup page
const UserSignup = (req, res) => {
  if (req.session.user) {
    res.redirect("/userhome");
  } else {
    res.render("../Views/User/usersignup.ejs");
  }
};

//User home page
const UserHome = async (req, res) => {
  try {
    if (req.session.user) {
      const UserDbData = await User.findOne({ email: req.session.user });
      if (UserDbData) {
        res.render('../Views/User/userhome.ejs',{ user });
      } else {
        req.session.destroy();
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

const UserLogout = async (req, res) => {
  req.session.destroy();
  console.log("session destroyed");
  res.redirect("/");
  res.end();
};

module.exports = {
  UserLogin,
  UserSignup,
  UserHome,
  InsertUser,
  UserVerification,
  UserLogout,
};
