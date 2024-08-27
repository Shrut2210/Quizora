import mongoose, { model } from "mongoose";

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  }, 
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
  explanation: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Question = mongoose.model("Question", questionSchema);
// const Question = mongoose.models.questions || model("Question", questionSchema)
const Question = mongoose.models.Question || model("Question", questionSchema)

export default Question;