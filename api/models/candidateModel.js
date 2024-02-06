const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    skills: [String],
    experience: String,
});

const candidateSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: profileSchema,
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    savedJobPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost'
    }]
});

module.exports = mongoose.model('Candidate', candidateSchema);
