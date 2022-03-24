function TaskItem({ id, status, name, handleChangeStatus, handleDeleteTask }) {
    return (
        <li className="todo-item">
            <span
                className={status ? "status done" : "status active"}
                onClick={() => handleChangeStatus(id)}
            />
            {name}
            <button onClick={() => handleDeleteTask(id)}> X </button>{" "}
        </li>
    )
}

export default TaskItem