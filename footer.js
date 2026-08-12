/* Shared, in-flow footer for every Human Rights Hub page. */
(() => {
  const scriptElement = document.currentScript;
  const assetBase = new URL('.', scriptElement?.src || window.location.href);
  const pageUrl = (path) => new URL(path, assetBase).href;

  const mountFooter = () => {
    if (document.querySelector('.site-footer')) return;

    if (!document.querySelector('link[data-site-footer-style]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = pageUrl('footer.css');
      stylesheet.dataset.siteFooterStyle = 'true';
      document.head.append(stylesheet);
    }

    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.setAttribute('aria-label', 'Site footer');
    footer.innerHTML = `
      <div class="site-footer__inner">
        <div class="site-footer__intro">
          <a class="site-footer__brand" href="${pageUrl('index.html#home')}" aria-label="Human Rights Hub home">
            <span class="site-footer__brand-mark" aria-hidden="true"><img src="${pageUrl('images/humanity.png')}" alt=""></span>
            <span><span class="lang-en">Human Rights Hub</span><span class="lang-my">လူ့အခွင့်အရေး မဏ္ဍိုင်</span></span>
          </a>
          <p><span class="lang-en">Explore human rights information, services, and ways to take action.</span><span class="lang-my">လူ့အခွင့်အရေးဆိုင်ရာ အချက်အလက်များ၊ စာချုပ်များနှင့် ပါဝင်လှုပ်ရှားနိုင်မည့် နည်းလမ်းများကို လေ့လာပါ။</span></p>
        </div>

        <nav class="site-footer__links" aria-label="Footer links">
          <div class="site-footer__group">
            <h2><span class="lang-en">Explore</span><span class="lang-my">လေ့လာရန်</span></h2>
            <a href="${pageUrl('index.html#home')}"><span class="lang-en">What is Human Rights?</span><span class="lang-my">လူ့အခွင့်အရေးဆိုတာဘာလဲ?</span></a>
            <a href="${pageUrl('essential.html#framework')}"><span class="lang-en">Human Rights Essentials</span><span class="lang-my">လူ့အခွင့်အရေး အခြေခံအနှစ်ချုပ်</span></a>
            <a href="${pageUrl('ud.html')}"><span class="lang-en">UDHR</span><span class="lang-my">UDHR ကြေညာစာတမ်း</span></a>
          </div>
          <div class="site-footer__group">
            <h2>MNHRC</h2>
            <a href="${pageUrl('mnhrc.html#mnhrc')}"><span class="lang-en">What is MNHRC?</span><span class="lang-my">MNHRC ဆိုတာဘာလဲ?</span></a>
            <a href="${pageUrl('format.html')}"><span class="lang-en">Complaint letter guide</span><span class="lang-my">တိုင်ကြားစာရေးရန်</span></a>
            <a href="${pageUrl('analytics.html')}"><span class="lang-en">Data Analysis</span><span class="lang-my">ဒေတာခွဲခြမ်းစိတ်ဖြာခြင်း</span></a>
          </div>
          <div class="site-footer__group">
            <h2><span class="lang-en">Take action</span><span class="lang-my">ပါဝင်လှုပ်ရှားရန်</span></h2>
            <a href="${pageUrl('chat.html')}"><span class="lang-en">Anonymous Text Box</span><span class="lang-my">အမည်မဖော် ရင်ဖွင့်စာ</span></a>
            <a href="${pageUrl('eme.html')}"><span class="lang-en">Emergency Support</span><span class="lang-my">အရေးပေါ် အကူအညီ</span></a>
            <a href="${pageUrl('quiz.html')}"><span class="lang-en">Quiz</span><span class="lang-my">ဉာဏ်စမ်း</span></a>
          </div>
        </nav>
      </div>
      <div class="site-footer__bottom">
        <p>© <span data-footer-year></span> Human Rights Hub</p>
        <button class="site-footer__top" type="button" data-footer-top>
          <span class="lang-en">Back to top</span><span class="lang-my">အပေါ်သို့</span><span aria-hidden="true">↑</span>
        </button>
      </div>`;

    document.body.append(footer);
    document.body.classList.add('has-site-footer');
    footer.querySelector('[data-footer-year]').textContent = String(new Date().getFullYear());
    footer.querySelector('[data-footer-top]')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountFooter, { once: true });
  else mountFooter();
})();

