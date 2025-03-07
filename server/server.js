require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/pages');

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:9000'
}))

app.use(express.json())

app.use('/api/', userRoutes.mainPage)
app.use('/sendMessage', userRoutes.postMessage)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);
})