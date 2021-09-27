const express = require('express')
const { PORT } = require('./commons/configs/env')
const app = express()
const db = require('./commons/configs/dbConnect')
const route = require('./routers/index')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const server = require("http").Server(app);


//connect db
db.connect()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors())


app.get('/healCheck', (req, res) => res.status(200).json({hello : 'Welcome to LT'}))
app.use('/api',route)

server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
