import {writable} from 'svelte/store';

/**
 * @description
 * Stores the user's authentication status.
 */
export const isAuthenticated = writable(false);

/**
 * @description
 * Stores the user's profile.
 */
export const user = writable({});

/**
 * @description
 * Stores whether the popup is open or not.
 */
export const popupOpen = writable(false);
export const error = writable();