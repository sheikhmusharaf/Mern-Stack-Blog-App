import React, { useState } from 'react'
import { AppBar, Toolbar, Box, Button, Typography, Tab, Tabs } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { authActions } from '../redux/store'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate=useNavigate();
  const dispath=useDispatch();
  const [value, setValue] = useState(0);
  const isLogin = useSelector((state) => state.isLogin)
  console.log(isLogin);


  const handleLogout=()=>{
    try{
dispath(authActions.logout())
alert("Logout Successfully");
navigate("/login");
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (

    <AppBar position='sticky' >
      <Toolbar>
        <Typography variant='h4'> My Blog App</Typography>




        {isLogin && (



          <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}  >


            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)} >
              <Tab label="Blogs" component={Link} to="/blogs" />
              <Tab label="My Blogs" component={Link} to="/my-blogs" />
              <Tab label="Create Blog" component={Link} to="/create-blog" />
            </Tabs>

          </Box>

        )}


        <Box marginLeft={"auto"} display={"flex"}>

          {!isLogin && (
            <>

              <Button sx={{ margin: 1, color: "white" }} component={Link} to="/login">LogIn</Button>
              <Button sx={{ margin: 1, color: "white" }} component={Link} to="/register">Register</Button>
            </>

          )}

{isLogin &&(


          <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>LogOut</Button>
        
        )}
        </Box>
      
      </Toolbar>
    </AppBar>



  )
}

export default Header