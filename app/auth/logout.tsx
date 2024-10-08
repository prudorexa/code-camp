export default function logout() {
    localStorage.removeItem('token'); // if you're using JWT
    window.location.href = '/';
  }
  