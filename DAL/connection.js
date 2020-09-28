const mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/curaprox', (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
})

module.exports = connection;