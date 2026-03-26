import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, Domain } from '@/types';

interface QuestionPracticeStore {
  currentIndex: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  mode: 'practice' | 'timed';
  timer: number;
  timerActive: boolean;
  
  // Filters
  filters: {
    domains: string[];
    difficulty: string[];
    status: 'all' | 'saved' | 'flagged' | 'attempted';
    tags: string[];
    search: string;
  };
  
  // Question interactions
  flaggedQuestions: string[];
  savedQuestions: string[];
  likedQuestions: string[];
  attemptedQuestions: Record<string, string>; // questionId -> selectedAnswer
  
  // Actions
  selectAnswer: (answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  toggleFlag: (questionId: string) => void;
  toggleSave: (questionId: string) => void;
  toggleLike: (questionId: string) => void;
  setMode: (mode: 'practice' | 'timed') => void;
  startTimer: () => void;
  stopTimer: () => void;
  tickTimer: () => void;
  resetFilters: () => void;
  setFilterDomain: (domains: string[]) => void;
  setFilterDifficulty: (difficulty: string[]) => void;
  setFilterStatus: (status: 'all' | 'saved' | 'flagged' | 'attempted') => void;
  setFilterSearch: (search: string) => void;
}

export const useQuestionPracticeStore = create<QuestionPracticeStore>()(
  persist(
    (set, get) => ({
      currentIndex: 0,
      selectedAnswer: null,
      isAnswered: false,
      mode: 'practice',
      timer: 0,
      timerActive: false,
      
      filters: {
        domains: [],
        difficulty: [],
        status: 'all',
        tags: [],
        search: '',
      },
      
      flaggedQuestions: [],
      savedQuestions: [],
      likedQuestions: [],
      attemptedQuestions: {},
      
      selectAnswer: (answer: string) => {
        set({ selectedAnswer: answer, isAnswered: true });
      },
      
      nextQuestion: () => {
        set((state) => ({ 
          currentIndex: state.currentIndex + 1,
          selectedAnswer: null,
          isAnswered: false
        }));
      },
      
      prevQuestion: () => {
        set((state) => ({ 
          currentIndex: Math.max(0, state.currentIndex - 1),
          selectedAnswer: null,
          isAnswered: false
        }));
      },
      
      goToQuestion: (index: number) => {
        set({ currentIndex: index, selectedAnswer: null, isAnswered: false });
      },
      
      toggleFlag: (questionId: string) => {
        const { flaggedQuestions } = get();
        const exists = flaggedQuestions.includes(questionId);
        set({
          flaggedQuestions: exists 
            ? flaggedQuestions.filter(id => id !== questionId)
            : [...flaggedQuestions, questionId]
        });
      },
      
      toggleSave: (questionId: string) => {
        const { savedQuestions } = get();
        const exists = savedQuestions.includes(questionId);
        set({
          savedQuestions: exists 
            ? savedQuestions.filter(id => id !== questionId)
            : [...savedQuestions, questionId]
        });
      },
      
      toggleLike: (questionId: string) => {
        const { likedQuestions } = get();
        const exists = likedQuestions.includes(questionId);
        set({
          likedQuestions: exists 
            ? likedQuestions.filter(id => id !== questionId)
            : [...likedQuestions, questionId]
        });
      },
      
      setMode: (mode: 'practice' | 'timed') => {
        set({ mode, timerActive: mode === 'timed' });
      },
      
      startTimer: () => {
        set({ timerActive: true });
      },
      
      stopTimer: () => {
        set({ timerActive: false });
      },
      
      tickTimer: () => {
        const { timerActive, timer } = get();
        if (timerActive) {
          set({ timer: timer + 1 });
        }
      },
      
      resetFilters: () => {
        set({
          filters: {
            domains: [],
            difficulty: [],
            status: 'all',
            tags: [],
            search: '',
          }
        });
      },
      
      setFilterDomain: (domains: string[]) => {
        set((state) => ({ filters: { ...state.filters, domains } }));
      },
      
      setFilterDifficulty: (difficulty: string[]) => {
        set((state) => ({ filters: { ...state.filters, difficulty } }));
      },
      
      setFilterStatus: (status: 'all' | 'saved' | 'flagged' | 'attempted') => {
        set((state) => ({ filters: { ...state.filters, status } }));
      },
      
      setFilterSearch: (search: string) => {
        set((state) => ({ filters: { ...state.filters, search } }));
      },
    }),
    {
      name: 'question-practice-storage',
      partialize: (state) => ({
        flaggedQuestions: state.flaggedQuestions,
        savedQuestions: state.savedQuestions,
        likedQuestions: state.likedQuestions,
        attemptedQuestions: state.attemptedQuestions,
        mode: state.mode,
      }),
    }
  )
);