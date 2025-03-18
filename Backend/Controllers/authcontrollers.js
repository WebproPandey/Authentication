const usermodel =  require("../Model/usermodel")
const bcrypt= require("bcrypt")

module.exports.SignupController =  async (req, res) =>{
    try {
        const { name  , email , password} =  req.body
        const user = await usermodel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:"User is already exists, you can login" , success:false})
        }
        const newuser =  new usermodel({
             name,
             email,
             password
        })
        newuser.password = await bcrypt.hash(password , 10)
        await newuser.save()
        res.status(201).json({message:"Signup Successfully" ,  success:true})

    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
        
    }

}

module.exports.LoginController =  (req, res) =>{
    res.send("login page")
} 