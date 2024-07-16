const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config();
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const jwt = require('jsonwebtoken');
const uploadRoutes = require('./routes/uploadRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const frontendRoutes = require('./routes/frontendRoutes')
const uploadFrontend = require('./routes/uploadFrontEnd')
const razorpayRoutes = require('./routes/razorpay')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    next();
})

//var __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/upload_frontend', express.static(path.join(__dirname, '../upload_frontend')))

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/frontend', frontendRoutes)
app.use('/api/frontend-upload', uploadFrontend);
app.use('/api/razorpay', razorpayRoutes)



if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    //any route that is not api will be redirected to index.html
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api is running ....')
    })
}


app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);

})