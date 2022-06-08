import Home from "./views/Home"
import Auth from "./views/Auth"
import { Route, Routes } from "react-router-dom"
import { TaskProvider } from "./context/TaskContext"
const App = () => {

  return (
    <div className="App container">
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
        </Routes>
      </TaskProvider>
    </div>
  )
}

export default App
