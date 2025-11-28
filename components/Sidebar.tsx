import React from 'react';
import { Home, Server, List, Calendar, FileText, Settings, MoreHorizontal, Ship } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: 'DASHBOARDS' },
    { icon: Server, label: 'QUẢN TRỊ HỆ THỐNG' },
    { icon: List, label: 'DANH MỤC' },
    { icon: Calendar, label: 'KẾ HOẠCH KHAI THÁC' },
    { icon: Settings, label: 'QUY TRÌNH KHAI THÁC' },
    { icon: FileText, label: 'BÁO CÁO' },
    { icon: MoreHorizontal, label: 'KHÁC' },
  ];

  return (
    <aside className="w-64 bg-[#0a3d5b] text-white flex flex-col flex-shrink-0 min-h-screen">
      {/* Logo Area */}
      <div className="h-24 bg-[#e6eef5] flex flex-col items-center justify-center border-b border-gray-300">
         <div className="flex flex-col items-center">
            <div className="text-[#0a3d5b] font-bold text-2xl flex items-center gap-2">
                <Ship className="w-8 h-8" />
                CSG
            </div>
            <div className="text-[#0a3d5b] text-[10px] font-bold tracking-widest mt-1">SAIGON PORT</div>
            <div className="text-blue-500 text-[8px] mt-1">Member of VIMC</div>
         </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className={`flex items-center px-4 py-3 text-sm font-medium hover:bg-[#083047] transition-colors border-l-4 ${index === 3 ? 'border-orange-500 bg-[#083047]' : 'border-transparent'}`}
              >
                <item.icon className="w-5 h-5 mr-3 opacity-80" />
                {item.label}
                <span className="ml-auto text-gray-400">›</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;