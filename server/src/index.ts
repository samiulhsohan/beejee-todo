import exoress from 'express'
import { router } from './router'

const PORT = process.env.PORT || 3000
const app = exoress()

app.use('/', router)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
