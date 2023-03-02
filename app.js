require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const blogRoutes = require('./routes/blogRoute')
const userRoutes = require('./routes/userRoute')
const allRoutes = require('./routes/allRoutes')
const auth = require('./middleware/Authentication')
mongoose.set('strictQuery', true);
const notFound = require('./middleware/notFound');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

app.use(cors());
app.use(express.json());    
app.use(fileUpload({useTempFiles: true}))
app.use(express.urlencoded({ extended: true }));



app.use('/', blogRoutes)
app.use(auth, allRoutes)
app.use('/api/v1/story', auth, userRoutes);

app.use(notFound)

const start  = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}....`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
