import Todo from "../Model/TodoScheme.js";
import express from 'express';
const app=express();
app.use(express.json());

export const showAll = async (req,res,next)=>{
    try {
        const allTask= await Todo.find();
        res.status(200).json({tasks:allTask});
    } catch (error) {
        next(error);
    }
}
export const addTodo = async (req,res,next)=>{
    try {
        const {Todoheading,Todotext}=req.body;
        const newTask=await Todo.create({
            Todoheading,
            Todotext
        })
        await newTask.save();
        res.status(200).json({message:`Task add successfully`});        
    } catch (error) {
        next(error);
    }
}
export const editTodo= async (req,res,next)=>{
try {
    const {id}= req.params;
    const {Todoheading,Todotext}=req.body;
    console.log(Todoheading);
    const edit= await Todo.findById(id)
        if(Todoheading) edit.Todoheading= req.body.Todoheading;
        if(Todotext) edit.Todotext=req.body.Todotext;

        await edit.save();
        res.status(201).json({message:"Edit successfully"});

//     if(!edit){
//      return res.status(404).json({message:'Todo Not found!'});
//     }
//     edit.Todoheading=req.body.Todoheading || edit.Todoheading;
//     edit.Todotext=req.body.Todotext || edit.Todotext;

//    await edit.save();

//    res.status(200).json(edit);
} catch (error) {
    next(error)
}
}
export const deleteTodo= async (req,res,next)=>{
try {
    const deleteId = req.params.id;
    const findDelete= await Todo.findByIdAndDelete(deleteId);
    if(!findDelete){
        return res.status(404).json({ message: 'Todo Not found!' });
    }
    res.status(200).json({message:"Delete successfully "})
} catch (error) {
    next(error);
}
}
