import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post("/api/tasks", {
      title,
      status: "Pending"
    });

    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    loadTasks();
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          style={{ padding: 10, width: 300 }}
        />

        <button onClick={addTask}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 10
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.status}</p>

            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
