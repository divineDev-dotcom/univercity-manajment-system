require('dotenv').config({ path: './.env' }); 
const mongoose = require('mongoose');
const User = require('../models/user-model');
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        const newUser = new User({
userName: 'jasdeep',
password: 'test',
email: 'kr.jasdeep@gmail.com',
role: 'admin',
personalDetails: {
firstName: 'Jasdeep',
lastName: 'Kaur',
birthday: new Date('1990-01-01'),
phone: '+919818012345',
address: 'just anything',
city: 'Gurugram',
state: 'Haryana',
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
