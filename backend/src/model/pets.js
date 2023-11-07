const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    petname: {
        type: String,
        required: true,
    },
    pettype: {
        type: String,
        required: true,
    },
    petbreed: {
        type: String,
        required: true,
    },
    petage: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }

});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;