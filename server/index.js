require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:9000'
}))

app.use(express.json())
app.get('/api/message', (req, res) => {
    res.json({ message: "Привет из Node.js!" });
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);
})