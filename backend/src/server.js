import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// Routes

console.log(`[${new Date().toLocaleString('pt-br')} Starting Icarus]`)
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


const router = express.Router()

//routes
app.use('/', router)
app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}`))
