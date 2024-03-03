// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express application
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/patient_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define patient schema
const patientSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    // Add more fields as needed
});

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
    patientId: mongoose.Types.ObjectId,
    date: Date,
    // Add more fields as needed
});

// Define models
const Patient = mongoose.model('Patient', patientSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Define API endpoints
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json({ patients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
