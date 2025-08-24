require('dotenv').config()
require('express-async-errors')
const path = require('path');
const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const userRouter = require('./routes/users')
const express = require('express');
const app = express();

// Middleware (simplified)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'templates')));

// Routes to display HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'about.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'blog.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'contact.html'));
});

app.get('/get-certified', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'get-certified.html'));
});

app.get('/verify-certificate', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'verify-certificate.html'));
});

// API routes
app.use('/api/v1/ff/user/verify', userRouter)

// Error handling middleware
app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is Listening on Port ${port}...`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()