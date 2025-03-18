const  express =  require ("express")
const  app = express()
const bodyparser =  require("body-parser")
const cors = require("cors")
require("dotenv").config()
const  db = require("./DataBase/db")
const authRoute =  require("./Routes/authRoute")
const productRoute =  require("./Routes/productRouter")

app.use(bodyparser.json())
app.use(cors())


app.get("/" , (req , res , next) => {
  res.send("hello");
})
app.use("/auth" , authRoute)
app.use("/product" , productRoute)



module.exports = app