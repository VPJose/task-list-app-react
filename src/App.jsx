import { useState } from "react"
import Tasks from "./components/Tasks"
import Cards from "./components/Card"

const App = () => {

  const [data, setData] = useState({
    id: 0,
    title: ' ',
    content: ' ',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toISOString().split('T')[1].slice(0, -8)
  })

  const [tasks, setTask] = useState([{
    id: 1,
    title: "titulo de la tarea",
    content: "Aqui colocar lo especifico de la tarea",
    date: "2022-05-24",
    time: "15:35"
  }])

  const handleClickNewTask = () => {
  }

  const handleClickRead = (id) => {
    const result = tasks.find(task => task.id == id)
    console.log('reade')
    console.log(result)
  }

  const handleClickUpdate = (id) => {
    const result = tasks.find(task => task.id == id)
    console.log(result)
    setData({
      id: result.id,
      title: result.title,
      content: result.content,
      date: result.date,
      time: result.time
    })

  }

  const handleClickDelete = (id) => {
    const result = tasks.filter(task => task.id !== id)
    setTask(result)
  }

  const handleChange = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    setData({
      ...data,
      [event.target.name]: event.target.value
    })

  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const length = tasks.length
    const id = !tasks ? 0 : length
    setTask([...tasks, {
      ...data,
      id: id + 1,
    }])
    setData({
      id: 0,
      title: '',
      content: ' ',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString().split('T')[1].slice(0, -8)
    })
  }

  console.log()

  return (
    <div className="App container">
      <h1 className="text-center m-5">Tasks List App</h1>
      <div className="row">
        <Tasks
          tasks={tasks}
          handleRead={handleClickRead}
          handleUpdate={handleClickUpdate}
          handleDelete={handleClickDelete}
          handleNewTask={handleClickNewTask}
        />
        <Cards
          data={data}
          handelChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default App
