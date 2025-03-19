const { isAuthenticated } = require("../Middleware/auth")

const router = require("express").Router()



router.get("/" , isAuthenticated , (req, res)=>{
    res.status(200).json([
        {name:"amit",age:12},
        {name:"ansu",age:20},
        {name:"ankit",age:21},
    ])

})

module.exports =  router
