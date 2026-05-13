// theme-init.js — applies dark/light mode before render to prevent flash.
// Order: ?theme= URL param → localStorage("yohan-theme") → system preference → 'light'
(function () {
  try {
    const params = new URLSearchParams(location.search);
    const fromUrl = params.get('theme');
    const fromLS = localStorage.getItem('yohan-theme');
    const fromSys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = fromUrl || fromLS || fromSys;
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    window.__yohanTheme = theme;
    window.__yohanSetTheme = function (next) {
      if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('yohan-theme', next);
      window.__yohanTheme = next;
      window.dispatchEvent(new CustomEvent('yohan-theme', { detail: next }));
    };
  } catch { /* noop */ }
})();
