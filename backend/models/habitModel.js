import mongoose from 'mongoose'

const habitSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    habitsList: [
      {
        title: { type: String, required: true },
        priority: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Habit = mongoose.model('Habit', habitSchema)

export default Habit
