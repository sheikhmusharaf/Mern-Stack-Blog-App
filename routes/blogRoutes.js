const express=require("express");
const {  createUserBlog, updateBlog, deleteBlog, getSingleBlog, userBlog, userBlogController, getAllBlogs } = require("../controllers/blogController");

const router=express.Router();

router.get("/getAllBlogs",getAllBlogs);

router.post("/createBlog",createUserBlog)


router.put("/updateBlog/:id",updateBlog);
router.delete("/deleteBlog/:id",deleteBlog)

router.get("/singleBlog/:id",getSingleBlog);



//get user blog
router.get("/user-blog/:id",userBlogController)


module.exports=router;