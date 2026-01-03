const BASE = import.meta.env.VITE_API_URL || 'https://task-manager-89mo.onrender.com/api';
console.debug('API BASE:', BASE);

export const getStats = async () => {
  const res = await fetch(`${BASE}/tasks/stats`);
  if (!res.ok) throw new Error('Failed to load stats');
  return res.json();
};

export const addTask = async (task) => {
  const res = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to add task');
  }

  return res.json();
};

export const getTasks = async () => {
  const res = await fetch(`${BASE}/tasks`);
  if (!res.ok) throw new Error('Failed to load tasks');
  return res.json();
};

export const updateTask = async (id, patch) => {
  const res = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to update task');
  }
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to delete task');
  }
  return res.json();
};
