(() => {
  const resolve = () => {
    let saved;
    try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Storage may be disabled. */ }
    document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  resolve();
  addEventListener('storage', resolve);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', resolve);
})();
