import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

function TaskItem({id, status, name}) {
    async function handleDeleteTask() {
        await deleteDoc(doc(db, 'todos', id));
    }

    async function handleChangeStatus() {
        await updateDoc(doc(db, 'todos', id), {status: !status});
    }

    return (
        <li className='todo-item'>
            <span
                className={status ? 'status done' : 'status active'}
                onClick={handleChangeStatus}
            />
            <span>{name}</span>
            <button onClick={handleDeleteTask}>x</button>
        </li>
    );
}

export default TaskItem;