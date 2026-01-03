import { useState } from "react";
import { addTask } from "../services/taskApi";

export default function AddTaskModal({ close, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await addTask(form);
      refresh();
      close();
    } catch (err) {
      console.error(err);
      alert('Could not save task: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Add Task</h2>
        
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold mb-1">Task Title (Required)</label>
          <input
            placeholder="Enter task title"
            className="border w-full p-2 rounded text-sm"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold mb-1">Description (Optional)</label>
          <textarea
            placeholder="Enter task description"
            className="border w-full p-2 rounded h-20 sm:h-24 resize-none text-sm"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1">Priority</label>
            <select
              className="border w-full p-2 rounded text-sm"
              value={form.priority}
              onChange={e => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-1">Due Date (Required)</label>
            <input
              type="date"
              className="border w-full p-2 rounded text-sm"
              value={form.dueDate}
              onChange={e => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-semibold mb-1">Status</label>
          <select
            className="border w-full p-2 rounded text-sm"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row">
          <button
            disabled={!form.title || !form.dueDate || loading}
            onClick={submit}
            className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded disabled:opacity-50 text-sm font-medium flex-1 sm:flex-initial"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={close}
            className="px-3 sm:px-4 py-2 border rounded text-sm font-medium flex-1 sm:flex-initial"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
