const joi  = require("joi")

module.exports.SignupValidation =  (req,res,next) =>{
 const Schema = joi.object({
    name:joi.string().min(3).max(20).required(),
    email:joi.string().email().max(30).required(),
    password:joi.string().min(6).max(20).required()
 })
 const {error} =  Schema.validate(req.body);
 if(error) {
    return res.status(400).json({message:"Bad request" , error})
 }
 next()
    
}
module.exports.LoginValidation =  (req,res,next) =>{
    const Schema = joi.object({
       email:joi.string().email().max(15).required(),
       password:joi.string().min(6).max(20).required()
    })
    const {error} =  Schema.validate(req.body);
    if(error) {
       return res.status(400).json({message:"Bad request" , error})
    }
    next()
       
   }