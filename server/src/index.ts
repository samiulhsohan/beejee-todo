import express from 'express'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import { router } from './router'

const PORT = process.env.PORT || 3000
const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
)
app.use(cookieParse())
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
