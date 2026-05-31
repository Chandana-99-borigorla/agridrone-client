import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  return (
    <div className="min-h-screen bg-dark-300">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  )
}

export default App