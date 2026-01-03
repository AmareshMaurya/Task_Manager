import React from "react";

export default function Navbar({ onMenuClick }) {
	return (
		<header className="bg-white shadow p-3 sm:p-4 flex items-center justify-between sticky top-0 z-40">
			<button
				onClick={onMenuClick}
				className="md:hidden p-2 hover:bg-gray-100 rounded"
				title="Toggle menu"
			>
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
			<div className="text-base sm:text-lg font-semibold">TaskManager</div>
			<div className="text-xs sm:text-sm text-gray-600">Hello, User</div>
		</header>
	);
}
