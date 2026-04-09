import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTheme = create(
    persist(
        (set, get) => ({
            theme: 'dark', // default: dark

            toggleTheme: () => {
                const next = get().theme === 'dark' ? 'light' : 'dark';
                set({ theme: next });
                document.documentElement.setAttribute('data-theme', next);
            },

            initTheme: () => {
                const current = get().theme;
                document.documentElement.setAttribute('data-theme', current);
            },
        }),
        { name: 'jnolly-theme' }
    )
);
