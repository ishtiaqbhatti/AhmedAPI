const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionType: { type: String, enum: ["phising", "normal"] },
  description: String,
  options: [
    {
      text: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Question", questionSchema);
