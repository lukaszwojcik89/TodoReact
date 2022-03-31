import './App.css';
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';

import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localstorage";
import uuidGen from "./utils/uuid";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { db } from "./firebase";


function App() {
    const [value, setValue] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState('all');

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        setTasks(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })));
    }

    useEffect(() => {
        getData().catch(() => { });
    }, []);

    useEffect(() => {
        setTasks(loadFromLocalStorage('tds'));
    }, []);

    useEffect(() => {
        saveToLocalStorage('tds', tasks);
    }, [tasks])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleKeyUp = async (event) => {
        if (event.key === 'Enter') {

            const newToDo = {
                name: value,
                status: false
            }

            const docRef = await addDoc(collection(db, "todos"), newToDo);

            setTasks([Object.assign(newToDo, { id: docRef.id }), ...tasks]);
            setValue('');
        }
    }


    async function handleChangeStatus(id) {

        const newTasks = tasks.filter(task => task.id === id)[0];
        newTasks.status = !newTasks.status;

        await updateDoc(doc(db, "todos", newTasks.id), { status: newTasks.status });

        setTasks([...tasks]);
    }

    async function handleDeleteTask(id) {
        await deleteDoc(doc(db, "todos", id));
        setTasks(tasks.filter(task => task.id !== id))
    }

    async function handleDeleteDone() {
        const batch = writeBatch(db); // create a batch
        tasks.forEach(task => { // loop through all tasks
            if(task.status) {   // if task is done
                const ref = doc(db, "todos", task.id); // get the reference
                batch.delete(ref); // delete the task
            }
        });
        await batch.commit();

        setTasks(tasks.filter(task => !task.status))
    }

    return (
        <div className="App">
            <Headline />
            <TaskInput
                value={value}
                handleChange={handleChange}
                handleKeyUp={handleKeyUp}
            />
            {tasks.length === 0 ? ('') : (
                <>
                    <TaskList
                        tasks={tasks}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        selection={selection}
                    />
                    {/*TODO move to separate component */}
                    <p>{tasks.filter((e) => !e.status).length} items left</p>

                    {/*TODO move to separate component */}
                    <div>
                        <button onClick={() => setSelection('all')}>All</button>
                        <button onClick={() => setSelection(false)}>Active</button>
                        <button onClick={() => setSelection(true)}>Completed</button>
                    </div>

                    {/*TODO move to separate component */}
                    {tasks.filter((e) => e.status).length > 0 ? (
                        <button onClick={handleDeleteDone}>Clear Completed</button>) : ('')}
                </>)
            }
        </div>
    );
}

export default App;
