import TaskItem from "./TaskItem";

function TaskList({tasks, selection, handleChangeStatus, handleDeleteTask}) {
    return (
        <ul>
            {tasks
                .filter((e) => selection === 'all' || e.status === selection)
                .map(({id, name, status}) => <TaskItem
                key={id}
                id={id}
                status={status}
                name={name}
                handleDeleteTask={handleDeleteTask}
                handleChangeStatus={handleChangeStatus}
            />)}
        </ul>
    );
}

export default TaskList;