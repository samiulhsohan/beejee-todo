import { Route, Routes } from 'react-router-dom'
import { Todo } from './features'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
    </Routes>
  )
}

export default App
