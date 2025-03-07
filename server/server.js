require('dotenv').config()
const express = require('express')
const cors = require('cors')

const pageRoutes = require('./routes/pages');
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:9000'
}))

app.use(express.json())

app.use('/api/', pageRoutes.mainPage)
app.use('/sendMessage', pageRoutes.postMessage)
app.use('/user', userRoutes)
app.use('/product', productRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);
})