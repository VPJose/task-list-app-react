import { useState, useReducer, useEffect } from "react"
import Header from "../views/Header"
import Cards from "../components/Card"
import Tasks from "../components/Tasks"
import { useTask } from "../context/TaskContext"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const { user, saveTask, readTasks, deleteTask, updateTask } = useTask()
  let navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, {
    id: ' ',
    title: ' ',
    description: ' '
  })

  function reducer(state, action) {
    switch (action.type) {
      case "id":
        return { ...state, id: action.payload }
      case "title":
        return { ...state, title: action.payload }
      case "description":
        return { ...state, description: action.payload }
      case 'new':
        return {
          id: action.payload,
          title: action.payload,
          description: action.payload
        }
      default:
        return state
    }
  }

  const [tasks, setTasks] = useState([{
    id: ' ',
    title: 'titulo',
    description: 'contenido de la nota'
  }])

  const [update, setUpdate] = useState(false)

  useEffect(() => {

    const newTask = []
    readTasks.map(readTask => {
      newTask.push(readTask)
    })
    setTasks(newTask)

  }, [readTasks])

  const handleNewTask = () => {
    dispatch({ ...state, type: 'new', payload: ' ' })

    setUpdate(false)
    setShow(true)
  }

  const handleClickUpdate = (id) => {
    const result = tasks.find(task => task.id == id)

    setUpdate(true)

    for (const rslt in result) {
      dispatch({ ...state, type: rslt, payload: result[rslt] })
    }
  }

  const handleClickDelete = (id) => {
    const result = tasks.filter(task => task.id !== id)
    setTasks(result)
    deleteTask(id)
  }

  const handleSubmit = (event, state) => {

    event.preventDefault()

    if (update) {
      const result = tasks.filter(task => task.id !== id)
      const newTask = {
        userID: user?.uid,
        title: state.title,
        description: state.description
      }
      result.push(newTask)
      setTasks(result)
      updateTask(id, newTask)
    } else {
      try {
        saveTask(state.title, state.description)
      } catch {
        console.error("Error adding document: ", e);
      }
    }
    const newTask = []
    readTasks.map(readTask => {
      newTask.push(readTask)
    })
    setTasks(newTask)
    setUpdate(false)

  }

  return (
    <div className="container">
      <div className="row">
        <Header />

        <h1 className="text-center my-5">Tasks List App</h1>
        <Tasks
          tasks={tasks}
          handleUpdate={handleClickUpdate}
          handleDelete={handleClickDelete}
          handleNewTask={handleNewTask}
        />
        <Cards
          state={state}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default Home
