import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const TaskList = ({ setSelectedTask }) => {
  const [tasks, setTasks] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`${BASE_URL}/api/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Task List</h2>

      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center">No tasks available.</div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h3>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              <p className="text-sm text-gray-700">{task.description}</p>
              <p className="text-xs text-gray-400">Task ID: {task.id}</p>

              <div className="flex justify-end gap-4 mt-2">
                <button
                  onClick={() => setSelectedTask(task)}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="flex items-center text-sm text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
