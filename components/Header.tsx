import React from 'react';
import { Menu, LogOut, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-10">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-[#ff5722] tracking-wide uppercase" style={{ fontFamily: 'Times New Roman, serif' }}>
          GTOS - CẢNG TÂN THUẬN
        </h1>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
          <span>LIÊN KẾT TRANG</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <span>Welcome, Administrator</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <button className="text-gray-400 hover:text-gray-600 border-l pl-4 border-gray-300">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;