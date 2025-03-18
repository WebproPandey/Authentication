const router = require("express").Router()

const {SignupController , LoginController} = require("../Controllers/authcontrollers")
const {LoginValidation ,SignupValidation} =  require("../Middleware/authvalidation")


router.post("/signup" , SignupValidation , SignupController)
router.post("/login" , LoginValidation , LoginController)

module.exports =  router
