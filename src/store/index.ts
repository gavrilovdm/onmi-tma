import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createTimerSlice, TimerSlice } from './slices/timerSlice';

type StoreState = TimerSlice;

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createTimerSlice(...a),
      // ...createUserSlice(...a),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        actions: state.actions,
        timers: state.timers,
      }),
    }
  )
); 