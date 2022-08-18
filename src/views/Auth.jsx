import { Card, Form, Button, Alert } from "react-bootstrap"
import { BsGoogle } from "react-icons/bs"
import { useEffect, useReducer, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTask } from "../context/TaskContext"

const Auth = () => {

  const navigate = useNavigate()

  const { login, reset, loginWithGoogle, signup } = useTask()

  const path = useLocation().pathname.split('/').join('')

  const [error, setError] = useState()

  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: ""
  })

  function reducer(state, action) {
    switch (action.type) {
      case "email":
        return { ...state, email: action.payload }
      case "password":
        return { ...state, password: action.payload }
      default:
        return state
    }
  }

  useEffect(() => setError(), [path])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { email, password } = state
    if (path == "login") {
      try {

        await login(email, password)
        navigate('/')

      } catch (err) {
        setError(err.code.split('/').join(': ').split('-').join(' '))
      }
    }
    if (path == "register") {
      try {

        await signup(email, password)
        navigate('/')

      } catch (err) {
        setError(err.code.split('/').join(': ').split('-').join(" "))
      }
    }
  }

  const handleGoogle = async () => {
    await loginWithGoogle()

    setTimeout(() => navigate('/'), 5000)
  }

  const handleReset = async () => {
    if (!state.email) return setError('Please enter you email')
    try {
      await reset(state.email)
    } catch (error) {
      setError(err.code.split('/').join(': ').split('-').join(' '))
    }
  }

  return (
    <div className="row mt-5">
      <Alert variant={'danger '} className={`text-center col-4 m-auto d-${!error && "none"}`}>{error}</Alert>
      <h1 className=" text-center my-3 mx-auto">
        {path == "login" ? "Login" : "Register"}
      </h1>
      <Card className="col-6 m-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={state.email}
              placeholder="Enter email"
              onChange={(e) => dispatch({ type: 'email', payload: e.target.value })} />
            <Form.Text
              className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={state.password}
              placeholder="*******"
              onChange={(e) => dispatch({ type: 'password', payload: e.target.value })} />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary mb-3 rounded-pill"
              type="submit"
              size="lg">
              Submit
            </Button>
          </div>
          <br />
          <h6 className="text-center">OR</h6>
          <div className="d-grid gap-2">
            <Button variant="white border border-dark  mb-3 rounded-pill"
              size="lg"
              onClick={handleGoogle}>
              <BsGoogle />
            </Button>
          </div>
          <div className="position-relative p-3">
            <div className="position-absolute top-0 start-0">
              <Link className="link-primary" to={`/${path !== "login" ? "login" : "register"}`}>
                {path == "login" ? "Register" : "Login"}
              </Link>
            </div>
            {
              path == 'login' && (
                <div className="position-absolute top-0 end-0">
                  <p
                    style={{ cursor: "pointer" }}
                    className="link-primary"
                    onClick={handleReset}>
                    <a>
                      Forgot Password?
                    </a>
                  </p>
                </div>
              )
            }
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Auth
