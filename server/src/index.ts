import express from 'express'
import cors from 'cors'
import cookieParse from 'cookie-parser'
import { router } from './router'
import { PORT, __prod__ } from './constants'

const app = express()

app.use(
  cors({
    origin: __prod__
      ? 'https://beejee.samiulhsohan.com'
      : 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(cookieParse())
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
