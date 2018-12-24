var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/QuranDB', { useNewUrlParser: true });

module.exports = mongoose;