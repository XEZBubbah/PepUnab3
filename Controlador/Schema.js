const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    tiempo: {
        type: Number,
        required: true
    },
    puntuacion: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    } 
});
const todo = (module.exports = mongoose.model("todo", todoSchema));