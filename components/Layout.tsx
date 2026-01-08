
import React from 'react';
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
  Database
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

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">أ</div>
          <h1 className="text-xl font-bold text-slate-800">مدرسة الأمل</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
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
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium">مرحباً بك،</span>
            <span className="text-slate-900 font-bold">{userName}</span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full border border-slate-200 uppercase">
              {role === UserRole.ADMIN ? 'مدير' : role === UserRole.TEACHER ? 'معلم' : role === UserRole.PARENT ? 'ولي أمر' : 'طالب'}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Role Switcher for Demo Purposes */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              {Object.values(UserRole).map(r => (
                <button
                  key={r}
                  onClick={() => onRoleChange(r)}
                  className={`text-[10px] px-2 py-1 rounded transition-all ${role === r ? 'bg-white shadow-sm font-bold text-blue-600' : 'text-slate-500'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            
            <button className="relative text-slate-400 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <img src={`https://picsum.photos/seed/${userName}/100`} alt="avatar" />
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
