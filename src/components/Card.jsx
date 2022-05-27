import { Card, Form, Button } from "react-bootstrap"

const Cards = ({ data, handleChange, handleSubmit }) => {
  const { title, content, date, time } = data
  return (
    <Card className="col-6">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            placeholder="Title"
            value={title} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleChange}
            rows={3}
            value={content} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            onChange={handleChange}
            value={date} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            onChange={handleChange}
            value={time} />
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
