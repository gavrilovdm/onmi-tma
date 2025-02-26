import { StateCreator } from 'zustand';

export interface Action {
  label: string;
  icon: string;
  isReady: boolean;
  timer?: string;
  id: string;
}

export interface TimerSlice {
  actions: Action[];
  timers: { [key: string]: number };
  setTimer: (id: string, duration: number) => void;
  updateAction: (id: string, isReady: boolean) => void;
  decrementTimers: () => void;
}

const initialActions: Action[] = [
  { label: "Feed", icon: "/icons/feed-icon.svg", isReady: true, id: "feed" },
  { label: "Train", icon: "/icons/train-icon.svg", isReady: true, id: "train" },
  { label: "Sleep", icon: "/icons/sleep-icon.svg", isReady: true, id: "sleep" },
];

export const createTimerSlice: StateCreator<TimerSlice> = (set) => ({
  actions: initialActions,
  timers: {},
  
  setTimer: (id: string, duration: number) =>
    set((state) => ({
      timers: {
        ...state.timers,
        [id]: duration,
      },
    })),

  updateAction: (id: string, isReady: boolean) =>
    set((state) => ({
      actions: state.actions.map((action) =>
        action.id === id ? { ...action, isReady } : action
      ),
    })),

  decrementTimers: () =>
    set((state) => {
      const newTimers = { ...state.timers };
      const expiredTimers: string[] = [];

      Object.entries(state.timers).forEach(([id, timeLeft]) => {
        if (timeLeft <= 1) {
          expiredTimers.push(id);
        } else {
          newTimers[id] = timeLeft - 1;
        }
      });

      // Если есть истекшие таймеры, удаляем их
      expiredTimers.forEach((id) => {
        delete newTimers[id];
      });

      // Обновляем статус действий для истекших таймеров
      if (expiredTimers.length > 0) {
        return {
          timers: newTimers,
          actions: state.actions.map((action) =>
            expiredTimers.includes(action.id)
              ? { ...action, isReady: true }
              : action
          ),
        };
      }

      return { timers: newTimers };
    }),
}); 