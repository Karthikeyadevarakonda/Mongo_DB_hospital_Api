import mongoose from 'mongoose'


const doctorSchema = new mongoose.Schema({
  doctorName: String,
  specialization: String,
  consultationFee: Number,
  isAvailable: Boolean,
  doctorImage: String,
  rating: Number,
  doctorExperience: Number, 
});

const specialistSchema = new mongoose.Schema({
  specialistsName: String,
});

const hospitalSchema = new mongoose.Schema({
  hospitalName: String,
  hospitalDescription: String,
  hospital_image: String,
  isOpen: Boolean,
  doctors: [doctorSchema],
  specialists: [specialistSchema],
})

const LocationSchema = new mongoose.Schema({
      city:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:true
      },
      hospitals:[hospitalSchema],
})

const Location = mongoose.model('Location',LocationSchema)
export default Location;