const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/Users")
    console.log('MongoDB is connected')
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error)
    throw error
  }
}

module.exports = connectDB