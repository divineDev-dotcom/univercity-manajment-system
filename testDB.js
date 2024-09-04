require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const newUser = new User({
            name: 'John Doe',
            email: 'johndoe@example.com',
            age: 30
        });
        return newUser.save();
    })
    .then((savedUser) => {
        console.log('User inserted:', savedUser);
        return mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error:', error);
        mongoose.connection.close();
    });
