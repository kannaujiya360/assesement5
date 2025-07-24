import React, { useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

const App = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Task Manager
          </h1>
          <p className="text-sm font-light mt-1">
            Create, edit, and organize your tasks efficiently
          </p>
        </div>

        
        <div className="p-8 grid md:grid-cols-2 gap-10">
          
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              {selectedTask ? "✏️ Edit Task" : "➕ Add a New Task"}
            </h2>
            <TaskForm
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </div>

          
          <div className="border-l pl-6 border-gray-200">
            <TaskList setSelectedTask={setSelectedTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
