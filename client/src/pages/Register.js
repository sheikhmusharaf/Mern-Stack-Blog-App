import React,{useState} from 'react'
import {Box,Button,Typography,TextField} from "@mui/material"
import {useNavigate} from "react-router-dom"
import axios from "axios"
  const Register = () => {

  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
    name:" ",
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
  const {data}=await axios.post("/api/v1/user/register",{name:inputs.name,email:inputs.email,password:inputs.password});

  if(data.success)
    {
      alert("User Register Sucessfull");
      navigate("/login");
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
      <Typography variant="h4" padding={3} textAlign={"center"} textTransform={"uppercase"}>Register</Typography>
      
          <TextField placeholder=' Enter Name' name="name" margin="normal" type="text" required="true" value={inputs.name} onChange={handleChange}></TextField>
          <TextField placeholder='Enter Email' name="email" margin="normal" type="email" required="true" value={inputs.email} onChange={handleChange}></TextField>
          <TextField placeholder='Enter Password' name="password" margin="normal" type="password" required="true" value={inputs.password} onChange={handleChange}></TextField>

        <Button type="submit" variant="contained" color="primary" sx={{borderRadius:3, marginTop:3}}>Submit</Button>
        <Button onClick={()=>navigate("/login")}>Already register? Please Login</Button>
      
      </Box>
      </form>
      </>
  )
}

export default Register