
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';
import StudentDashboard from './components/StudentDashboard';
import DatabaseSchemaView from './components/DatabaseSchemaView';
import { MOCK_STUDENT, MOCK_TEACHER } from './constants';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-slate-500 font-medium animate-pulse">جاري تحميل مدرسة الأمل...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center animate-in zoom-in-95 duration-500">
           <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-200">أ</div>
           <h1 className="text-3xl font-bold text-slate-800 mb-2">مدرسة الأمل الخاصة</h1>
           <p className="text-slate-500 mb-8">نظام الإدارة المدرسية المتكامل</p>
           
           <form onSubmit={handleLogin} className="space-y-6 text-right">
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 mr-2">اسم المستخدم</label>
               <input 
                 type="text" 
                 defaultValue="admin@amal.edu.sa"
                 className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left" 
                 placeholder="أدخل بريدك الإلكتروني"
               />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-bold text-slate-700 mr-2">كلمة المرور</label>
               <input 
                 type="password" 
                 defaultValue="********"
                 className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left" 
                 placeholder="أدخل كلمة المرور"
               />
             </div>
             <button 
               type="submit"
               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
             >
               دخول للنظام
             </button>
           </form>
           
           <div className="mt-8 flex items-center gap-2 justify-center text-xs text-slate-400">
             <span>تواصل مع الدعم الفني</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
             <span>شروط الاستخدام</span>
           </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentView === 'schema') return <DatabaseSchemaView />;
    
    switch (role) {
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.TEACHER:
        return <TeacherDashboard />;
      case UserRole.PARENT:
        return <ParentDashboard />;
      case UserRole.STUDENT:
        return <StudentDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  const getUserName = () => {
    switch (role) {
      case UserRole.TEACHER: return MOCK_TEACHER.name;
      case UserRole.STUDENT: return MOCK_STUDENT.name;
      case UserRole.PARENT: return "أ/ محمد علي (ولي أمر)";
      default: return "أحمد المدير";
    }
  };

  return (
    <Layout 
      role={role} 
      userName={getUserName()} 
      onLogout={handleLogout}
      onRoleChange={setRole}
      currentView={currentView}
      setCurrentView={setCurrentView}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
