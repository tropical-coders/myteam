import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import Verify from "./auth/Verify"
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-verify" element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
