import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* ROUTES  */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        </Routes>
    </>
  )
}

export default App
