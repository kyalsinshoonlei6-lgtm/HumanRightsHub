(() => {
  'use strict';

  function applyOriginalLanguage(language) {
    const body = document.body;
    const useEnglish = language === 'en';

    body.setAttribute('data-lang', language);
    body.classList.toggle('lang-en', useEnglish);
    body.classList.toggle('lang-my', !useEnglish);
  }

  function initialiseOriginalPage() {
    const root = document.querySelector('.mnhrc-original');
    if (!root || root.dataset.mnhrcReady === 'true') return;
    root.dataset.mnhrcReady = 'true';

    const synchroniseWithSharedLanguage = () => {
      const language = document.body.classList.contains('lang-my') ? 'my' : 'en';
      applyOriginalLanguage(language);
    };

    window.setTimeout(synchroniseWithSharedLanguage, 0);

    const sharedLanguageButton = document.getElementById('lang-toggle');
    if (sharedLanguageButton && sharedLanguageButton.dataset.mnhrcSync !== 'true') {
      sharedLanguageButton.dataset.mnhrcSync = 'true';
      sharedLanguageButton.addEventListener('click', () => {
        window.setTimeout(synchroniseWithSharedLanguage, 0);
      });
    }

    initialiseReadiness(root);

    const cards = root.querySelectorAll('.card');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -4% 0px'
    });

    cards.forEach(card => observer.observe(card));
  }

  function initialiseReadiness(root) {
    const checks = [...root.querySelectorAll('[data-readiness-check]')];
    const value = root.querySelector('#complaint-readiness-value');
    const bar = root.querySelector('#complaint-readiness-bar');
    const progress = root.querySelector('.complaint-readiness__progress');
    const reportButton = root.querySelector('#complaint-report-button');
    if (!checks.length || !value || !bar || !progress || !reportButton) return;

    const updateReadiness = () => {
      const completed = checks.filter(check => check.checked).length;
      const percentage = Math.round((completed / checks.length) * 100);
      const isReady = percentage === 100;

      value.textContent = `${percentage}%`;
      bar.style.width = `${percentage}%`;
      progress.setAttribute('aria-valuenow', String(percentage));
      reportButton.setAttribute('aria-disabled', String(!isReady));
      reportButton.tabIndex = isReady ? 0 : -1;
    };

    checks.forEach(check => check.addEventListener('change', updateReadiness));
    reportButton.addEventListener('click', event => {
      if (reportButton.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });
    updateReadiness();
  }

  document.addEventListener('DOMContentLoaded', initialiseOriginalPage);
  document.addEventListener('hrh:page-ready', initialiseOriginalPage);
})();
