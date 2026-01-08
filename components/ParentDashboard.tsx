
import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  Star, 
  Calendar,
  ChevronLeft,
  BookOpen,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { MOCK_STUDENT, MOCK_GRADES, MOCK_HOMEWORK, MOCK_ANNOUNCEMENTS } from '../constants';

const ParentDashboard: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('0');
  
  const children = [
    { name: 'أحمد محمد علي', grade: '3/أ', avatar: 'https://picsum.photos/seed/child1/100', status: 'at_school' },
    { name: 'ليلى محمد علي', grade: '1/ب', avatar: 'https://picsum.photos/seed/child2/100', status: 'at_school' }
  ];

  const feeStatus = {
    total: 15000,
    paid: 10000,
    remaining: 5000,
    deadline: '2024-06-30'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">بوابة ولي الأمر</h2>
          <p className="text-slate-500">متابعة الأداء الدراسي والمالي للأبناء</p>
        </div>
        
        {/* Child Switcher */}
        <div className="flex gap-2 p-1 bg-white border border-slate-100 rounded-2xl shadow-sm">
          {children.map((child, i) => (
            <button
              key={i}
              onClick={() => setSelectedChild(i.toString())}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                selectedChild === i.toString() 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <img src={child.avatar} alt={child.name} className="w-8 h-8 rounded-full border border-white/50" />
              <span className="text-sm font-bold">{child.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Dashboard Summary for Child */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">الأداء الأكاديمي</h3>
                <Star className="text-amber-400 fill-amber-400" size={20} />
              </div>
              <div className="space-y-3">
                {MOCK_GRADES.slice(0, 2).map((grade, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{grade.subject}</span>
                    <span className="font-bold text-blue-600">{grade.score}%</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider">عرض الشهادة كاملة</button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">الواجبات اليومية</h3>
                <div className="px-2 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded">2 متبقي</div>
              </div>
              <div className="space-y-3">
                {MOCK_HOMEWORK.map((hw, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-slate-600 truncate">{hw.title}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider">عرض كل الواجبات</button>
            </div>
          </div>

          {/* School Announcements */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
             <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
               <AlertCircle className="text-blue-600" size={24} />
               إعلانات المدرسة
             </h3>
             <div className="space-y-6">
                {MOCK_ANNOUNCEMENTS.map(ann => (
                  <div key={ann.id} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{ann.title}</h4>
                      <span className="text-[10px] font-bold text-slate-400">{ann.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{ann.content}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Finance card */}
          <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="text-blue-400" size={24} />
                  <span className="text-sm font-medium opacity-70">المستحقات المالية</span>
                </div>
                <div className="mb-8">
                  <span className="text-3xl font-bold">{feeStatus.remaining.toLocaleString()} ر.س</span>
                  <p className="text-xs opacity-50 mt-1">المتبقي من إجمالي {feeStatus.total.toLocaleString()}</p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/50">
                  سداد الآن
                </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          </div>

          {/* Messaging */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4">التواصل السريع</h3>
             <div className="space-y-3">
               <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all group">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <MessageCircle size={16} />
                    </div>
                    <span className="text-sm font-medium">مراسلة المعلمين</span>
                 </div>
                 <ChevronLeft size={16} className="text-slate-400 group-hover:translate-x-[-4px] transition-transform" />
               </button>
               <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all group">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                      <Users size={16} />
                    </div>
                    <span className="text-sm font-medium">مراسلة الإدارة</span>
                 </div>
                 <ChevronLeft size={16} className="text-slate-400 group-hover:translate-x-[-4px] transition-transform" />
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
