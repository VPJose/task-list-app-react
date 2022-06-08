import {
  auth,
  db
} from "../function/firebase"
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc
} from "firebase/firestore"

export const taskContext = createContext()

// Hooks Personalizado
export const useTask = () => {
  const context = useContext(taskContext)
  if (!context) throw new Error("No esta Puesto el Task Provider o esta vacio")
  return context
}

export const TaskProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [readTasks, setReadTasks] = useState([])

  const signup = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password)

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logout = () =>
    signOut(auth)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    getData()
  }, [])

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "task"))
      const dataBase = querySnapshot.docs.map(doc => {
        const id = doc.id
        const title = doc.data().title
        const description = doc.data().description

        return { id, title, description }
      })
      setReadTasks(dataBase)
    } catch (error) {
      console.log(error)
    }
  }

  const saveTask = async (title, description) =>
    await addDoc(collection(db, 'task'), {
      title: title,
      description: description
    })

  const deleteTask = (id) => deleteDoc(doc(db, 'task', id))

  const updateTask = (id, newTask) => updateDoc(doc(db, 'task', id), newTask)

  return (
    <taskContext.Provider value={{ login, logout, signup, user, saveTask, readTasks, deleteTask, updateTask }}>
      {children}
    </taskContext.Provider>
  )
}
