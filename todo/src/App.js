import "./App.css";
import { useEffect, useState } from "react";

import { loadFromLocalStorage, saveToLocalStorage } from "./utils/localStorage";
import uuidGen from "./utils/uuidGen";

import Headline from "./components/Headline";
import TaskInput from "./components/Taskinput";
import TaskList from "./components/TaskList";


function App() {
  const [value, setValue] = useState("");
  const [tasks, setTask] = useState([]);
  const [selection, setSelection] = useState("all")

  useEffect(() => {
    setTask(loadFromLocalStorage("tds"));
  }, []);

  useEffect(() => {
    saveToLocalStorage("tds", tasks);
  }, [tasks]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (value !== "") {
      if (event.key === "Enter") {
        const newTask = [
          {
            name: value,
            id: uuidGen(),
            status: false,
          }, ...tasks
        ];
        setTask(newTask);
        setValue("");
      }
    }
  };

  function handleChangeStatus(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status;
      }
      return task;
    });

    setTask(newTasks);
  }

  function handleDeleteTask(id) {
    setTask(tasks.filter((task) => task.id !== id));
  }

  return (
    <div className="App">
      <Headline />
      <TaskInput
        value={value}
        handleChange={handleChange}
        handleKeyUp={handleKeyUp}
      />
      <TaskList
        tasks={tasks}
        handleChangeStatus={handleChangeStatus}
        handleDeleteTask={handleDeleteTask}
      />
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
}

export default App;
