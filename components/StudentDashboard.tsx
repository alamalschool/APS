
import React from 'react';
import { 
  Star, 
  Trophy, 
  Book, 
  Gamepad2, 
  Clock,
  Layout,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { MOCK_STUDENT, MOCK_GRADES, MOCK_HOMEWORK } from '../constants';
import { EducationStage } from '../types';

const StudentDashboard: React.FC = () => {
  const isKG = MOCK_STUDENT.stage === EducationStage.KG;
  const isPrimary = MOCK_STUDENT.stage === EducationStage.PRIMARY;

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      {/* Header for Kids */}
      {(isKG || isPrimary) && (
        <div className="bg-gradient-to-l from-yellow-400 via-orange-400 to-red-400 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/50">
                 <img src={MOCK_STUDENT.avatar} className="w-20 h-20 rounded-full" alt="student" />
              </div>
              <div className="text-center md:text-right">
                <h2 className="text-3xl font-black mb-2 italic">بطلنا المبدع {MOCK_STUDENT.name.split(' ')[0]}!</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30">
                     <Star className="text-yellow-200 fill-yellow-200" size={20} />
                     <span className="font-bold">{MOCK_STUDENT.stars} نجمة</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30">
                     <Trophy className="text-amber-200 fill-amber-200" size={20} />
                     <span className="font-bold">{MOCK_STUDENT.points} نقطة</span>
                  </div>
                </div>
              </div>
           </div>
           {/* Decorative items */}
           <div className="absolute top-0 right-0 p-4 opacity-20">
             <Gamepad2 size={120} />
           </div>
        </div>
      )}

      {!isKG && !isPrimary && (
         <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">أهلاً بك يا بطل!</h2>
              <p className="text-slate-500">تابع دروسك وواجباتك اليومية من هنا</p>
            </div>
         </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Assignments / Tasks */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                  <Book className="text-blue-500" size={24} />
                  واجبات ممتعة بانتظارك
                </h3>
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">2 اليوم</span>
             </div>
             
             <div className="space-y-4">
                {MOCK_HOMEWORK.map((hw, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:shadow-md transition-all border border-transparent hover:border-blue-100 group cursor-pointer">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                          <PlayCircle size={24} />
                       </div>
                       <div>
                          <p className="font-bold text-slate-800">{hw.title}</p>
                          <p className="text-xs text-slate-500">مادة {hw.subject} • تسليم غداً</p>
                       </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      ابدأ الآن
                    </button>
                  </div>
                ))}
             </div>
          </section>

          {/* Gamified Progress for Primary */}
          {(isKG || isPrimary) && (
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                 <Trophy className="text-amber-500" size={24} />
                 مستواك في التعلم
               </h3>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'القراءة', icon: '📖', color: 'bg-green-100', val: 80 },
                    { label: 'الحساب', icon: '🔢', color: 'bg-blue-100', val: 65 },
                    { label: 'العلوم', icon: '🧬', color: 'bg-purple-100', val: 90 },
                    { label: 'الرسم', icon: '🎨', color: 'bg-orange-100', val: 100 },
                  ].map((it, i) => (
                    <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <span className="text-3xl mb-2">{it.icon}</span>
                      <span className="text-xs font-bold text-slate-500 mb-2">{it.label}</span>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${it.color.replace('100', '500')} rounded-full`} style={{width: `${it.val}%`}}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </section>
          )}
        </div>

        {/* Schedule / Sidebar */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="text-blue-500" size={20} />
                جدول الحصص القادمة
              </h3>
              <div className="space-y-6">
                 {[
                   { sub: 'الرياضيات', time: '09:00 ص', room: 'معمل 2', status: 'upcoming' },
                   { sub: 'العلوم', time: '10:30 ص', room: 'الفصل 3/أ', status: 'next' },
                 ].map((c, i) => (
                   <div key={i} className="relative pr-6 border-r-2 border-slate-100 pb-2">
                      <div className={`absolute -right-[9px] top-0 w-4 h-4 rounded-full border-4 border-white ${c.status === 'next' ? 'bg-blue-500 scale-125' : 'bg-slate-300'}`}></div>
                      <p className="text-xs font-bold text-slate-400">{c.time}</p>
                      <p className="font-bold text-slate-800">{c.sub}</p>
                      <p className="text-xs text-slate-500">{c.room}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-3xl text-white text-center shadow-lg">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30 backdrop-blur-md">
                 <Layout size={40} />
              </div>
              <h4 className="font-bold text-xl mb-2">غرفة الألعاب</h4>
              <p className="text-indigo-100 text-xs mb-6 opacity-80">أنهِ واجباتك لتفتح ألعاباً جديدة ومسابقات!</p>
              <button className="w-full bg-white text-indigo-600 py-3 rounded-2xl font-bold shadow-sm hover:scale-105 transition-transform">
                دخول الغرفة
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
