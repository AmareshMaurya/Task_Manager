import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/taskApi";

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toISOString().slice(0, 10);
}

export default function TasksList({ tasks = [], refresh, onPriorityFilter, priorityFilter, currentView }) {
  const [editing, setEditing] = useState(null);
  const [local, setLocal] = useState({});

  const startEdit = (task) => {
    setEditing(task._id);
    setLocal({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "Low",
      dueDate: formatDate(task.dueDate),
      status: task.status || "Pending",
    });
  };

  const saveEdit = async (id) => {
    try {
      await updateTask(id, local);
      setEditing(null);
      refresh();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  const markComplete = async (id) => {
    try {
      await updateTask(id, { status: 'Completed' });
      refresh();
    } catch (err) {
      alert('Could not mark complete: ' + err.message);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      refresh();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const viewTitle = currentView === "pending" ? "Pending Tasks" : "Completed Tasks";

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">{viewTitle}</h2>
      </div>

      {/* Priority Filter Section */}
      <div className="bg-white p-3 sm:p-4 rounded shadow mb-4 sm:mb-6">
        <h3 className="font-semibold mb-2 sm:mb-3 text-xs sm:text-sm">Filter by Priority:</h3>
        <div className="flex gap-2 flex-wrap">
          {["All", "Low", "Medium", "High"].map((priority) => (
            <button
              key={priority}
              onClick={() => onPriorityFilter(priority)}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition ${
                priorityFilter === priority
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      {!tasks.length ? (
        <div className="mt-4 sm:mt-6 text-gray-600 text-center py-12">
          <p>No tasks to show</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {tasks.map((t) => (
            <div key={t._id} className="bg-white p-3 sm:p-4 rounded shadow hover:shadow-lg transition">
              {editing === t._id ? (
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <label className="text-xs sm:text-sm font-semibold block">Title</label>
                    <input
                      className="border w-full p-2 rounded text-sm"
                      value={local.title}
                      onChange={(e) => setLocal({ ...local, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold block">Description</label>
                    <textarea
                      className="border w-full p-2 rounded h-16 resize-none text-sm"
                      value={local.description}
                      onChange={(e) => setLocal({ ...local, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold block">Priority</label>
                      <select
                        className="border w-full p-1 sm:p-2 rounded text-sm"
                        value={local.priority}
                        onChange={(e) => setLocal({ ...local, priority: e.target.value })}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-semibold block">Due Date</label>
                      <input
                        type="date"
                        className="border w-full p-1 sm:p-2 rounded text-sm"
                        value={local.dueDate}
                        onChange={(e) => setLocal({ ...local, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-semibold block">Status</label>
                    <select
                      className="border w-full p-1 sm:p-2 rounded text-sm"
                      value={local.status}
                      onChange={(e) => setLocal({ ...local, status: e.target.value })}
                    >
                      <option>Pending</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button onClick={() => saveEdit(t._id)} className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">Save</button>
                    <button onClick={() => setEditing(null)} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{t.title}</h3>
                  {t.description && <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{t.description}</p>}
                  <div className="text-xs text-gray-500 space-y-1 mb-2 sm:mb-3">
                    <p><strong>Priority:</strong> <span className={`font-semibold ${t.priority === 'High' ? 'text-red-600' : t.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{t.priority}</span></p>
                    <p><strong>Due:</strong> {formatDate(t.dueDate)}</p>
                    <p><strong>Status:</strong> <span className={t.status === 'Completed' ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>{t.status}</span></p>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-wrap">
                    <button onClick={() => startEdit(t)} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm hover:bg-gray-100">Edit</button>
                    <button onClick={() => remove(t._id)} className="px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm text-red-600 hover:bg-red-50">Delete</button>
                    {t.status !== 'Completed' && (
                      <button onClick={() => markComplete(t._id)} className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded text-xs sm:text-sm hover:bg-green-600">Complete</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
