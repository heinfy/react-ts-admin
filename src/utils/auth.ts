import Cookies from 'js-cookie';

// set Cookies
export const getCookies = (key: string) => Cookies.get(key) || '';

export const setCookies = (key: string, value: string) =>
  Cookies.set(key, value);

export const removeCookies = (key: string) => Cookies.remove(key);
