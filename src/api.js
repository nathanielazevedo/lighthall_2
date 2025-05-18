let endpoint = undefined;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  endpoint = "http://localhost:3000";
} else {
  endpoint = "https://lighthall2back-production.up.railway.app";
}

// READ
const fetchTasks = async (userId) => {
  return fetch(`${endpoint}/tasks/${userId}`)
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
    .then(async (res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};

// DELETE
const deleteTask = async (taskId) => {
  fetch(`${endpoint}/tasks/${taskId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((err) => {
      throw new Error("Something went wrong");
    });
};

// UPDATE
const updateTask = async (task) => {
  return fetch(`${endpoint}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (response.status === 200) {
        return "success";
      } else {
        throw new Error("Something went wrong");
      }
    })
    .catch((error) => {
      throw new Error("Something went wrong");
    });
};

export { fetchTasks, addTask, deleteTask, updateTask };
