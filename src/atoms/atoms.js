import { atom } from 'jotai';

// Check for saved preference or system preference
const getInitialDarkMode = () => {
    if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            return savedMode === 'true';
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
};

// Dark mode atom with initial value from localStorage or system preference
export const darkModeAtom = atom(getInitialDarkMode());

// Education filter atoms
export const educationQueryAtom = atom('');
export const educationActiveTypesAtom = atom(['Degree', 'Certification', 'Course']);
export const educationSelectedTypeAtom = atom('Degree');
export const educationActiveTagsAtom = atom([]);
export const educationSortByAtom = atom('newest');
export const educationViewModeAtom = atom('timeline');
export const educationShowStatsAtom = atom(true);

// Selected education item atom
export const selectedEducationAtom = atom(null);

// Portfolio filter atoms
export const skillsFilterAtom = atom('all');
export const projectsFilterAtom = atom('all');
export const servicesFilterAtom = atom('all');

// UI state atoms
export const isSearchFocusedAtom = atom(false);
export const mobileMenuOpenAtom = atom(false);

// Loading states
export const isLoadingAtom = atom(false);
export const loadingMessageAtom = atom('Loading...');

// Theme preferences
export const themeColorAtom = atom('#3B82F6');
export const accentColorAtom = atom('#9333EA');

// Animation preferences
export const animationsEnabledAtom = atom(true);
export const reducedMotionAtom = atom(false);

// Scroll position atom
export const scrollPositionAtom = atom(0);

// Active section atom for navigation
export const activeSectionAtom = atom('home');
