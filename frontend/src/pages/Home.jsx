import { useEffect, useState } from "react";
import { getStats, getTasks } from "../services/taskApi";
import DashboardCards from "../components/DashboardCards";
import AddTaskModal from "../components/AddTaskModal";
import TasksList from "../components/TasksList";

export default function Home({ initialView = "dashboard", onViewChange }) {
  const [stats, setStats] = useState({});
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(initialView);
  const [tasks, setTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("All");

  const loadStats = async () => {
    const data = await getStats();
    setStats(data);
  };

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    if (view !== "dashboard") loadTasks();
  }, [view]);

  const handleViewChange = (newView) => {
    setView(newView);
    setPriorityFilter("All");
  };

  const renderTaskView = () => {
    let filteredTasks = [];
    
    if (view === "pending") {
      filteredTasks = tasks.filter((t) => t.status === "Pending");
    } else if (view === "completed") {
      filteredTasks = tasks.filter((t) => t.status === "Completed");
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      filteredTasks = filteredTasks.filter((t) => t.priority === priorityFilter);
    }

    return (
      <TasksList
        tasks={filteredTasks}
        currentView={view}
        refresh={() => {
          loadTasks();
          loadStats();
        }}
        onPriorityFilter={(priority) => setPriorityFilter(priority)}
        priorityFilter={priorityFilter}
      />
    );
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 sm:p-6 md:p-10 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome, User!</h1>
        <DashboardCards
          stats={stats}
          openModal={() => {
            handleViewChange("dashboard");
            setOpen(true);
          }}
          showList={(type) => {
            handleViewChange(type);
          }}
        />

        {view === "dashboard" && (
          <div className="mt-6 sm:mt-8">
            <div className="bg-white p-4 sm:p-6 rounded shadow">
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                You have <strong>{stats.total || 0} tasks</strong> in total. <strong>{stats.completed || 0} task{stats.completed !== 1 ? 's' : ''} is{stats.completed !== 1 ? '' : ''} complete</strong>, <strong>{stats.pending || 0} task{stats.pending !== 1 ? 's' : ''} {stats.pending !== 1 ? 'are' : 'is'} pending</strong>. Stay productive and manage your tasks efficiently!
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm sm:text-base">
                <li>Review your pending tasks regularly</li>
                <li>Prioritize your tasks to boost efficiency</li>
                <li>Keep your tasks organized to save time</li>
              </ul>
            </div>
          </div>
        )}

        {view === "pending" && renderTaskView()}

        {view === "completed" && renderTaskView()}
      </div>

      {open && (
        <AddTaskModal
          close={() => setOpen(false)}
          refresh={() => {
            loadStats();
            if (view !== "dashboard") loadTasks();
          }}
        />
      )}
    </div>
  );
}
