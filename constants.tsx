
import { UserRole, EducationStage, Student, Teacher, Announcement, Grade, Homework, AttendanceRecord } from './types';

export const COLORS = {
  primary: '#2563eb', // Blue
  secondary: '#10b981', // Green
  accent: '#f59e0b', // Amber/Yellow
  danger: '#ef4444',
  bg: '#f8fafc',
};

export const MOCK_STUDENT: Student = {
  id: 'st_1',
  name: 'أحمد محمد علي',
  role: UserRole.STUDENT,
  stage: EducationStage.PRIMARY,
  grade: 'الصف الثالث الابتدائي',
  parentId: 'pr_1',
  stars: 12,
  points: 450,
  avatar: 'https://picsum.photos/seed/child1/200'
};

export const MOCK_TEACHER: Teacher = {
  id: 'th_1',
  name: 'أ/ سارة محمود',
  role: UserRole.TEACHER,
  subject: 'اللغة العربية',
  classes: ['3/أ', '3/ب', '4/ج'],
  avatar: 'https://picsum.photos/seed/teacher1/200'
};

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'إجازة يوم التأسيس', content: 'نحيطكم علماً بأن يوم الخميس القادم إجازة رسمية بمناسبة يوم التأسيس.', date: '2024-05-15', author: 'الإدارة' },
  { id: '2', title: 'بدء التسجيل للعام الجديد', content: 'تم فتح باب التسجيل للعام الدراسي القادم بخصومات خاصة للمبكرين.', date: '2024-05-10', author: 'قسم القبول' }
];

export const MOCK_GRADES: Grade[] = [
  { subject: 'اللغة العربية', score: 95, maxScore: 100, date: '2024-05-01' },
  { subject: 'الرياضيات', score: 88, maxScore: 100, date: '2024-05-03' },
  { subject: 'العلوم', score: 92, maxScore: 100, date: '2024-05-05' }
];

export const MOCK_HOMEWORK: Homework[] = [
  { id: 'h1', subject: 'الرياضيات', title: 'حل تمارين ص 45', dueDate: '2024-05-20', status: 'pending' },
  { id: 'h2', subject: 'العلوم', title: 'رسم دورة حياة النبات', dueDate: '2024-05-21', status: 'pending' }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { date: '2024-05-18', status: 'present' },
  { date: '2024-05-17', status: 'present' },
  { date: '2024-05-16', status: 'late' },
  { date: '2024-05-15', status: 'present' }
];
