
import React from 'react';
import { Database, Link as LinkIcon, Table } from 'lucide-react';

const DatabaseSchemaView: React.FC = () => {
  const tables = [
    {
      name: 'Users (المستخدمون)',
      fields: ['id (PK)', 'name', 'email', 'password', 'role (Enum)', 'avatar_url', 'created_at'],
      color: 'bg-blue-500'
    },
    {
      name: 'Students (الطلاب)',
      fields: ['id (PK)', 'user_id (FK)', 'parent_id (FK)', 'grade_id (FK)', 'stage (Enum)', 'stars', 'points'],
      color: 'bg-green-500'
    },
    {
      name: 'Classes (الصفوف)',
      fields: ['id (PK)', 'name', 'teacher_id (FK)', 'room_number', 'capacity'],
      color: 'bg-purple-500'
    },
    {
      name: 'Grades (العلامات)',
      fields: ['id (PK)', 'student_id (FK)', 'subject_id (FK)', 'score', 'max_score', 'exam_date'],
      color: 'bg-amber-500'
    },
    {
      name: 'Attendance (الحضور)',
      fields: ['id (PK)', 'student_id (FK)', 'date', 'status (Enum)', 'remarks'],
      color: 'bg-red-500'
    },
    {
      name: 'Fees (الرسوم)',
      fields: ['id (PK)', 'parent_id (FK)', 'amount', 'due_date', 'status (Boolean)', 'transaction_ref'],
      color: 'bg-slate-700'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
           <Database className="text-blue-600" size={32} />
           <h2 className="text-2xl font-bold text-slate-800">مخطط قاعدة البيانات (System Architecture)</h2>
        </div>
        
        <p className="text-slate-500 mb-8 max-w-2xl">
          يعتمد النظام على هيكل بيانات علائقي (Relational) يضمن التكامل بين جميع الأدوار. الجداول مصممة لتكون قابلة للتوسع وتدعم الاستعلامات المعقدة للتقارير.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
              <div className={`${table.color} p-4 text-white font-bold flex items-center justify-between`}>
                <span className="flex items-center gap-2">
                   <Table size={18} />
                   {table.name}
                </span>
              </div>
              <div className="p-4 flex-1 space-y-2">
                {table.fields.map((field, fi) => (
                  <div key={fi} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg border border-slate-100">
                    <span className="font-mono text-slate-600">{field}</span>
                    {field.includes('PK') && <span className="text-blue-500 font-bold uppercase text-[9px]">Primary</span>}
                    {field.includes('FK') && <span className="text-orange-500 font-bold uppercase text-[9px]">Foreign</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <LinkIcon size={20} />
            العلاقات الأساسية (Relations)
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>علاقة (1:1) بين User و Student/Teacher</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>علاقة (1:N) بين Parent و Students (تعدد الأبناء)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>علاقة (1:N) بين Student و Grades/Attendance</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <span>علاقة (N:M) بين Teachers والصفوف عبر جدول وسيط</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchemaView;
