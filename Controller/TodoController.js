import Todo from "../Model/TodoScheme.js";
import express from 'express';
import User from "../Model/userModel.js";

const app = express();
app.use(express.json());

export const userData = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const user = await User.findById(id).populate('todo');
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        
        const allTasks = await Todo.find({ userId: id });
        res.status(200).json({ tasks: allTasks });
    } catch (error) {
        next(error);
    }
};

export const addTodo = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { Todoheading, Todotext } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        if (user.isDeleted === true) {
            return res.status(400).json({ message: 'Admin Blocked' });
        }

        const newTodo = await Todo.create({
            userId: user._id,
            Todoheading,
            Todotext
        });

        user.todo.push(newTodo._id);
        await user.save();

        res.status(200).json({ message: "Task added successfully", todo: newTodo });
    } catch (error) {
        next(error);
    }
};

export const editTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { Todoheading, Todotext } = req.body;

        const edit = await Todo.findById(id);
        if (!edit) {
            return res.status(404).json({ message: 'Todo Not found!' });
        }

        if (Todoheading) edit.Todoheading = Todoheading;
        if (Todotext) edit.Todotext = Todotext;

        await edit.save();
        res.status(201).json({ message: "Edit successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteTodo = async (req, res, next) => {
    try {
        const deleteId = req.params.id;

        const findDelete = await Todo.findByIdAndDelete(deleteId);
        if (!findDelete) {
            return res.status(404).json({ message: 'Todo Not found!' });
        }

        res.status(200).json({ message: "Delete successfully" });
    } catch (error) {
        next(error);
    }
};


