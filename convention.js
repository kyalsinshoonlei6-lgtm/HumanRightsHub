/* Expandable treaty sections for the Conventions learning page. */
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('[data-convention-toggle]');

  const setExpanded = (toggle, expanded) => {
    const panelId = toggle.getAttribute('data-convention-toggle');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    toggle.setAttribute('aria-expanded', String(expanded));
    panel.hidden = !expanded;

    const icon = toggle.querySelector('.convention-toggle-icon');
    if (icon) icon.textContent = expanded ? '−' : '+';
  };

  toggles.forEach((toggle) => {
    setExpanded(toggle, toggle.getAttribute('aria-expanded') === 'true');

    toggle.addEventListener('click', () => {
      setExpanded(toggle, toggle.getAttribute('aria-expanded') !== 'true');
    });

    toggle.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      setExpanded(toggle, toggle.getAttribute('aria-expanded') !== 'true');
    });
  });
});
