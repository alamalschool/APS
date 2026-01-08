
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT'
}

export enum EducationStage {
  KG = 'KG',
  PRIMARY = 'PRIMARY',
  PREPARATORY = 'PREPARATORY',
  SECONDARY = 'SECONDARY'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student extends User {
  stage: EducationStage;
  grade: string;
  parentId: string;
  stars: number;
  points: number;
}

export interface Teacher extends User {
  subject: string;
  classes: string[];
}

export interface Grade {
  subject: string;
  score: number;
  maxScore: number;
  date: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Homework {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface FeeStatus {
  total: number;
  paid: number;
  remaining: number;
  isPaid: boolean;
}
