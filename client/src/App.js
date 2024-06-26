import {Routes,Route} from "react-router-dom"
 import './App.css';
import Header from "./components/Header"

import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
function App() {
  return (

  <>
      <Header/>
  <Routes>
 
    <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
  </Routes>
  </>
  )
}

export default App;
