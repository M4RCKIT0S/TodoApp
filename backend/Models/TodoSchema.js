const mongoose = require('mongoose');

const todo = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: false
    },
    description:{
        type: String,
        required: false
    },
    priority:{
        type: Number,
        min: 1,
        max: 3,
        required: true
    }
},{
    timestamps: true
})