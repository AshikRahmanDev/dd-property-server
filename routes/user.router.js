const express = require("express")
const {userCollection} = require("../utils/dbConnect")

const router = express.Router()

router.post("/create",async(req,res)=>{
    const user = req.body
    const query = {email:user?.email}
    console.log(user)
    const userExist = await userCollection.findOne(query)
    console.log(userExist)
    if(userExist){
        res.send({message:"userExisted"})
    }else{
        console.log("hit")
        const result = await userCollection.insertOne(user)
        res.send(result)
    }
})

router.get("/exist", async(req,res)=>{
    const {email} = req.query
    const query = {email}
    const exist = await userCollection.findOne(query)
    let userExist;
    if(exist?.email){
        userExist = true
        console.log(userExist)
        res.send({userExist})
    }else{
        userExist = false
        console.log(userExist)
        res.send({userExist})
    }
})

module.exports = router