const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    }
});

const Admin = mongoose.model('Comapny', adminSchema);

module.exports = Admin;