require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user-model');
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const newUser = new User({
userName: 'jasdeep',
password: 'test',
role: 'admin',
personalDetails: {
firstName: 'Jasdeep',
lastName: 'Kaur',
email: 'kr.jasdeep@gmail.com',
phone: '+919818146445',
Address: 'just anything',
City: 'Gurugram',
country: 'India',
zipcode: 112233
},
profilePicture: 'C:/images/pic-jasdeep.jpg'
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
