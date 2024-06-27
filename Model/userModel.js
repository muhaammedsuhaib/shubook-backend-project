import mongoose from "mongoose";

const userSchema = new mongoose.Schema({    
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountCreateDate: {
      type: Date,
      default: Date.now,
      required:true
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    todo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
  }]
  });
  
  const User=mongoose.model("User",userSchema);
  export default User;