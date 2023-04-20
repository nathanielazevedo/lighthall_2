const endpoint = "http://localhost:3000";

// READ
const fetchTasks = async (userId) => {
  return fetch(`${endpoint}/task/${userId}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// CREATE
const addTask = async (task) => {
  return fetch(`${endpoint}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// DELETE
const deleteTask = async (taskId) => {
  return fetch(`${endpoint}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// UPDATE
const updateTask = async (taskId) => {
  return fetch(`${endpoint}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export { fetchTasks, addTask, deleteTask, updateTask };
