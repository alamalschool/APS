
import React from 'react';
import { 
  Users, 
  GraduationCap, 
  School, 
  TrendingUp,
  FileText,
  Download,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'إجمالي الطلاب', value: '1,240', icon: Users, color: 'bg-blue-500' },
    { label: 'المعلمون', value: '86', icon: GraduationCap, color: 'bg-green-500' },
    { label: 'الفصول الدراسية', value: '42', icon: School, color: 'bg-purple-500' },
    { label: 'نسبة النجاح', value: '94%', icon: TrendingUp, color: 'bg-amber-500' },
  ];

  const data = [
    { name: 'الروضة', value: 200 },
    { name: 'الابتدائي', value: 450 },
    { name: 'الإعدادي', value: 300 },
    { name: 'الثانوي', value: 290 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">نظرة عامة على المدرسة</h2>
          <p className="text-slate-500">متابعة أداء المدرسة والعمليات الإدارية</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 shadow-sm transition-all">
            <Download size={18} />
            <span>تصدير PDF</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all">
            <Plus size={18} />
            <span>إضافة مستخدم جديد</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl text-white ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">توزيع الطلاب حسب المرحلة</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">طلبات التسجيل الجديدة</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">ط</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">يوسف أحمد حسن</p>
                  <p className="text-xs text-slate-500">المرحلة الابتدائية - الصف الأول</p>
                </div>
                <button className="text-blue-600 hover:underline text-xs font-bold">مراجعة</button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-blue-600 font-medium">عرض الكل</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
