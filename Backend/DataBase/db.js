const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB)
.then(() =>{
    console.log("conect db");
    
}).catch((err) =>{
    console.log(err);
    
})