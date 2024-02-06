const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    followingCompanies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }]
});

module.exports = mongoose.model('Connection', connectionSchema);
