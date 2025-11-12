export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict`;
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'token=; path=/; max-age=0';
  }
};

export const isAuthenticated = () => {
  return !!getToken();
};