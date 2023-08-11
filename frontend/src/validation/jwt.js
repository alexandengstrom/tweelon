import jwtDecode from 'jwt-decode';

export const isTokenExpired = () => {
  const token = localStorage.getItem('auth-token');
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const current_time = Date.now().valueOf() / 1000;
  console.log(decodedToken.exp)

  return decodedToken.exp < current_time;
}

export const isAuthenticated = () => {
  const authenticated = !isTokenExpired();

  console.log("AUTH TOKEN HERE");
  console.log(authenticated);

  if (!authenticated) {
    localStorage.removeItem("auth-token");
  }

  return authenticated;
}

export const getUserId = () => {
  const token = localStorage.getItem('auth-token');
  if (!token) return null;

  const decodedToken = jwtDecode(token);

  return decodedToken._id || null;
}