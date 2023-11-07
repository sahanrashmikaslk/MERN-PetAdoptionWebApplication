const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adoptionSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String
    },
    pet_id: {
        type: String,
        required: true,
    },
    pet_name: {
        type: String
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
});

const Adoption = mongoose.model('Adoption', adoptionSchema);

module.exports = Adoption;