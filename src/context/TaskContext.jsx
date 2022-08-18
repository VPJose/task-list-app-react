import { useNavigate } from "react-router-dom"
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
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth"
import {
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  updateDoc,
  where,
  query
} from "firebase/firestore"

export const taskContext = createContext()

// Hooks Personalizado
export const useTask = () => {
  const context = useContext(taskContext)
  if (!context) throw new Error("No esta Puesto el Task Provider o esta vacio")
  return context
}

export const TaskProvider = ({ children }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [readTasks, setReadTasks] = useState([])

  const signup = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password)

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const reset = (email) => {
    sendPasswordResetEmail(auth, email)
  }

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logout = () =>
    signOut(auth)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (!user)
        navigate('/login')
    })
  }, [])

  useEffect(() => {
    getData()
  }, [user])

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "task"), where("userID", "==", user?.uid)))
      const dataBase = querySnapshot.docs.map(doc => {
        const id = doc.id
        const title = doc.data().title
        const description = doc.data().description

        return { id, title, description }
      })
      setReadTasks(dataBase)
    } catch (error) {
      //console.log(error)
    }
  }

  const saveTask = async (title, description) =>
    await addDoc(collection(db, 'task'), {
      userID: user.uid,
      title: title,
      description: description
    })

  const deleteTask = (id) => deleteDoc(doc(db, 'task', id))

  const updateTask = (id, newTask) => updateDoc(doc(db, 'task', id), newTask)

  return (
    <taskContext.Provider value={{
      login,
      reset,
      loginWithGoogle,
      logout,
      signup,
      user,
      saveTask,
      readTasks,
      deleteTask,
      updateTask
    }}>
      {children}
    </taskContext.Provider>
  )
}
