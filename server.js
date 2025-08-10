const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Donor = require('./models/Donor');
const Inventory = require('./models/Inventory');
const app = express();

mongoose.connect('mongodb://localhost:27017/bloodBankDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Donor APIs
app.post('/api/donor', async (req, res) => {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ message: 'Donor added successfully' });
});

app.get('/api/donors', async (req, res) => {
    const donors = await Donor.find();
    res.json(donors);
});

// Inventory APIs
app.post('/api/inventory', async (req, res) => {
    const { bloodGroup, unitsAvailable } = req.body;
    const updated = await Inventory.findOneAndUpdate(
        { bloodGroup },
        { $set: { unitsAvailable, lastUpdated: new Date() } },
        { upsert: true, new: true }
    );
    res.json({ message: 'Inventory updated', updated });
});

app.get('/api/inventory', async (req, res) => {
    const inventory = await Inventory.find();
    res.json(inventory);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
