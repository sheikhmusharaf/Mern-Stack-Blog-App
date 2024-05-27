import React,{useState,useEffect} from 'react'
import axios from "axios";
import BlogCard from '../components/BlogCard';
const Blogs = () => {
  const [blogs,setBlogs]=useState([]);
  const getAllBlogs=async()=>{
    try{
const {data}=await axios.get("/api/v1/blog/getAllBlogs")

if(data.success){
  setBlogs(data.blogs);
  console.log(data.blogs)
}
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
getAllBlogs();
  },[])

  return (

  
    <div>
{blogs && blogs.map((blog)=>(
  <BlogCard
  id={blog._id} 

 isUser={localStorage.getItem("userId") === blog?.user?._id}
    title={blog?.title}
    description={blog?.description}
    image={blog?.image}
    name={blog?.user?.name}
    time={blog.createdAt}
  />
  
))}



  </div>
  )
   
  
 
}

export default Blogs


