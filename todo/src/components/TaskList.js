import TaskItem from "./TaskItem"

function TaskList({ tasks, handleChangeStatus, handleDeleteTask }) {
    return (
        <ul>
            {tasks.map(({ id, name, status }) => <TaskItem 
            key={id}
            id = {id}
            status = {status}
            name = {name}
            handleChangeStatus = {handleChangeStatus}
            handleDeleteTask = {handleDeleteTask}
            />)}
        </ul>
    );

}

export default TaskList