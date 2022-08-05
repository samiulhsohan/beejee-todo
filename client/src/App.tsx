import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Login, Todo } from './features'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
