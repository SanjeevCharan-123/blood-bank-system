// models/Donor.js
const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    bloodGroup: String,
    contact: String,
    lastDonationDate: Date
});

module.exports = mongoose.model('Donor', donorSchema);
