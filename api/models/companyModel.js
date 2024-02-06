const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recruiters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    }],
    jobPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPost'
    }],
    
});

module.exports = mongoose.model('Company', companySchema);
