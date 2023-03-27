const express=require("express")
const {connection}=require("../backend/db")
const {UserRouter}=require("../backend/routes/user.routes")
const{postRouter}=require("../backend/routes/post.routes")
const{auth}=require("../backend/middlewares/auth")
require("dotenv").config()
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("welcome to home page")
})

app.use("/users",UserRouter)
app.use(auth)
app.use("/post",postRouter)
app.listen((process.env.port),async()=>{
    try {
      await connection  
      console.log("Db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running on port ${process.env.port}`)
})

