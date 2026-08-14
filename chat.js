document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. LANGUAGE CONVERTER / TOGGLE SYSTEM
  // ==========================================
  const langToggleBtn = document.getElementById('lang-toggle');
  const optEn = document.getElementById('opt-en');
  const optMy = document.getElementById('opt-my');
  const postTextInput = document.getElementById('post-text');

  // LocalStorage ထဲက Saved Language ကို ယူသည် (မရှိရင် မြန်မာ Default)
  // The shared site controller owns language switching. Keep this page's
  // dynamic feed labels in sync with the same persisted preference.
  let currentLang = localStorage.getItem('preferred_lang') || localStorage.getItem('site_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site_lang', lang);

    // Body class နှင့် dataset ကို update လုပ်မည်
    document.body.classList.remove('lang-en', 'lang-my');
    document.body.classList.add(`lang-${lang}`);
    document.body.setAttribute('data-lang', lang);

    // Toggle Button UI update လုပ်မည်
    if (lang === 'en') {
      optEn?.classList.add('active');
      optMy?.classList.remove('active');
    } else {
      optMy?.classList.add('active');
      optEn?.classList.remove('active');
    }

    // Textarea Placeholder ပြောင်းရန်
    if (postTextInput) {
      const placeholderAttr = lang === 'en' ? 'data-placeholder-en' : 'data-placeholder-my';
      const translatedPlaceholder = postTextInput.getAttribute(placeholderAttr);
      if (translatedPlaceholder) postTextInput.placeholder = translatedPlaceholder;
      document.querySelectorAll('.reply-input').forEach((input) => {
        const replyPlaceholder = input.getAttribute(placeholderAttr);
        if (replyPlaceholder) input.placeholder = replyPlaceholder;
      });
    }

    // Feed ထဲမှာ ရှိပြီးသား Card များ၏ Anonymous Name & Time Display ပြင်ရန်
    updateDynamicCardsLanguage();
  }

  if (langToggleBtn && !document.body.classList.contains('confession-page')) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'my' ? 'en' : 'my';
      applyLanguage(newLang);
    });
  }

  // စတင်ချိန်တွင် Language ကို Apply လုပ်မည်
  applyLanguage(currentLang);
  document.addEventListener('hrh:languagechange', (event) => {
    const language = event.detail?.language;
    if (language === 'en' || language === 'my') applyLanguage(language);
  });

  // ==========================================
  // 2. FIREBASE INITIALIZATION & FIRESTORE
  // ==========================================
  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    if (window.FIREBASE_CONFIG) {
      firebase.initializeApp(window.FIREBASE_CONFIG);
    }
  }
  
  const db = (typeof firebase !== 'undefined' && firebase.apps.length) ? firebase.firestore() : null;
  const auth = (typeof firebase !== 'undefined' && firebase.apps.length) ? firebase.auth() : null;
  const confessionForm = document.getElementById('confession-form');
  const feedContainer = document.getElementById('feed-container');

  // ရင်ဖွင့်စာ/တိုင်ကြားစာ တင်ခြင်း
  if (confessionForm && db) {
    confessionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = postTextInput.value.trim();
      if (!text) return;

      const user = auth?.currentUser;
      if (!user) {
        window.location.assign('form.html?mode=signin&returnTo=chat.html');
        return;
      }

      const submitBtn = confessionForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      try {
        await db.collection('confessions').add({
          text: text,
          likes: 0,
          authorId: user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        postTextInput.value = '';
      } catch (error) {
        console.error("Post create failed:", error);
        alert(currentLang === 'en' ? "Failed to post. Please try again." : "စာတင်လို့ မအောင်မြင်ပါ။ မကြာမီ ပြန်ကြိုးစားပါ။");
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Realtime Feed ဆွဲယူခြင်း
  if (feedContainer && db) {
    db.collection('confessions')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        feedContainer.innerHTML = '';

        if (snapshot.empty) {
          feedContainer.innerHTML = `
            <p style="text-align:center; color:#64748b; padding:2rem;">
              <span class="lang-en">No posts yet. Be the first to express!</span>
              <span class="lang-my">စာများ မရှိသေးပါ။ ပထမဆုံး စတင် ရေးသားနိုင်ပါပြီ!</span>
            </p>`;
          return;
        }

        snapshot.forEach((doc) => {
          const data = doc.data();
          const card = createPostCard(doc.id, data);
          feedContainer.appendChild(card);
        });

        // ဝင်လာသမျှ Dynamic Content များကို လက်ရှိ Language ထဲထည့်ရန်
        applyLanguage(currentLang);
      }, (error) => {
        console.error("Firestore feed error:", error);
        feedContainer.innerHTML = `
          <p style="text-align:center; color:#ef4444; padding:2rem;">
            <span class="lang-en">Unable to load posts. Please check Firestore Rules.</span>
            <span class="lang-my">စာများ ဆွဲယူ၍ မရပါ။ Rules ကို စစ်ဆေးပါ။</span>
          </p>`;
      });
  }

  // Replies are kept compact: their composer opens only for the selected post.
  if (feedContainer && db) {
    feedContainer.addEventListener('click', async (event) => {
      const replyButton = event.target.closest('.reply-toggle');
      if (!replyButton) return;

      const postCard = replyButton.closest('.post-card');
      const replyComposer = postCard?.querySelector('.reply-composer');
      if (!postCard || !replyComposer) return;

      const isOpening = replyComposer.hidden;
      replyComposer.hidden = !isOpening;
      replyButton.setAttribute('aria-expanded', String(isOpening));

      if (isOpening) replyComposer.querySelector('textarea')?.focus();
    });

    feedContainer.addEventListener('submit', async (event) => {
      const replyForm = event.target.closest('.reply-form');
      if (!replyForm) return;
      event.preventDefault();

      const replyInput = replyForm.querySelector('.reply-input');
      const replyText = replyInput?.value.trim();
      const postId = replyForm.dataset.postId;
      if (!replyText || !postId) return;

      const submitButton = replyForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      try {
        await db.collection('confessions').doc(postId).update({
          replies: firebase.firestore.FieldValue.arrayUnion({
            text: replyText,
            createdAt: Date.now()
          })
        });
        replyForm.reset();
      } catch (error) {
        console.error('Reply create failed:', error);
        alert(currentLang === 'en' ? 'Unable to send your reply. Please try again.' : 'ပြန်လည်စာပို့၍ မရပါ။ ထပ်မံကြိုးစားပါ။');
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  // Post Card UI Component
  function createPostCard(id, data) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.postId = id;

    let timeStrEn = 'Just now';
    let timeStrMy = 'စောစောက';

    if (data.createdAt) {
      const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date();
      timeStrEn = date.toLocaleDateString('en-US') + ' • ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      timeStrMy = date.toLocaleDateString('my-MM') + ' • ' + date.toLocaleTimeString('my-MM', { hour: '2-digit', minute: '2-digit' });
    }

    card.innerHTML = `
      <div class="post-header">
        <div class="anon-avatar">
          <i class="fa-solid fa-user-secret"></i>
        </div>
        <div class="post-meta">
          <h4>
            <span class="lang-en">Anonymous Voice</span>
            <span class="lang-my">အမည်မဖော်လိုသူ</span>
          </h4>
          <span class="time-display" data-time-en="${timeStrEn}" data-time-my="${timeStrMy}">
            ${currentLang === 'en' ? timeStrEn : timeStrMy}
          </span>
        </div>
      </div>
      <div class="post-content">${escapeHtml(data.text)}</div>
      <div class="post-actions">
        <button class="like-btn" onclick="toggleLike('${id}', ${data.likes || 0})">
          <i class="fa-regular fa-heart"></i> <span class="like-count">${data.likes || 0}</span>
        </button>
        <button class="reply-toggle" type="button" aria-expanded="false">
          <i class="fa-regular fa-comment"></i>
          <span class="lang-en">Reply</span><span class="lang-my">ပြန်လည်စာရေးရန်</span>
        </button>
      </div>
      <div class="reply-list" aria-live="polite"></div>
      <div class="reply-composer" hidden>
        <form class="reply-form" data-post-id="${id}">
          <textarea class="reply-input" rows="2" maxlength="1000" required data-placeholder-en="Write an anonymous reply…" data-placeholder-my="အမည်မဖော် ပြန်လည်စာရေးပါ…" placeholder="Write an anonymous reply…"></textarea>
          <button type="submit" class="reply-submit"><i class="fa-solid fa-paper-plane"></i><span class="lang-en">Send reply</span><span class="lang-my">ပြန်လည်စာပို့ရန်</span></button>
        </form>
      </div>
    `;

    renderReplies(data.replies, card.querySelector('.reply-list'));
    return card;
  }

  function updateDynamicCardsLanguage() {
    const timeElements = document.querySelectorAll('.time-display');
    timeElements.forEach(el => {
      const enTime = el.getAttribute('data-time-en');
      const myTime = el.getAttribute('data-time-my');
      if (enTime && myTime) {
        el.textContent = currentLang === 'en' ? enTime : myTime;
      }
    });
  }

  // Like Function
  window.toggleLike = async (id, currentLikes) => {
    if (!db) return;
    try {
      await db.collection('confessions').doc(id).update({
        likes: currentLikes + 1
      });
    } catch (err) {
      console.error("Like update failed:", err);
    }
  };

  /* Legacy subcollection replies are intentionally disabled. Parent-document
     replies above use the same update permission as existing likes. */
  /* async function loadReplies(postId, replyList) {
    if (!postId || !replyList) return;

    try {
      const snapshot = await db.collection('confessions').doc(postId).collection('replies').orderBy('createdAt', 'asc').get();
      replyList.innerHTML = '';

      snapshot.forEach((replyDoc) => {
        const reply = replyDoc.data();
        const replyTime = reply.createdAt?.toDate
          ? reply.createdAt.toDate().toLocaleString(currentLang === 'en' ? 'en-US' : 'my-MM', { dateStyle: 'medium', timeStyle: 'short' })
          : currentLang === 'en' ? 'Just now' : 'ယခုပဲ';

        replyList.insertAdjacentHTML('beforeend', `
          <article class="reply-item">
            <div class="reply-avatar"><i class="fa-solid fa-user-ninja"></i></div>
            <div class="reply-body"><strong><span class="lang-en">Anonymous reply</span><span class="lang-my">အမည်မဖော် ပြန်လည်စာ</span></strong><span class="reply-time">${replyTime}</span><p>${escapeHtml(reply.text || '')}</p></div>
          </article>
        `);
      });

      applyLanguage(currentLang);
    } catch (error) {
      console.error('Reply load failed:', error);
    }
  }

  } */

  function renderReplies(replies, replyList) {
    if (!replyList) return;
    replyList.innerHTML = '';
    if (!Array.isArray(replies) || replies.length === 0) return;

    replies.forEach((reply) => {
      const replyDate = typeof reply.createdAt === 'number' ? new Date(reply.createdAt) : null;
      const replyTime = replyDate
        ? replyDate.toLocaleString(currentLang === 'en' ? 'en-US' : 'my-MM', { dateStyle: 'medium', timeStyle: 'short' })
        : currentLang === 'en' ? 'Just now' : 'ယခုပဲ';

      replyList.insertAdjacentHTML('beforeend', `
        <article class="reply-item">
          <div class="reply-avatar"><i class="fa-solid fa-user-ninja"></i></div>
          <div class="reply-body"><strong><span class="lang-en">Anonymous reply</span><span class="lang-my">အမည်မဖော် ပြန်လည်စာ</span></strong><span class="reply-time">${replyTime}</span><p>${escapeHtml(reply.text || '')}</p></div>
        </article>
      `);
    });

    applyLanguage(currentLang);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
