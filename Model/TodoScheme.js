
import mongoose from "mongoose";

const todoScheme=mongoose.Schema({
    Todoheading:{
        type:String,
        required:true
    },
    Todotext:{
        type:String,
        required:true
    }
})
const Todo = mongoose.model('Todo',todoScheme)
export default Todo