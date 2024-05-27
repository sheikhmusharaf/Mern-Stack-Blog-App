import React,{useState} from 'react'
import {Box,Button,Typography,TextField} from "@mui/material"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {useDispatch} from "react-redux"
import { authActions } from '../redux/store'
const Login = () => {
const dispatch=useDispatch();
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({

    email:" ",
    password:" ",
  })

  const handleChange=(e)=>{

    setInputs((PreState)=>({
...PreState,
[e.target.name]:e.target.value
    }))

  }
  const handleSubmit=async(e)=>{

try{
  e.preventDefault();
  const {data}=await axios.post("/api/v1/user/login",{email:inputs.email,password:inputs.password});

  if(data.success)
    {
      localStorage.setItem("userId",data?.user._id);
      dispatch(authActions.login())

      alert("User Login Sucessfull");
      navigate("/");
    }

  
}
catch(err)
{
  console.log(err,"error in get in axios");
}
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
    
    <Box maxWidth={450} display="flex" flexDirection={"column"} alignItems={"center"}  justifyContent="center" margin={"auto"} marginTop={5} boxShadow={"10px 10px 20px #ccc"} padding={3} borderRadius={5}>
    <Typography variant="h4" padding={3} textAlign={"center"} textTransform={"uppercase"}>Login</Typography>
    
     
        <TextField placeholder='Enter Email' name="email" margin="normal" type="email" required="true" value={inputs.email} onChange={handleChange}></TextField>
        <TextField placeholder='Enter Password' name="password" margin="normal" type="password" required="true" value={inputs.password} onChange={handleChange}></TextField>

      <Button type="submit" variant="contained" color="primary" sx={{borderRadius:3, marginTop:3}}>Submit</Button>
      <Button onClick={()=>navigate("/register")}>Not a User ? Please Register</Button>
    
    </Box>
    </form>
    </>
    
  )
}

export default Login