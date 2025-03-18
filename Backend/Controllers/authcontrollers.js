const usermodel =  require("../Model/usermodel")
const bcrypt= require("bcrypt")
const jwt =  require("jsonwebtoken")

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

module.exports.LoginController = async (req, res) =>{
    try {
        const {  email , password} =  req.body
        const user = await usermodel.findOne({ email }).select("+password");
        if(!user){
            return res.status(409)
            .json({message:"Email our Password is worg!" , success:false})
        }
        const isPassword =  await bcrypt.compare(password , user.password)
        if(!isPassword){
            return res.status(409)
            .json({message:"Email our Password is worg!" , success:false})
        }
        const  token =   jwt.sign({email:user.email, _id:user._id},
             process.env.JWT_SECRET ,
             { expiresIn:'24h'}) 
        res.status(200).json({message:"Login Successfully" ,  success:true , token , email }  )

    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            success:false,
        })
        console.log(error.message)
        
    }} 