export const BASE_URL = import.meta.env.VITE_BASE_URL || '';
export const INIT_URLS = [`${BASE_URL}/api/v1/first`, `${BASE_URL}/api/v1/second`, `${BASE_URL}/api/v1/third`];
export const POLL_URLS = [`${BASE_URL}/api/v1/first/poll`, `${BASE_URL}/api/v1/second/poll`, `${BASE_URL}/api/v1/third/poll`];
export const SOURCES = ['first', 'second', 'third'];
export const NUM_AFTER_COMMA = 3;
export const DELAY_TIME = 500;