import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#061226] via-[#0b2545] to-[#0f2b4d] text-white py-1 px-3 border-t-4 border-[#1f6feb]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-1">
          <h2 className="text-xs font-semibold mb-0">Task Manager</h2>
          <p className="text-gray-400 text-[11px] leading-tight max-w-lg mx-auto">
            Organize your tasks efficiently and boost your productivity. Stay focused on what matters most and manage your daily activities with ease.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-1 mb-1">
          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition text-xs"
            title="Facebook"
          >
            <i className="fab fa-facebook">f</i>
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition text-xs"
            title="Twitter"
          >
            <i className="fab fa-twitter">𝕏</i>
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition text-xs"
            title="Google"
          >
            <i className="fab fa-google">G</i>
          </a>
          <a
            href="www.linkedin.com/in/amaresh-maurya"
            className="text-gray-300 hover:text-blue-400 transition text-xs"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin">in</i>
          </a>
          <a
            href="https://github.com/AmareshMaurya"
            className="text-gray-300 hover:text-blue-400 transition text-xs"
            title="GitHub"
          >
            <i className="fab fa-github">&lt;&gt;</i>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-0.5 text-center">
          <p className="text-gray-500 text-[10px]">&copy; 2026 Task Manager. All rights reserved.</p>
          <p className="text-gray-400 text-[10px] mt-0.5">Author: Amaresh Maurya</p>
          <div className="flex justify-center gap-1 mt-1 text-[10px] text-gray-400">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
