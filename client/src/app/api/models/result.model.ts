import mongoose, { Schema, Document, model } from "mongoose";

const resultSchema = new Schema({
    resultId:{
        type:String,
        required: true,
        unique: true
    },
    quizId:{
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    correctAnswers:{
        type: Number,
        required: true
    },
    timeTaken:{
        type: Number,
        required: true
    },
    completedAt:{
        type: Date,
        required: true
    },
    answers: [{
        questionId: Schema.Types.ObjectId,
        selectedOptionId: Schema.Types.ObjectId,
        isCorrect: Boolean,
        timeTaken: Number
    }]
})

const Result = model('result', resultSchema)
module.exports = Result;
/*
### **4. Result Model**
```json
{
  "_id": ObjectId(),
  "quizId": ObjectId,  // References Quiz document
  "userId": ObjectId,  // References User document
  "score": Number,
  "correctAnswers": Number,
  "timeTaken": Number,  // In seconds
  "completedAt": Date,
  "answers": [
    {
      "questionId": ObjectId,  // References Question document
      "selectedOptionId": ObjectId,  // References selected option
      "isCorrect": Boolean,
      "timeTaken": Number  // Time taken for this question in seconds
    }
  ]
}

*/