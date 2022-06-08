import { Card, Form, Button } from "react-bootstrap"

const Cards = ({ state, dispatch, handleSubmit }) => {
  return (
    <Card className="col-5 m-auto mt-0">
      <Form onSubmit={(event) => handleSubmit(event, state)}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={state.title}
            placeholder="Title"
            onChange={(e) => dispatch({ ...state, type: "title", payload: e.target.value })} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={state.description}
            placeholder="description"
            onChange={(e) => dispatch({ ...state, type: "description", payload: e.target.value })} />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="success mb-3 rounded-pill"
            type="submit"
            size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </Card>

  )
}

export default Cards
