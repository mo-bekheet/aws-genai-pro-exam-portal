import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonProgress {
  lessonId: string;
  completedAt: string;
}

interface LessonStore {
  completedLessons: LessonProgress[];
  markLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  resetProgress: () => void;
}

export const useLessonStore = create<LessonStore>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      
      markLessonComplete: (lessonId: string) => {
        const { completedLessons } = get();
        const exists = completedLessons.find(c => c.lessonId === lessonId);
        
        if (!exists) {
          set({
            completedLessons: [
              ...completedLessons,
              { lessonId, completedAt: new Date().toISOString() }
            ]
          });
        }
      },
      
      isLessonCompleted: (lessonId: string) => {
        return get().completedLessons.some(c => c.lessonId === lessonId);
      },
      
      resetProgress: () => {
        set({ completedLessons: [] });
      }
    }),
    {
      name: 'lesson-progress-storage',
    }
  )
);