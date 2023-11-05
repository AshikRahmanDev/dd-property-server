const express = require("express");
const cors = require("cors");
// const { run } = require("./utils/dbConnect");
const port = process.env.PORT || 4000;
const app = express()
const userRouter = require('./routes/user.router')
const propertyRouter = require("./routes/property.router")


// midleware
app.use(cors())
app.use(express.json())
// run()


app.use("/user",userRouter)
app.use("/property",propertyRouter)


app.get("/",(req,res)=>{
    res.send("server running")
})

app.listen(port,()=>{
    console.log("server running on",port)
})
