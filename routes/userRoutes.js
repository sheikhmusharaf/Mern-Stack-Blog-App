const express=require("express");
const { getAllUsers, userRegister, userLogin } = require("../controllers/userControllers");
const router=express.Router();


///get
router.get("/all-users",getAllUsers)



///post

router.post("/register",userRegister)



///POST ||login
router.post("/login",userLogin)


module.exports=router;