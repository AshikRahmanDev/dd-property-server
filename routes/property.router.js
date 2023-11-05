const express = require("express")
const {propertyCollection}= require("../utils/dbConnect");
const { ObjectId } = require("mongodb");

const router = express.Router()

router.post("/create",async(req,res)=>{
    const property = req.body;
    const result = await propertyCollection.insertOne(property);
    res.send(result)
})

router.get("/latest",async(req,res)=>{
    const query = {};
    const result = await propertyCollection.find(query).sort({_id:-1}).limit(4).toArray();
    res.send(result)
})

router.get("/",async(req,res)=>{
    const query = {};
    const result = await propertyCollection.find(query).toArray()
    res.send(result)
})

router.get("/:id",async(req,res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await propertyCollection.findOne(query)
    res.send(result)
})

module.exports = router