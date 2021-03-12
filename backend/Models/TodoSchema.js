const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
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
});

module.exports = mongoose.model('Todo', todoSchema);