import mongoose from "mongoose";


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://sujith:9342158635@cluster0.ptp7n.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}

