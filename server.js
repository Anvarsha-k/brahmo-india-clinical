require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const { router: patientsRouter } = require('./src/routes/patients');
const aiRouter = require('./src/routes/ai');

app.use('/api/patients', patientsRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`BRAHMO running on http://localhost:${process.env.PORT || 3000}`);
});