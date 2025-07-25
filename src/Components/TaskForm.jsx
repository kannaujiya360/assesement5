import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  title: "",
  description: "",
  status: "PENDING",
};


const BASE_URL = "https://server-6-og92.onrender.com/api/tasks";

const TaskForm = ({ selectedTask, setSelectedTask }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
    setFormData(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;

    try {
      if (selectedTask) {
        await axios.put(`${BASE_URL}/${selectedTask.id}`, formData);
        setSelectedTask(null);
      } else {
        await axios.post(BASE_URL, formData);
      }

      setFormData(initialState);
      window.location.reload();
    } catch (error) {
      alert("Failed to submit task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl p-6 rounded-2xl space-y-4 max-w-xl w-full mx-auto transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold text-white text-center">
        {selectedTask ? "Edit Task" : "Add New Task"}
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title..."
        className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the task..."
        className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        rows="4"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="PENDING">🕗 Pending</option>
        <option value="IN_PROGRESS">🚧 In Progress</option>
        <option value="COMPLETED"> Completed</option>
      </select>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {selectedTask ? "Update Task" : "Create Task"}
        </button>

        {selectedTask && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
