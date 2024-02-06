const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate",
  },
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
