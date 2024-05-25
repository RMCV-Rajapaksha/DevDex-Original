const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer=require('multer')

// Load environment variables from .env file
dotenv.config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Ensure no trailing slash
    credentials: true,
}));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("Image has been uploaded successfully")
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
