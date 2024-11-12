import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false},
{cartData: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item', // Replace 'Item' with the name of your item collection
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ]})

const userModel= mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;