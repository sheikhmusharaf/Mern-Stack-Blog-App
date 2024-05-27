const userModel=require("../models/UserModel");
const bcrypt=require("bcryptjs")



exports.getAllUsers=async(req,res)=>{
    try{


        const user=await userModel.find({});
        if(!user)
            {
                res.status(404).send({
                    message:"error in getting the users"
                })
            }
            res.status(201).send({
                message:"here is the list of users",
                success:true,
                total:user.length,
                usersAre:[user]


            })
    }
catch(err)
{
console.log(err);
res.status(404).send({
    message:"error in getting the users",
    success:false
})
}
}



////post
exports.userRegister=async(req,res)=>{
    try{


        const {name,email,password}=req.body;


        if(!name || !email || !password )
            {
                res.status(404).send({
                    message:"fill the required detials",
                    success:false
                })
            }

            const existingUser=await userModel.findOne({email})
            if(existingUser){
                res.status(404).send({
                    message:"user is already existed",
                    success:false,
                })
            }
        

            const hashpass=await bcrypt.hashSync(password,10);
         
           var user=new userModel({name,email,password:hashpass})
           await user.save();
           res.status(201).send({
            success:true,
            message:"registration  successfull",
            user
           })
        



    }
    catch(err)
    {
    console.log(err);
    res.status(404).send({
        success:false,
        message:"error in regsitration"

    })
    }
}




////login
exports.userLogin=async(req,res)=>{

    try{

        const {email,password}=req.body;
        if(!email || !password)
            {
                res.status(404).send({
                    message:"fill the required details for login",
                    success:false
                })
            }
            const user=await userModel.findOne({email})
            if(!user)
                {
                    res.status(404).send({
                        message:"email is not existed",
                        success:false
                    })
                }

                const isMatch=await bcrypt.compare(password,user.password);

                if(!isMatch)
                    {
                        res.status(404).send({
                            message:"password is not matched",
                            success:false,
                        })
                    }



                    res.status(201).send({
                        message:`login successful`,
                        success:true,
                        user
                    })
                

                    
                }
    catch(err)
    {
        console.log(err)
        res.status(404).send({
            message:"error in logging"
        })
    }
}


