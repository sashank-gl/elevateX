const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  technologyRequirements: {
    type: [String],
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reactions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      type: {
        type: String,
        enum: [
          "interested",
          "not_interested",
          "refer_someone",
          "save_for_later",
          "contact_directly",
        ],
      },
    },
  ],
});

module.exports = mongoose.model("JobPost", jobPostSchema);
