
    }
  };

  // Cards flip on click or keyboard activation and the same action flips them
  // back. A dataset guard keeps this safe when content is replaced in-app.
  const initFlipCards = () => {
    document.querySelectorAll('.char-flip-card').forEach((card) => {
      if (card.dataset.flipReady === 'true') return;
      card.dataset.flipReady = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-label', 'Show card definition');

      const hints = card.querySelectorAll('.flip-hint span');
      if (hints[0]) hints[0].textContent = 'Click or tap to flip ↺';
      if (hints[1]) {
        hints[1].className = 'lang-my';
        hints[1].textContent = 'လှည့်ကြည့်ရန် နှိပ်ပါ ↺';
      }

      const toggleFlip = () => {
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
        card.setAttribute('aria-label', isFlipped ? 'Show card title' : 'Show card definition');
      };

      card.addEventListener('click', toggleFlip);
      card.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleFlip();
      });
    });
  };

  const scrollToHash = (hash, behavior = 'smooth') => {
    const targetId = hash?.replace(/^#/, '');
    const target = targetId && document.getElementById(targetId);
      window.scrollTo({ top: 0, behavior: 'auto' });
      applyPageMotion();
      initHeroExperience();
      initFlipCards();
      document.dispatchEvent(new CustomEvent('hrh:page-ready', {
        detail: { page: incomingContent.dataset.page || '' },
      }));
  syncNavState(document.getElementById('page-content')?.dataset.page || '');
  applyPageMotion();
  initHeroExperience();
  initFlipCards();
});
