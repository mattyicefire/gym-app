const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const gymground = require('./models/gymground.js');

mongoose.connect('mongodb://localhost:27017/gym-camp1', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
 });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makegym', async (req, res) => {
    const gym = new gymground({name: 'Gym', price: '$100', description: 'This is a description', location: 'This is a location'});
    await gym.save();
    res.send(gym);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
