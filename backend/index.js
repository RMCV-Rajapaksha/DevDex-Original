const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
//database connection
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully');
    }catch(err){
        console.log(err);
    }
}

//middleware
dotenv.config()
app.use(express.json())
app.use("/api/auth",authRoute)


app.listen(process.env.PORT,()=>{
    connectDB();
console.log('Server is running on port '+process.env.PORT);
});