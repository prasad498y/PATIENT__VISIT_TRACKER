const express = require('express');
const sequelize = require('./config/database');
const clinicianRoutes = require('./routes/clinicianRoutes');
const patientRoutes = require('./routes/patientRoutes');
const visitRoutes = require('./routes/visitRoutes');
const Clinician = require('./models/Clinician'); 
const Patient = require('./models/Patient');     
const Visit = require('./models/Visit');         
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/clinicians', clinicianRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/visits', visitRoutes);

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
        await sequelize.sync({ force: false });
        console.log('Database synchronized (tables created if not existing).');
        console.log('No default data seeded.'); 
        app.listen(PORT, () => {
            console.log(`Backend server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or synchronize:', error);
    }
};

initializeDatabase();