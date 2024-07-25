const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };

// added the following to check and see if there is a logout element on pg
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('#logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
  
// document.querySelector('#logout').addEventListener('click', logout);