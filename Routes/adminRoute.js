const express=require("express");
const AdminRouter=require("../Controllers/adminController");
const admin_router=express.Router();

admin_router.get('/admin',AdminRouter.AdminLogin);
admin_router.post('/admin',AdminRouter.AdminVerification);

admin_router.get('/adminhome',AdminRouter.AdminHome);

admin_router.get('/add-user',AdminRouter.NewUserLoad);
admin_router.post('/add-user',AdminRouter.AddUser);

admin_router.get('/edit-user',AdminRouter.EditUser);
admin_router.post('/edit-user',AdminRouter.UpdateUser);

admin_router.get('/delete-user',AdminRouter.DeleteUser);

admin_router.get('/adminlogout',AdminRouter.AdminLogout);

module.exports=admin_router;