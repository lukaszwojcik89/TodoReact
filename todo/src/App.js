import './App.css';
import {useEffect, useState} from "react";

import {collection, doc, writeBatch, onSnapshot} from "firebase/firestore";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import {db} from "./firebase";

function App() {
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState('all');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        });

        return () => {
            unsubscribe();
        }
    }, []);

    async function handleDeleteDone() {
        const batch = writeBatch(db);
        tasks.forEach(task => {
            if (task.status) {
                const ref = doc(db, 'todos', task.id);
                batch.delete(ref);
            }
        })

        await batch.commit();
    }

    return (
        <div className="App">
            <Headline/>
            <TaskInput/>
            {tasks.length === 0 ? ('') : (
                <>
                    <TaskList
                        tasks={tasks}
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