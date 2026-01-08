
import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  MessageSquare, 
  Bell, 
  LogOut,
  CreditCard,
  Settings,
  Database,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  userName: string;
  onLogout: () => void;
  onRoleChange: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  role, 
  userName, 
  onLogout, 
  onRoleChange, 
  currentView, 
  setCurrentView 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getMenuItems = () => {
    const common = [
      { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
      { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    ];

    switch (role) {
      case UserRole.ADMIN:
        return [
          ...common,
          { id: 'users', label: 'إدارة المستخدمين', icon: Users },
          { id: 'classes', label: 'توزيع الفصول', icon: BookOpen },
          { id: 'reports', label: 'التقارير', icon: ClipboardCheck },
          { id: 'schema', label: 'هيكل النظام', icon: Database },
        ];
      case UserRole.TEACHER:
        return [
          ...common,
          { id: 'attendance', label: 'رصد الحضور', icon: ClipboardCheck },
          { id: 'materials', label: 'المواد التعليمية', icon: BookOpen },
          { id: 'grades', label: 'رصد الدرجات', icon: Settings },
        ];
      case UserRole.PARENT:
        return [
          ...common,
          { id: 'children', label: 'الأبناء', icon: Users },
          { id: 'fees', label: 'الرسوم الدراسية', icon: CreditCard },
        ];
      case UserRole.STUDENT:
        return [
          ...common,
          { id: 'homework', label: 'الواجبات', icon: BookOpen },
          { id: 'grades', label: 'نتائجي', icon: ClipboardCheck },
        ];
      default:
        return common;
    }
  };

  const handleNavItemClick = (viewId: string) => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-200 flex flex-col shadow-xl transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:shadow-sm
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">أ</div>
            <h1 className="text-xl font-bold text-slate-800">مدرسة الأمل</h1>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 md:gap-4 overflow-hidden">
              <span className="text-slate-500 font-medium whitespace-nowrap">مرحباً،</span>
              <span className="text-slate-900 font-bold truncate max-w-[150px]">{userName}</span>
              <span className="hidden md:inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full border border-slate-200 uppercase">
                {role === UserRole.ADMIN ? 'مدير' : role === UserRole.TEACHER ? 'معلم' : role === UserRole.PARENT ? 'ولي أمر' : 'طالب'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            {/* Role Switcher for Demo - Hidden on very small screens or made more compact */}
            <div className="hidden sm:flex gap-1 bg-slate-100 p-1 rounded-lg">
              {Object.values(UserRole).map(r => (
                <button
                  key={r}
                  onClick={() => onRoleChange(r)}
                  className={`text-[9px] md:text-[10px] px-1.5 md:px-2 py-1 rounded transition-all ${role === r ? 'bg-white shadow-sm font-bold text-blue-600' : 'text-slate-500'}`}
                >
                  {r.substring(0, 3)}
                </button>
              ))}
            </div>
            
            <button className="relative text-slate-400 hover:text-blue-600 transition-colors p-1">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-200 rounded-full overflow-hidden border border-slate-300 flex-shrink-0">
              <img src={`https://picsum.photos/seed/${userName}/100`} alt="avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
