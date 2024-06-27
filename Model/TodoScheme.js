import mongoose from 'mongoose';

const todoScheme = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Todoheading: {
        type: String,
        required: true
    },
    Todotext: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoScheme);
export default Todo;
