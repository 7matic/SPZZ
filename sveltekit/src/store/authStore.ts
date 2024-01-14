import {writable} from 'svelte/store';

function createAuthStore() {
    const initialValue = typeof window !== 'undefined' ? localStorage.getItem('token') : false;
    const store = writable(initialValue);

    return {
        subscribe: store.subscribe,
        set: (value) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('isAuthenticated', value);
            }
            store.set(value);
        },
        reset: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('isAuthenticated');
            }
            store.set(false);
        }
    };
}

export const isAuthenticated = createAuthStore();