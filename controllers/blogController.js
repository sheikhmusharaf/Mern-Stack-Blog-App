const mongoose =require("mongoose");
const blogModel=require("../models/blogModel");
const userModel = require("../models/UserModel");



//// getAllBllogs

exports.getAllBlogs=async(req,res)=>{
    try{


      const blogs=await blogModel.find({}).populate("user");

      if(!blogs)
        {
            res.status(404).send({
                message:"no more blogs are available",
                success:false
            })
        }
        else
        {

        res.status(201).send({
            message:"here is the List of blogs",
            success:true,
            totalblogs:blogs.length,
            blogsAre:[blogs]

        })
    }

    }
    catch(err)
    {
        console.log(err);
        res.status(404).send({
            message:"error in getting the all blogs",
            success:false
        })

    }
}



////post || createBLog

exports.createUserBlog=async(req,res)=>{
    try{

const {title,image,description,user}=req.body

if(!title || !image || !description || !user)
    {
        res.status(404).send({
            message:"please fill the required fileds",
            success:false

        })
    }

    const existingUser=await userModel.findById(user);
  
    if(!existingUser)
        {
            res.status(404).send({
                message:"unable to find user",
                success:false,
            })
        }

    var blog=new blogModel({title,image,description,user});
    const session=await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog);
    await existingUser.save({session});
    await session.commitTransaction();
   
    await blog.save();

    res.status(201).send({
        message:"your blogs are created",
        success:true,
        blog
    })


    }
    catch(err)
    {
console.log(err);
res.status(404).send({
    message:"error in createing the blogs",
    success:false,
})
    }
}



///update blog

exports.updateBlog=async(req,res)=>{
    try{


        const {id}=req.params;

        const updateBlog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        if(!updateBlog)
            {
                res.status(404).send({
                    message:"no id is matched",
                    success:false
                })
            }
            res.status(201).send({
                message:"id is updated",
                success:true,
                updateBlog
            })

    }
    catch(err)
    {
console.log(err);
res.status(404).send({
    message:"error in updating the blog",
    success:false
})
    }
}


//delete the blog

exports.deleteBlog=async(req,res)=>{
    try{


        const blog=await blogModel.findByIdAndDelete(req.params.id).populate("user");   ///populate in relationship contains the datafields that can be hide or deleted
        
      await blog.user.blogs.pull(blog);  /////delete the blog that contains with user id
      await blog.user.save();
         if(!blog)
            {
                res.status(404).send({
                    message:"id is not found",
                    success:false
                })
            }
           
         
           
            res.status(201).send({
                message:"blog is deleted",
                success:true,

                blog
            })
    }
    catch(err)
    {
console.log(err);
res.status(404).send({
    message:"error in deleting the blogs"

})
    }
}


//get SingleBlog

exports.getSingleBlog=async(req,res)=>{
    try{

        const blog=await blogModel.findById(req.params.id);
        if(!blog)
            {
                res.status(404).send({
                    message:"given blog id is not match",
                    success:false,
                })
            }
            res.status(201).send({
                message:"here is the single blog",
                success:true,
                blog
            })

    }
    catch(err)
    {

        console.log(err);
        res.status(404).send({
            message:"error while getting single blog",
            success:false,
        })
    }
}


////get userBlog

exports.userBlogController=async(req,res)=>{
    try{

const userBlog=await userModel.findById(req.params.id).populate("blogs");
if(!userBlog)
    {
        res.status(404).send({
            message:"blogs are not found with this id",
            success:false
        })
    }
    res.status(201).send({
        success:true,
        message:"here is the userblog",
        userBlog
    })


    }
    catch(err)
    {console.log(err);
        res.status(404).send({
            message:"error in getting the user blog",
            success:false
        })
    }
}
