import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Locations from './Models/LocationModel.js'

const app = express();
dotenv.config();

const PORT = 3000;


app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("CONNECTED TO DB"))
 .catch((err)=>console.error("ERR",err))


app.post('/addLocation',async(req,res)=>{
    const {city,image,hospitals} = req.body;
    try{
      const newData = new Locations({city,image,hospitals})
      await newData.save()
      res.status(200).json(newData)
    }catch(err){
      console.error("ERR",err)
      res.status(500).json({error:'failed to post'})
    }
})

app.get('/allLocations/id/:id',async(req,res)=>{
  const {id} = req.params
  try{
  const CityById =  await Locations.findById(id);
    res.status(200).json(CityById)
  }catch(err){
    console.error("ERR",err);
    res.status(500).json({error:`NO LOCATION FOUND WITH ID ${id}`})
  }
})


//edhi full ga update cheyaledhu based on nested data hospitals , doctors
app.put('/updateLocation/id/:id',async(req,res)=>{
     const {id} = req.params
     const {city,image} = req.body;

     try{
      const rowsUpdated =  await Locations.findByIdAndUpdate(id,{city,image},{new:true,runValidators:true});
      if(rowsUpdated.length <= 0){
         return res.status(400).json({error:'error in Updating'})
      }
      res.status(200).json({message:`Location with Id ${id} has updated`})
     }catch(err){
      console.error("ERR",err);
      res.status(500).json({error:'ERROR IN UPDATING LOCATION'})
     }
})

app.delete('/deleteLocation/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const rowsDeleted = await Locations.findByIdAndDelete(id);
        if(rowsDeleted.length <= 0){
           return res.status(400).json({error:'error in deleteing'})
        } 
        res.status(200).json({message:`DELETED LOCATION WITH ID ${id}`})
    }catch(err){
      console.error("ERR",err)
      res.status(500).json({error:'failed to delete'})
    }
})

app.get('/allLocations',async(req,res)=>{
   try{
     const AllLocations = await Locations.find().lean()
     res.status(200).json(AllLocations)
   }catch(err){
    console.error("ERR",err);
    res.status(500).json({error:'failed to get data from db'})
   }
})


app.get('/',(req,res)=>{
    res.status(200).send("SERVER SUCCESSFULLY RUNNING");
})


app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON THE PORT ${PORT}`);
})