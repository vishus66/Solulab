const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,"Title must be required"]
    },
    description: {
        type: String,
        required: [true,"Some description required"]
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field before save
todoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
