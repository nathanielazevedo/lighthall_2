import "./App.css";
import { useState, useEffect } from "react";
import { fetchTasks } from "./api";
import Task from "./components/Task";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch Tasks on page load
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      console.log(tasksFromServer);
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => <Task task={task} key={task.id} />)
      ) : (
        <h3>No Tasks To Show</h3>
      )}
    </div>
  );
};

export default App;
