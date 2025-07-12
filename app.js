require('dotenv').config()
require('express-async-errors')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const express = require('express');
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>Store API</h1><a href="/api/v1/products">Products Route</a>`)
})

app.use(`/api/v1/products`, productsRouter)

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