import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import mongoose from 'mongoose';
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import AttendanceRoute from './routes/AttendanceRoute.js';

const app = express();
app.use(express.json());

// Allow CORS from all origins
app.use(cors({
    origin: ["https://sucf-frontend-tralier.vercel.app"],
    methods:["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

const uri = 'mongodb+srv://Sucf2024:SucfDB@cluster0.ziafmsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/auth', AuthRoute);
app.use('/users', UserRoute);
app.use('/attendance', AttendanceRoute);

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dlgdtcfpq',
    api_key: '597981243245951',
    api_secret: '_P1Kx9tfGxhMysCYEFYSl9Bui2g'
});

// Configure Multer storage to upload image files directly to Cloudinary
const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'UserProfilePic', // Folder for image files
        resource_type: 'image' // Only allow image files
    }
});

const imageUpload = multer({ storage: imageStorage });

// Define a POST route to handle image file uploads
app.post('/upload/image', imageUpload.single('image'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send('Please upload an image file.');
    }

    res.status(200).send({
        message: 'Image file uploaded successfully.',
        fileUrl: file.path // Cloudinary URL of the uploaded file
    });
});

app.get("/", (req, res) => {
    res.json("HomePage")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
