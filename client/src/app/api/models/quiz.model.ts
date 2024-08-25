import { model, Schema } from "mongoose";

const quizSchema = new Schema({
  quizId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  creatorId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  category: { type: String, required: true },
  public: { type: Boolean, required: true, default: false },
  tags: [{ type: String }],
  totalQuestions: { type: Number, default: 0 },
  totalAttempts: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  leaderboard: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      score: { type: Number, required: true },
      correctAnswers: { type: Number, required: true },
      timeTaken: { type: Number, required: true }, // In seconds
      dateTaken: { type: Date, required: true }, // Date when the user took the quiz
    },
  ],
});

const Quiz = model("Quiz", quizSchema);

module.exports = Quiz;