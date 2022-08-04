import exoress from 'express'

const PORT = process.env.PORT || 3000
const app = exoress()

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
