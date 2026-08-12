/* Shared navigation, language controls, and Essentials page motion. */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const langButton = document.getElementById('lang-toggle');
  const englishOption = document.getElementById('opt-en');
  const myanmarOption = document.getElementById('opt-my');

  const applyLanguage = (language) => {
    const useMyanmar = language === 'my';
    document.body.classList.toggle('lang-en', !useMyanmar);
    document.body.classList.toggle('lang-my', useMyanmar);
    englishOption?.classList.toggle('active', !useMyanmar);
    myanmarOption?.classList.toggle('active', useMyanmar);
    langButton?.setAttribute('aria-pressed', String(useMyanmar));
    langButton?.setAttribute(
      'aria-label',
      useMyanmar ? 'Switch site language to English' : 'Switch site language to Burmese'
    );
    document.dispatchEvent(new CustomEvent('hrh:languagechange', { detail: { language } }));
  };

  applyLanguage(localStorage.getItem('preferred_lang') || 'en');
  langButton?.addEventListener('click', () => {
    const nextLanguage = document.body.classList.contains('lang-my') ? 'en' : 'my';
    applyLanguage(nextLanguage);
    localStorage.setItem('preferred_lang', nextLanguage);
  });

  // Keep the Learn submenu pointed at the dedicated learning pages.  A few
  // older page templates still contain the former Essentials anchors; this
  // normalisation lets those templates share the same navigation immediately.
  const learnDestinations = Object.freeze({
    UDHR: 'ud.html',
    Articles: 'articles.html#articles',
    Conventions: 'convention.html',
  });

  document.querySelectorAll('#primary-menu a').forEach((link) => {
    const englishLabel = link.querySelector('.lang-en')?.textContent.trim();
    const destination = learnDestinations[englishLabel];
    if (!destination) return;

    link.setAttribute('href', destination);
    link.removeAttribute('data-route');
  });

  document.querySelectorAll('#primary-menu a').forEach((link) => {
    if (link.querySelector('.lang-en')?.textContent.trim() === 'Quiz') link.href = 'quiz.html';
  });

  const isLearningSubpage = document.body.classList.contains('page-udhr')
    || document.body.classList.contains('page-conventions');

  if (isLearningSubpage) {
    const primaryMenu = document.getElementById('primary-menu');
    const getTopLevelItem = (label) => Array.from(primaryMenu?.children || []).find((item) => (
      item.querySelector(':scope > a .lang-en')?.textContent.trim() === label
    ));

    const addDropdown = (item, entries) => {
      if (!item || item.querySelector(':scope > ul')) return;

      const dropdown = document.createElement('ul');
      entries.forEach(({ href, english, myanmar, route }) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = href;
        if (route) link.dataset.route = route;

        const englishText = document.createElement('span');
        englishText.className = 'lang-en';
        englishText.textContent = english;
        const myanmarText = document.createElement('span');
        myanmarText.className = 'lang-my';
        myanmarText.textContent = myanmar;

        link.append(englishText, myanmarText);
        listItem.append(link);
        dropdown.append(listItem);
      });
      item.append(dropdown);
    };

    // These two pages originated from an older navigation template. Bring
    // them in line with the current main-site menu without touching content.
    getTopLevelItem('See the Reality')?.remove();

    const mnhrcItem = getTopLevelItem('MNHRC');
    const mnhrcLink = mnhrcItem?.querySelector(':scope > a');
    if (mnhrcLink) {
      mnhrcLink.href = 'mnhrc.html#mnhrc';
      mnhrcLink.dataset.route = 'mnhrc';
    }
    addDropdown(mnhrcItem, [
      { href: 'mnhrc.html#mnhrc', route: 'mnhrc', english: 'What is MNHRC?', myanmar: 'MNHRC ဆိုတာဘာလဲ။' },
      { href: 'format.html', english: 'To collect a complaint letter', myanmar: 'တိုင်ကြားစာ ရယူရန်' },
    ]);

    const actionItem = getTopLevelItem('Take Action');
    const actionLink = actionItem?.querySelector(':scope > a');
    if (actionLink) actionLink.href = 'index.html#action';
    addDropdown(actionItem, [
      { href: 'chat.html', english: 'Anonymous Text Box', myanmar: 'အမည်မဖော် ရင်ဖွင့်စာ' },
      { href: 'eme.html', english: 'Emergency Support', myanmar: 'အရေးပေါ် အကူအညီ' },
    ]);

    document.querySelectorAll('.account-link[data-auth-open]').forEach((link) => {
      const mode = link.dataset.authOpen;
      link.href = `form.html?mode=${mode}`;
      link.removeAttribute('data-auth-open');
    });
  }

  const learningPage = document.getElementById('page-content')?.dataset.page;
  const learningSequence = {
    udhr: { next: { href: 'articles.html#articles', en: 'Explore the 30 UDHR Articles', my: 'UDHR အပိုဒ် ၃၀ ကို လေ့လာပါ' } },
    articles: {
      previous: { href: 'ud.html', en: 'Universal Declaration of Human Rights', my: 'UDHR ကြေညာစာတမ်း' },
      next: { href: 'convention.html', en: 'Human Rights Conventions', my: 'လူ့အခွင့်အရေး သဘောတူညီချက်များ' },
    },
    conventions: { previous: { href: 'articles.html#articles', en: 'Explore the 30 UDHR Articles', my: 'UDHR အပိုဒ် ၃၀ ကို လေ့လာပါ' } },
  };

  const currentLearningLinks = learningSequence[learningPage];
  if (currentLearningLinks) {
    const makeLearningLink = (direction, item) => {
      const link = document.createElement('a');
      link.className = `learning-path__link learning-path__link--${direction}`;
      link.href = item.href;
      link.innerHTML = direction === 'previous'
        ? `<span aria-hidden="true">←</span><span><small><span class="lang-en">Previous</span><span class="lang-my">ယခင်</span></small><strong><span class="lang-en">${item.en}</span><span class="lang-my">${item.my}</span></strong></span>`
        : `<span><small><span class="lang-en">Next</span><span class="lang-my">နောက်တစ်ခု</span></small><strong><span class="lang-en">${item.en}</span><span class="lang-my">${item.my}</span></strong></span><span aria-hidden="true">→</span>`;
      return link;
    };

    const existingUdhrLink = document.querySelector('.page-udhr .udhr-next');
    if (learningPage === 'udhr' && existingUdhrLink) {
      const next = currentLearningLinks.next;
      existingUdhrLink.href = next.href;
      const englishTitle = existingUdhrLink.querySelector('strong .lang-en');
      const myanmarTitle = existingUdhrLink.querySelector('strong .lang-my');
      if (englishTitle) englishTitle.textContent = next.en;
      if (myanmarTitle) myanmarTitle.textContent = next.my;
    } else if (learningPage !== 'articles') {
      const path = document.createElement('nav');
      path.className = 'learning-path';
      path.setAttribute('aria-label', 'Continue learning');
      if (currentLearningLinks.previous) path.append(makeLearningLink('previous', currentLearningLinks.previous));
      if (currentLearningLinks.next) path.append(makeLearningLink('next', currentLearningLinks.next));

      const content = document.getElementById('page-content');
      content?.querySelector('main, .categories-page')?.append(path);
    }
  }

  // Data Analysis is an MNHRC destination on every page that uses the shared
  // navigation. Add it once, even where an older template has a shorter menu.
  const globalPrimaryMenu = document.getElementById('primary-menu');
  const globalMnhItem = Array.from(globalPrimaryMenu?.children || []).find((item) => (
    item.querySelector(':scope > a .lang-en')?.textContent.trim() === 'MNHRC'
  ));
  if (globalMnhItem && !globalMnhItem.querySelector('a[href="analytics.html"]')) {
    let mnhrcDropdown = globalMnhItem.querySelector(':scope > ul');
    if (!mnhrcDropdown) {
      mnhrcDropdown = document.createElement('ul');
      globalMnhItem.append(mnhrcDropdown);
    }
    const analyticsItem = document.createElement('li');
    const analyticsLink = document.createElement('a');
    analyticsLink.href = 'analytics.html';
    const analyticsEnglish = document.createElement('span');
    analyticsEnglish.className = 'lang-en';
    analyticsEnglish.textContent = 'Data Analysis';
    const analyticsMyanmar = document.createElement('span');
    analyticsMyanmar.className = 'lang-my';
    analyticsMyanmar.textContent = 'ဒေတာခွဲခြမ်းစိတ်ဖြာခြင်း';
    analyticsLink.append(analyticsEnglish, analyticsMyanmar);
    analyticsItem.append(analyticsLink);
    mnhrcDropdown.append(analyticsItem);
  }

  if (nav && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      const description = menuToggle.querySelector('.sr-only');
      if (description) description.textContent = isOpen ? 'Close navigation menu' : 'Open navigation menu';
    });

    const updateNavShadow = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    updateNavShadow();
    window.addEventListener('scroll', updateNavShadow, { passive: true });
  }

  const applyPageMotion = () => {
    const revealElements = document.querySelectorAll('#page-content .animate-on-scroll');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          activeObserver.unobserve(entry.target);
        });
      }, { threshold: 0.1 });
      revealElements.forEach((element) => observer.observe(element));
    } else {
      revealElements.forEach((element) => element.classList.add('visible'));
    }

    const setMotion = (selector, motion) => {
      document.querySelectorAll(`#page-content ${selector}`).forEach((element, index) => {
        element.dataset.motion = motion;
        element.style.setProperty('--motion-index', index);
      });
    };

    if (document.body.classList.contains('page-essentials')) {
      setMotion('.categories-page > .page-header', 'essentials-header');
      setMotion('.generations-page > .page-header', 'generations-header');
      setMotion('.udhr-group', 'topic-group');
      setMotion('.rights-card', 'rights-card');
      setMotion('.generation-card', 'generation-card');
      setMotion('.framework-section .section-title', 'section-title');
      setMotion('.actor-card', 'actor-card');
      setMotion('.obligation-card', 'obligation-card');
      setMotion('.panel-card', 'panel-card');
    }

    const motionTargets = document.querySelectorAll('#page-content [data-motion]');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      motionTargets.forEach((element) => element.classList.add('is-revealed'));
      return;
    }

    document.documentElement.classList.add('motion-ready');
    const motionObserver = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });
    motionTargets.forEach((element) => motionObserver.observe(element));
  };

  const initHeroExperience = () => {
    const visual = document.querySelector('[data-hero-depth]');
    if (!visual || visual.dataset.heroDepthReady === 'true') return;
    visual.dataset.heroDepthReady = 'true';

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches;
    if (visual && !reducedMotion && !coarsePointer) {
      visual.addEventListener('pointermove', event => {
        const bounds = visual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        visual.style.transform = `rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
      });
      visual.addEventListener('pointerleave', () => {
        visual.style.transform = '';
      });
    }
  };

  const scrollToHash = (hash, behavior = 'smooth') => {
    const targetId = hash?.replace(/^#/, '');
    const target = targetId && document.getElementById(targetId);
    if (!target) return false;
    target.scrollIntoView({ behavior, block: 'start' });
    return true;
  };

  const syncBodyClass = (incomingBody) => {
    const languageClass = document.body.classList.contains('lang-my') ? 'lang-my' : 'lang-en';
    const authenticated = document.body.classList.contains('is-authenticated');
    document.body.className = incomingBody.className;
    document.body.classList.remove('lang-en', 'lang-my');
    document.body.classList.add(languageClass);
    document.body.classList.toggle('is-authenticated', authenticated);
  };

  const syncNavState = (page) => {
    const primaryItems = Array.from(document.querySelectorAll('#primary-menu > li'));
    primaryItems.forEach((item) => item.classList.remove('current'));
    // Essentials is a Home subpage. Only the dedicated UDHR learning pages
    // belong to the Learn navigation group.
    const isLearnPage = ['articles', 'udhr', 'conventions'].includes(page);
    const mnhrcIndex = primaryItems.findIndex((item) => (
      item.querySelector(':scope > a .lang-en')?.textContent.trim() === 'MNHRC'
    ));
    const quizIndex = primaryItems.findIndex((item) => (
      item.querySelector(':scope > a .lang-en')?.textContent.trim() === 'Quiz'
    ));
    const activeIndex = ['home', 'essentials'].includes(page) ? 0 : isLearnPage ? 1 : ['mnhrc', 'analytics'].includes(page) ? mnhrcIndex : page === 'quiz' ? quizIndex : -1;
    if (activeIndex >= 0) primaryItems[activeIndex]?.classList.add('current');

    document.querySelectorAll('#primary-menu [aria-current="page"]').forEach((link) => link.removeAttribute('aria-current'));
    if (page === 'udhr') {
      document.querySelector('#primary-menu a[href="ud.html"]')?.setAttribute('aria-current', 'page');
    } else if (page === 'articles') {
      document.querySelector('#primary-menu a[href="articles.html#articles"]')?.setAttribute('aria-current', 'page');
    } else if (page === 'conventions') {
      document.querySelector('#primary-menu a[href="convention.html"]')?.setAttribute('aria-current', 'page');
    } else if (page === 'analytics') {
      document.querySelector('#primary-menu a[href="analytics.html"]')?.setAttribute('aria-current', 'page');
    } else if (page === 'quiz') {
      document.querySelector('#primary-menu a[href="quiz.html"]')?.setAttribute('aria-current', 'page');
    } else if (page === 'mnhrc') {
      document.querySelector('#primary-menu a[data-route="mnhrc"]')?.setAttribute('aria-current', 'page');
    }
  };

  let isNavigating = false;
  const routeTable = Object.freeze({
    home: 'index.html#home',
    essentials: 'essential.html#framework',
    udhr: 'ud.html',
    articles: 'articles.html#articles',
    conventions: 'convention.html',
    mnhrc: 'mnhrc.html#mnhrc',
    analytics: 'analytics.html',
    quiz: 'quiz.html',
  });

  const navigate = async (url, updateHistory = true) => {
    const currentUrl = new URL(window.location.href);
    if (url.pathname === currentUrl.pathname) {
      if (url.hash) scrollToHash(url.hash);
      return;
    }

    if (isNavigating) return;
    isNavigating = true;
    nav?.classList.add('is-navigating');

    try {
      const response = await fetch(url.href, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`Could not load ${url.pathname}`);

      const incomingDocument = new DOMParser().parseFromString(await response.text(), 'text/html');
      const incomingContent = incomingDocument.getElementById('page-content');
      const currentContent = document.getElementById('page-content');
      if (!incomingContent || !currentContent) throw new Error('Page content container is missing.');

      currentContent.replaceWith(document.importNode(incomingContent, true));
      syncBodyClass(incomingDocument.body);
      syncNavState(incomingContent.dataset.page || '');
      document.title = incomingDocument.title;

      if (updateHistory) history.pushState({ route: url.pathname }, '', url.href);
      window.scrollTo({ top: 0, behavior: 'auto' });
      applyPageMotion();
      initHeroExperience();
      document.dispatchEvent(new CustomEvent('hrh:page-ready', {
        detail: { page: incomingContent.dataset.page || '' },
      }));
      if (url.hash) window.requestAnimationFrame(() => scrollToHash(url.hash, 'auto'));
    } catch (error) {
      console.error('Client-side navigation failed:', error);
      // A normal link navigation is the safe fallback for file previews or servers that block fetch.
      window.location.assign(url.href);
    } finally {
      isNavigating = false;
      nav?.classList.remove('is-navigating', 'menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute('data-auth-open') || link.target || link.hasAttribute('download')) return;

    // Main navigation must use normal browser links. The former fetch-based
    // router could consume the first press while the menu was still changing
    // state, which made visitors click a second time. Letting the browser
    // follow the real href keeps every navbar link reliable in one click.
    if (link.closest('.site-nav')) {
      nav?.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      return;
    }

    const namedRoute = link.dataset.route;
    const routeTarget = namedRoute ? routeTable[namedRoute] : null;
    const url = new URL(routeTarget || link.getAttribute('href'), window.location.href);
    const currentUrl = new URL(window.location.href);
    const isSameDocument = url.pathname === currentUrl.pathname;

    if (routeTarget) {
      event.preventDefault();
      navigate(url);
      return;
    }

    if (isSameDocument && url.hash) {
      event.preventDefault();
      if (scrollToHash(url.hash)) history.pushState({ anchor: url.hash }, '', url.href);
      return;
    }

    if (link.closest('.site-nav') && /\.html$/i.test(url.pathname)) {
      event.preventDefault();
      navigate(url);
    }
  });

  window.addEventListener('popstate', () => {
    const url = new URL(window.location.href);
    const currentContent = document.getElementById('page-content');
    const currentPage = currentContent?.dataset.page;
    const pathname = url.pathname.toLowerCase();
    const targetPage = pathname.includes('articles')
      ? 'articles'
      : pathname.includes('convention')
        ? 'conventions'
        : pathname.includes('ud.html')
          ? 'udhr'
          : pathname.includes('essential')
            ? 'essentials'
            : pathname.includes('analytics')
              ? 'analytics'
              : pathname.includes('quiz')
                ? 'quiz'
              : pathname.includes('mnhrc') ? 'mnhrc' : 'home';
    if (currentPage !== targetPage) navigate(url, false);
    else if (url.hash) scrollToHash(url.hash, 'auto');
  });

  syncNavState(document.getElementById('page-content')?.dataset.page || '');
  applyPageMotion();
  initHeroExperience();
});
