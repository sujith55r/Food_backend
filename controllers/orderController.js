import orderModel from "../models/orderModel.js";
import userModel from "../models/usermodel.js";


//placing user order for frontend
const placeOrder=async(req,res)=>{
    const frontend_url="http://localhost:5173"
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        

        res.json({success:true,message:"order placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    
    }
}

//user order for frontend
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }else{
            await orderModel.findByIdAndUpdate(orderId);
            res.json({success:false,message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//listing orders for admin panel
const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//api for updating order status
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}


export {placeOrder,userOrders,verifyOrder,listOrders,updateStatus}