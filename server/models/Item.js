const mongoose = require("mongoose");
const { v4: uuid } = require('uuid');
const Schema = mongoose.Schema;

// Creating Schema of Item

const ItemSchema = new Schema({

    _id: {
        type: String,
        default: uuid
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    },

    username: {
        type: String,
        required: true,

    },

});

module.exports = Item = mongoose.model('item', ItemSchema);