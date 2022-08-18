import { BsFillPencilFill, BsFillTrashFill, BsPlusLg } from "react-icons/bs"
import { Button, Table } from "react-bootstrap"

const Tasks = ({ tasks, handleUpdate, handleDelete, handleNewTask }) => {
  return (
    <div className="col-lg-5 col-12 m-auto mt-0">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center col-1">#</th>
            <th className="text-center col-8">Title</th>
            <th className="text-center col-3">Buttons</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <th className="text-center">{index + 1}</th>
              <th className="text-center" onClick={() => handleUpdate(task.id)}>{task.title}</th>
              <th className="d-flex justify-content-around">
                <Button
                  variant="primary"
                  onClick={() => handleUpdate(task.id)}
                  className="rounded-circle"
                >
                  <BsFillPencilFill />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(task.id)}
                  className="rounded-circle"
                >
                  <BsFillTrashFill />
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-grid gap-2 col-8 m-auto mb-5">
        <Button
          variant="primary rounded-pill position-relative"
          onClick={handleNewTask}>
          <p className="m-auto p-1">New Task</p>
          <BsPlusLg className="position-absolute top-50 end-0 translate-middle" />
        </Button>
      </div>

    </div>
  )
}

export default Tasks
