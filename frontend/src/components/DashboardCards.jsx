export default function DashboardCards({ stats, openModal, showList }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
      <div
        onClick={openModal}
        className="cursor-pointer bg-blue-500 text-white p-4 sm:p-6 rounded text-center hover:bg-blue-600 transition shadow hover:shadow-lg"
      >
        <h3 className="text-sm sm:text-base font-semibold">Add Task Now</h3>
        <p className="text-4xl sm:text-5xl lg:text-6xl font-bold">+</p>
      </div>
      <div
        onClick={() => showList && showList('completed')}
        className="cursor-pointer bg-green-500 text-white p-4 sm:p-6 rounded text-center hover:bg-green-600 transition shadow hover:shadow-lg"
      >
        <h3 className="text-sm sm:text-base font-semibold">Complete Tasks</h3>
        <p className="text-2xl sm:text-3xl font-bold">{stats.completed || 0}</p>
      </div>

      <div
        onClick={() => showList && showList('pending')}
        className="cursor-pointer bg-orange-500 text-white p-4 sm:p-6 rounded text-center hover:bg-orange-600 transition shadow hover:shadow-lg"
      >
        <h3 className="text-sm sm:text-base font-semibold">Pending Tasks</h3>
        <p className="text-2xl sm:text-3xl font-bold">{stats.pending || 0}</p>
      </div>
    </div>
  );
}
