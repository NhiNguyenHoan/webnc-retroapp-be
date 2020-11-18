const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const User = new Schema({
    idsocial: String,
    username: String,
    password: String,
    fullname: String,
});



module.exports = mongoose.model('user', User)