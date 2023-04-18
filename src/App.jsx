import "./App.css";
import { useState, useEffect } from "react";
import { fetchTasks } from "./api";
import Task from "./components/Task";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewTasks] = useState("")


  const handleChange = (event) => {
    setNewTasks(event.target.value)
  }

  const addTask = () => {
    setTasks([...tasks, newTasks])
  }

  return (
    <div className="container">
      <h1 className="title">Tasks</h1>
      <div className="addTask">
        <input onChange={handleChange}/>
        <button onClick={addTask}> Add Task</button>
      </div>

      <div className="list">
      {tasks.map((tasks) => {
          return (
            <div>
              <h1>{tasks}</h1>
            </div>
          )
        })}
      </div>
      
    </div>
  );
};

export default App;
