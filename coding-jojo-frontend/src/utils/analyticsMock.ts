import React from 'react';

export interface CourseProgress {
  course: string;
  progress: number;
  timeSpent: number;
  lastAccess: string;
}

export interface SkillProgress {
  skill: string;
  level: number;
  growth: number;
}

export interface DailyData {
  day: string;
  hours: number;
}

export interface MockAnalytics {
  courseProgress: CourseProgress[];
  skillsProgress: SkillProgress[];
  learningTime: {
    thisWeek: number;
    lastWeek: number;
    dailyData: DailyData[];
  };
  achievements: {
    totalCompleted: number;
    thisMonth: number;
    streak: number;
    certificates: number;
  };
}

export const mockAnalytics: MockAnalytics = {
  courseProgress: [
    { course: 'Advanced JavaScript', progress: 85, timeSpent: 24.5, lastAccess: '2024-12-21' },
    { course: 'React Mastery', progress: 62, timeSpent: 18.2, lastAccess: '2024-12-20' },
    { course: 'TypeScript Guide', progress: 34, timeSpent: 12.8, lastAccess: '2024-12-18' },
    { course: 'Python Data Science', progress: 12, timeSpent: 5.5, lastAccess: '2024-12-15' }
  ],
  skillsProgress: [
    { skill: 'JavaScript', level: 85, growth: 12 },
    { skill: 'React', level: 72, growth: 18 },
    { skill: 'TypeScript', level: 45, growth: 22 },
    { skill: 'Node.js', level: 38, growth: 8 },
    { skill: 'Python', level: 25, growth: 15 }
  ],
  learningTime: {
    thisWeek: 24.5,
    lastWeek: 18.2,
    dailyData: [
      { day: 'Mon', hours: 3.5 },
      { day: 'Tue', hours: 2.8 },
      { day: 'Wed', hours: 4.2 },
      { day: 'Thu', hours: 1.5 },
      { day: 'Fri', hours: 3.8 },
      { day: 'Sat', hours: 2.3 },
      { day: 'Sun', hours: 4.1 }
    ]
  },
  achievements: {
    totalCompleted: 23,
    thisMonth: 4,
    streak: 15,
    certificates: 3
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'text-blue-400 bg-blue-400/10';
  if (progress >= 60) return 'text-blue-400 bg-blue-400/10';
  if (progress >= 40) return 'text-yellow-400 bg-yellow-400/10';
  return 'text-gray-400 bg-gray-400/10';
};

export const calculateLearningTimeChange = (analytics: MockAnalytics) => {
  const change = ((analytics.learningTime.thisWeek - analytics.learningTime.lastWeek) / analytics.learningTime.lastWeek) * 100;
  return {
    percentage: Math.abs(change).toFixed(1),
    isPositive: change > 0
  };
};
