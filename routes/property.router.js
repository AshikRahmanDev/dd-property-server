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

// search shortcut
router.get("/search",async(req,res)=>{
    const search= req.query.search.toLowerCase()
    const properties = await propertyCollection.find({}).toArray()
    const matchingCity = properties.filter(item=>item.location.city.toLowerCase().includes(search))
    console.log(matchingCity.map(item=>item.location.city))
    const result = matchingCity.map(item=>item.location.city)
    res.send(result)
})

router.get("/",async(req,res)=>{
    const {search,type,rooms} = req.query;
    console.log(search , type , rooms)
    if(search && type && rooms){
        const query = {"location.city":search,propertyType:type,"detailInformation.bedrooms":rooms}
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }
    else if(search && type){
        const query = {"location.city":search,propertyType:type}
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }else if(search && rooms){
        
        const query = {"location.city":search,"detailInformation.bedrooms":rooms}
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }else if(search ){
        const query = {"location.city":search}
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }else if(rooms){
        const query = {"detailInformation.bedrooms":rooms}
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }else if(type){
        const query = {propertyType:type}
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }
    else{
        const query = {};
        const result = await propertyCollection.find(query).toArray()
        res.send(result)
    }
    
})

router.get("/:id",async(req,res)=>{
    const id = req.params.id
    const query = {_id: new ObjectId(id)}
    const result = await propertyCollection.findOne(query)
    res.send(result)
})

module.exports = router