const Admin = require("../Model/adminModel");
const User = require("../Model/userModel");

const AdminLogin = (req, res) => {
  if (req.session.email) {
    res.redirect("/adminhome");
  } else {
    res.render("../Views/Admin/adminlogin.ejs");
  }
}

const AdminVerification=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const admin=await Admin.findOne({email:email})
        if(admin){
            if(email===admin.email && password===admin.password){
                req.session.email=req.body.email;
                console.log("Admin login")
                res.redirect('/adminhome')
            }else{
                res.render('../Views/Admin/adminlogin.ejs',{wrong:"Invalid Email or Password"})
            }
        }else{
            res.render('../Views/Admin/adminlogin.ejs',{wrong:"Admin not found"})
        }
    } catch (error) {
        console.log(error);
    }    
}

const AdminHome = async (req, res) => {
  if (req.session.email) {
    try {
      let search = "";
      if (req.query.search) {
        search = req.query.search;
      }
      const UserData = await User.find({
        $or: [
          { name: { $regex: "^" + search + ".*", $options: "i" } },
          { email: { $regex: "^" + search + ".*", $options: "i" } },
        ],
      });
      res.render("../Views/Admin/adminhome.ejs", { details: UserData });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect("/admin");
  }
}

const NewUserLoad = async (req, res) => {
  if (req.session.email) {
    res.render("../Views/Admin/add-user.ejs")
  } else {
    res.redirect("/admin");
  }
}

const AddUser = async (req, res) => {
  let user1;
  try {
    user1 = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (email === user.email) {
      res.render("../Views/Admin/add-user.ejs", {wrong: "Email already exist",});
    }
  } catch (error) {
    user1.save();
    res.render("../Views/Admin/add-user.ejs", {success: "Regisation success",});
    console.log(error);
  }
}

const EditUser = async (req, res) => {
  if (req.session.email) {
    try {
      Id = req.query.id;
      const UserData = await User.findById({ _id: Id });
      if (UserData) {
        res.render("../Views/Admin/edit-user.ejs", { user: UserData });
      } else {
        res.redirect("/adminHome");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect("/adminhome");
  }
}

const UpdateUser = async (req, res) => {
    let user;
  try {
        const UserData = await User.findByIdAndUpdate(
            { _id: req.query.id },
            {
              $set: {
                name: req.body.name,
                email: req.body.email,
              },
            }
          );
          res.redirect("/adminhome"); 
  } catch (error) {
    console.log(error);
  }
}

const DeleteUser = async (req, res) => {
  try {
    const UserData = await User.findByIdAndDelete({ _id: req.query.id });
    res.redirect("/adminhome");
  } catch (error) {
    console.log(error);
  }
}

const AdminLogout = async (req, res) => {
  req.session.destroy();
  console.log("Admin session distroyed");
  res.redirect("/admin");
  res.end;
}

module.exports = {
  AdminLogin,
  AdminVerification,
  AdminHome,
  NewUserLoad,
  AddUser,
  EditUser,
  UpdateUser,
  DeleteUser,
  AdminLogout,
}
