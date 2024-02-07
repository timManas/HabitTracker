import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    console.log('mongo uri: ' + process.env.MONGO_URI)
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log('mongoDB connected at: ' + connect.connection.host)
  } catch (err) {
    console.log('Error with connecting to DB: ' + err)
    process.exit(1)
  }
}

export default connectDB
