import React from "react";

export default function Sidebar({ currentView, onNavigate, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { label: "Dashboard", view: "dashboard" },
    { label: "Tasks", view: "pending" },
    { label: "Settings", view: "settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed md:static top-0 left-0 h-screen md:h-auto w-56 bg-white border-r z-40 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="flex items-center justify-between p-3 sm:p-4 font-bold border-b">
          <span>Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-3 sm:p-4">
          <ul className="space-y-2 text-gray-700">
            {menuItems.map((item) => (
              <li
                key={item.view}
                onClick={() => onNavigate && onNavigate(item.view)}
                className={`p-2 rounded cursor-pointer transition ${
                  currentView === item.view
                    ? "bg-blue-500 text-white font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
