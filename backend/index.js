const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');
const jobRoutes = require('./routes/jobRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Interview Scheduler API is running...');
});

app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/conversations', conversationRoutes);

db.query('SELECT 1')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
