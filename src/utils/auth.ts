import Cookies from 'js-cookie';

// set Cookies
export const getCookies = (key: string) => Cookies.get(key);

export const setCookies = (key: string, value: string) =>
  Cookies.set(key, value);

export const removeCookies = (key: string) => Cookies.remove(key);

// set localStorage
export const getStorage = (key: string) => localStorage.getItem(key);

// eslint-disable-next-line
export const setStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeStorage = (key: string) => localStorage.removeItem(key);

export const clearStorage = () => localStorage.clear();
