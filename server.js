const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Apply DB Config
const db = require('./config/keys').mongoURI;

// Use config for connection to db
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 3200;

app.listen(port, () => console.log(`Server running on port ${port}`));
