
import React from 'react';
import { 
  Users, 
  Calendar, 
  FilePlus, 
  CheckCircle,
  MessageCircle,
  Clock,
  ChevronLeft
} from 'lucide-react';
import { MOCK_TEACHER } from '../constants';

const TeacherDashboard: React.FC = () => {
  const classes = [
    { name: 'الصف الثالث - أ', students: 28, time: '08:00 ص', subject: 'اللغة العربية' },
    { name: 'الصف الثالث - ب', students: 30, time: '09:30 ص', subject: 'اللغة العربية' },
    { name: 'الصف الرابع - ج', students: 25, time: '11:00 ص', subject: 'اللغة العربية' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">لوحة تحكم المعلم</h2>
          <p className="text-slate-500">إدارة الفصول، المواد التعليمية، والدرجات</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all">
             <FilePlus size={18} />
             <span>إضافة واجب جديد</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Active Classes */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-4">حصص اليوم</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {classes.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Clock size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{c.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{c.name}</h4>
                  <p className="text-sm text-slate-500 mb-4">{c.subject}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-400">{c.students} طالب</span>
                    <button className="text-blue-600 text-xs font-bold flex items-center gap-1">
                      تسجيل الحضور
                      <ChevronLeft size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pending Tasks */}
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">مهام قيد التنفيذ</h3>
            <div className="space-y-4">
              {[
                { title: 'تصحيح واجب الرياضيات - 3/أ', status: '60%', count: '18/30' },
                { title: 'إدخال درجات الشهر - 4/ج', status: '0%', count: '0/25' },
                { title: 'رفع مذكرة القواعد النحوية', status: '100%', count: 'تم' }
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className={`p-2 rounded-lg ${task.status === '100%' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    <CheckCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{task.title}</p>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: task.status }}></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{task.count}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar info */}
        <div className="space-y-8">
          <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-lg font-bold mb-2">تواصل مع أولياء الأمور</h3>
               <p className="text-indigo-100 text-sm mb-4 leading-relaxed">لديك 4 رسائل جديدة لم يتم الرد عليها من أولياء الأمور.</p>
               <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2">
                 <MessageCircle size={16} />
                 فتح البريد
               </button>
             </div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-4">جدول المواعيد</h3>
             <div className="space-y-4">
                {[
                  { title: 'اجتماع مجلس الإدارة', time: '01:00 م', color: 'border-red-400' },
                  { title: 'ورشة عمل تعليمية', time: '02:30 م', color: 'border-blue-400' }
                ].map((ev, i) => (
                  <div key={i} className={`p-3 border-r-4 ${ev.color} bg-slate-50 rounded-lg`}>
                    <p className="text-xs text-slate-400">{ev.time}</p>
                    <p className="text-sm font-bold text-slate-800">{ev.title}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
