import dotenv from 'dotenv'
import habitss from './data/habitx.js'
import Habit from './models/habitModel.js'
import connectDB from './config/db.js'

dotenv.config({ path: '../.env' })

connectDB()

const importData = async () => {
  try {
    await Habit.deleteMany()
    await Habit.insertMany(habitss)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Habit.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
