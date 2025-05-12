
// auth.js - Protección de páginas con login

if (!sessionStorage.getItem('usuarioLogueado')) {
  sessionStorage.setItem('urlDestino', window.location.href);
  window.location.href = 'login.html';
}
