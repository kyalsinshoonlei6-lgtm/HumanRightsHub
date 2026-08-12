/* User profile, image preview/compression, Firestore, and Firebase Storage. */
// Legacy profile-modal code is retained below for reference but disabled: this
// standalone page has its own focused account flow implemented after it.
if (false) {
document.addEventListener('DOMContentLoaded', () => {
  const services = window.HRH?.firebase;
  if (!services) {
    console.error('Profile system could not find initialized Firebase services.');
    return;
  }

  const { auth, db, storage } = services;
  const profileButton = document.getElementById('profile-open');
  const profileModal = document.getElementById('profile-modal');
  const profileMessage = document.getElementById('profile-message');
  const profileForm = document.getElementById('profile-form');
  const profileNameInput = document.getElementById('profile-name-input');
  const profileFileInput = document.getElementById('profile-photo-input');
  const dropZone = document.getElementById('profile-drop-zone');
  const saveButton = document.getElementById('profile-save');
  const editButton = document.getElementById('profile-edit');
  const cancelButton = document.getElementById('profile-cancel');
  const uploadSpinner = document.getElementById('profile-spinner');
  const fileStatus = document.getElementById('profile-file-status');

  let currentProfile = null;
  let selectedImage = null;
  let previewUrl = '';

  const initialsFor = (nameOrEmail = 'Guest') => {
    const value = nameOrEmail.trim() || 'Guest';
    const words = value.includes('@') ? [value.charAt(0)] : value.split(/\s+/).slice(0, 2);
    return words.map((word) => word.charAt(0).toUpperCase()).join('') || 'G';
  };

  const renderAvatar = (imageElement, initialsElement, photoURL, name) => {
    if (!imageElement || !initialsElement) return;
    if (photoURL) {
      imageElement.src = photoURL;
      imageElement.alt = `${name || 'User'} profile picture`;
      imageElement.hidden = false;
      initialsElement.hidden = true;
    } else {
      imageElement.removeAttribute('src');
      imageElement.hidden = true;
      initialsElement.textContent = initialsFor(name);
      initialsElement.hidden = false;
    }
  };

  const renderProfile = (profile) => {
    const name = profile?.name || 'Guest';
    const email = profile?.email || 'Not signed in';
    const photoURL = profile?.photoURL || '';

    document.querySelectorAll('#user-name').forEach((element) => {
      element.textContent = name;
      element.title = email;
    });
    renderAvatar(
      document.getElementById('nav-profile-image'),
      document.getElementById('nav-profile-initials'),
      photoURL,
      name
    );
    renderAvatar(
      document.getElementById('profile-image'),
      document.getElementById('profile-initials'),
      photoURL,
      name
    );
    renderAvatar(
      document.getElementById('profile-preview-image'),
      document.getElementById('profile-preview-initials'),
      previewUrl || photoURL,
      name
    );

    const displayName = document.getElementById('profile-display-name');
    const displayEmail = document.getElementById('profile-email');
    if (displayName) displayName.textContent = name;
    if (displayEmail) displayEmail.textContent = email;
    if (profileNameInput) profileNameInput.value = profile?.name || '';
  };

  const showProfileMessage = (message, type = 'error') => {
    if (!profileMessage) return window.alert(message);
    profileMessage.textContent = message;
    profileMessage.dataset.type = type;
    profileMessage.hidden = false;
  };

  const clearProfileMessage = () => {
    if (!profileMessage) return;
    profileMessage.textContent = '';
    profileMessage.hidden = true;
    delete profileMessage.dataset.type;
  };

  const closeProfile = () => {
    profileModal?.classList.add('hidden');
    profileModal?.setAttribute('aria-hidden', 'true');
    profileForm?.classList.add('hidden');
    editButton?.removeAttribute('hidden');
    selectedImage = null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = '';
    if (profileFileInput) profileFileInput.value = '';
    if (fileStatus) fileStatus.textContent = 'PNG, JPG or WebP · maximum 10 MB';
    clearProfileMessage();
    renderProfile(currentProfile);
  };

  const openProfile = () => {
    if (!auth.currentUser || !profileModal) return;
    profileModal.classList.remove('hidden');
    profileModal.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => editButton?.focus(), 0);
  };

  const setEditing = (isEditing) => {
    profileForm?.classList.toggle('hidden', !isEditing);
    if (editButton) editButton.hidden = isEditing;
    clearProfileMessage();
    if (isEditing) {
      renderProfile(currentProfile);
      window.setTimeout(() => profileNameInput?.focus(), 0);
    }
  };

  const validateImage = (file) => {
    if (!file?.type?.startsWith('image/')) throw new Error('Choose a valid image file.');
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Use a PNG, JPG, or WebP image.');
    }
    if (file.size > 10 * 1024 * 1024) throw new Error('The image must be smaller than 10 MB.');
  };

  const chooseImage = (file) => {
    try {
      validateImage(file);
      selectedImage = file;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(file);
      if (fileStatus) fileStatus.textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB`;
      renderProfile(currentProfile);
      clearProfileMessage();
    } catch (error) {
      selectedImage = null;
      showProfileMessage(error.message);
    }
  };

  const compressImage = (file, maxDimension = 1200, quality = 0.82) => new Promise((resolve, reject) => {
    const image = new Image();
    const sourceUrl = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { alpha: false });
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      URL.revokeObjectURL(sourceUrl);
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('The image could not be compressed.')),
        'image/jpeg',
        quality
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      reject(new Error('The selected image could not be read.'));
    };
    image.src = sourceUrl;
  });

  const setSaving = (isSaving) => {
    if (saveButton) saveButton.disabled = isSaving;
    if (cancelButton) cancelButton.disabled = isSaving;
    if (profileFileInput) profileFileInput.disabled = isSaving;
    if (uploadSpinner) uploadSpinner.hidden = !isSaving;
    profileForm?.setAttribute('aria-busy', String(isSaving));
  };

  profileButton?.addEventListener('click', openProfile);
  document.getElementById('profile-close')?.addEventListener('click', closeProfile);
  document.getElementById('profile-overlay')?.addEventListener('click', closeProfile);
  editButton?.addEventListener('click', () => setEditing(true));
  cancelButton?.addEventListener('click', () => setEditing(false));
  profileFileInput?.addEventListener('change', () => {
    const file = profileFileInput.files?.[0];
    if (file) chooseImage(file);
  });

  ['dragenter', 'dragover'].forEach((eventName) => dropZone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add('is-dragging');
  }));
  ['dragleave', 'drop'].forEach((eventName) => dropZone?.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove('is-dragging');
  }));
  dropZone?.addEventListener('drop', (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (file) chooseImage(file);
  });
  dropZone?.addEventListener('click', (event) => {
    if (event.target === profileFileInput) return;
    profileFileInput?.click();
  });
  dropZone?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    profileFileInput?.click();
  });

  profileForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    const name = profileNameInput?.value.trim() || '';
    if (!user) return showProfileMessage('Sign in before editing your profile.');
    if (name.length < 2) return showProfileMessage('Enter a name with at least 2 characters.');

    try {
      setSaving(true);
      clearProfileMessage();
      let photoURL = currentProfile?.photoURL || user.photoURL || '';

      if (selectedImage) {
        const compressedImage = await compressImage(selectedImage);
        const imageReference = storage.ref(`profilePictures/${user.uid}`);
        await imageReference.put(compressedImage, {
          contentType: 'image/jpeg',
          customMetadata: { originalName: selectedImage.name },
        });
        photoURL = await imageReference.getDownloadURL();
      }

      await user.updateProfile({ displayName: name, photoURL: photoURL || null });
      await db.collection('users').doc(user.uid).set({
        name,
        email: user.email,
        photoURL,
      }, { merge: true });

      currentProfile = { ...currentProfile, name, email: user.email, photoURL };
      selectedImage = null;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = '';
      renderProfile(currentProfile);
      setEditing(false);
      showProfileMessage('Profile updated successfully.', 'success');
      document.dispatchEvent(new CustomEvent('hrh:profile-updated', { detail: currentProfile }));
    } catch (error) {
      console.error('Profile update failed:', error);
      const message = error?.code === 'storage/unauthorized'
        ? 'Firebase Storage rules do not allow this upload.'
        : error?.code === 'permission-denied'
          ? 'Firestore rules do not allow this profile update.'
          : 'Your profile could not be updated. Please try again.';
      showProfileMessage(message);
    } finally {
      setSaving(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && profileModal && !profileModal.classList.contains('hidden')) closeProfile();
  });

  document.addEventListener('hrh:profile-updated', (event) => {
    if (!event.detail) return;
    currentProfile = { ...currentProfile, ...event.detail };
    renderProfile(currentProfile);
  });

  // Auth Observer
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      currentProfile = { name: 'Guest', email: 'Not signed in', photoURL: '' };
      renderProfile(currentProfile);
      closeProfile();
      if (profileButton) profileButton.disabled = true;
      return;
    }

    if (profileButton) profileButton.disabled = false;

    try {
      const profileDocument = await db.collection('users').doc(user.uid).get();
      const storedProfile = profileDocument.exists ? profileDocument.data() : {};
      currentProfile = {
        name: storedProfile.name || user.displayName || 'User',
        email: storedProfile.email || user.email || '',
        photoURL: storedProfile.photoURL || user.photoURL || '',
      };

      if (!profileDocument.exists) {
        await db.collection('users').doc(user.uid).set({
          ...currentProfile,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
      renderProfile(currentProfile);
    } catch (error) {
      console.error('Profile loading failed:', error);
      currentProfile = {
        name: user.displayName || 'User',
        email: user.email || '',
        photoURL: user.photoURL || '',
      };
      renderProfile(currentProfile);
    }
  });
});
}

/* Standalone account page: Firebase Auth + Firestore profile setup. */
document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    body: document.body,
    languageButtons: document.querySelectorAll('.auth-card .lang-switch .lang-btn'),
    signInTab: document.getElementById('tab-signin'),
    signUpTab: document.getElementById('tab-signup'),
    signInForm: document.getElementById('form-signin'),
    signUpForm: document.getElementById('form-signup'),
    message: document.getElementById('auth-message'),
    formsContainer: document.getElementById('auth-forms-container'),
    profileContainer: document.getElementById('user-profile-container'),
    displayName: document.getElementById('user-display-name'),
    displayEmail: document.getElementById('user-display-email'),
    avatar: document.getElementById('user-avatar'),
    logout: document.getElementById('btn-logout'),
    remember: document.getElementById('remember-me'),
    forgotPassword: document.querySelector('.forgot-password'),
    socialButtons: document.querySelectorAll('.social-btn'),
  };

  const copy = {
    my: {
      kicker: 'လုံခြုံသော အကောင့်ဝင်ရောက်မှု', title: 'လူ့အခွင့်အရေး မဏ္ဍိုင်',
      signInTab: 'အကောင့်ဝင်ရန်', signUpTab: 'အကောင့်သစ်ဖွင့်ရန်',
      email: 'အီးမေးလ် လိပ်စာ', password: 'စကားဝှက်', name: 'အမည်အပြည့်အစုံ',
      confirm: 'စကားဝှက် အတည်ပြုပါ', remember: 'မှတ်ထားမည်',
      forgot: 'စကားဝှက်မေ့နေသလား?', signIn: 'အကောင့်ဝင်မည်',
      signUp: 'အကောင့်သစ်ပြုလုပ်မည်', social: 'သို့မဟုတ် အခြားအကောင့်ဖြင့် ဝင်မည်',
      logout: 'အကောင့်မှ ထွက်မည်', showPassword: 'စကားဝှက် ပြရန်', hidePassword: 'စကားဝှက် ဖျောက်ရန်',
      guest: 'အသုံးပြုသူ', invalidEmail: 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပါ။',
      passwordShort: 'စကားဝှက်သည် အနည်းဆုံး အက္ခရာ ၆ လုံး ရှိရမည်။',
      passwordMismatch: 'စကားဝှက်နှစ်ခု မတူညီပါ။', nameRequired: 'အမည်အပြည့်အစုံ ထည့်ပါ။',
      resetSent: 'စကားဝှက်ပြန်လည်သတ်မှတ်ရန် အီးမေးလ်ပို့ပြီးပါပြီ။',
      socialUnavailable: 'ဤ social sign-in service ကို မဖွင့်ရသေးပါ။ Email နှင့် password ကို အသုံးပြုပါ။',
      signedOut: 'အကောင့်မှ ထွက်ပြီးပါပြီ။', profileSaved: 'အကောင့်ဖွင့်ပြီးပါပြီ။',
      authUnavailable: 'Firebase ကို မချိတ်ဆက်နိုင်သေးပါ။ Internet နှင့် Firebase configuration ကို စစ်ဆေးပါ။'
    },
    en: {
      kicker: 'Secure account access', title: 'Human Rights Hub',
      signInTab: 'Sign in', signUpTab: 'Create account', email: 'Email address', password: 'Password',
      name: 'Full name', confirm: 'Confirm password', remember: 'Remember me',
      forgot: 'Forgot password?', signIn: 'Sign in', signUp: 'Create account',
      social: 'Or continue with', logout: 'Log out', showPassword: 'Show password',
      hidePassword: 'Hide password', guest: 'User', invalidEmail: 'Enter a valid email address.',
      passwordShort: 'Your password must contain at least 6 characters.',
      passwordMismatch: 'Passwords do not match.', nameRequired: 'Enter your full name.',
      resetSent: 'A password reset email has been sent.',
      socialUnavailable: 'This social sign-in provider is not enabled yet. Please use email and password.',
      signedOut: 'You have been signed out.', profileSaved: 'Your account has been created.',
      authUnavailable: 'Firebase is unavailable. Check your internet connection and Firebase configuration.'
    }
  };

  let language = localStorage.getItem('preferred_lang') || 'my';
  let auth = null;
  let db = null;

  const text = () => copy[language];
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const initials = (name = '') => name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'U';

  const showMessage = (message, type = 'error') => {
    if (!elements.message) return;
    elements.message.textContent = message;
    elements.message.dataset.type = type;
    elements.message.classList.remove('hidden');
  };

  const clearMessage = () => {
    if (!elements.message) return;
    elements.message.textContent = '';
    delete elements.message.dataset.type;
    elements.message.classList.add('hidden');
  };

  const setBusy = (form, busy) => {
    const button = form?.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = busy;
    button.dataset.loading = String(busy);
    form.setAttribute('aria-busy', String(busy));
  };

  const setInvalid = (field, invalid) => field?.setAttribute('aria-invalid', String(invalid));

  const switchTab = (mode) => {
    const signUp = mode === 'signup';
    elements.signInForm?.classList.toggle('hidden', signUp);
    elements.signUpForm?.classList.toggle('hidden', !signUp);
    elements.signInTab?.classList.toggle('active', !signUp);
    elements.signUpTab?.classList.toggle('active', signUp);
    clearMessage();
    window.setTimeout(() => document.getElementById(signUp ? 'signup-name' : 'signin-email')?.focus(), 0);
  };

  const applyLanguage = (nextLanguage) => {
    language = nextLanguage === 'en' ? 'en' : 'my';
    localStorage.setItem('preferred_lang', language);
    document.documentElement.lang = language;
    elements.body.classList.toggle('lang-en', language === 'en');
    elements.body.classList.toggle('lang-my', language === 'my');
    elements.body.dataset.lang = language;
    elements.languageButtons.forEach(button => button.classList.toggle('active', button.id === `lang-${language}`));
    const t = text();
    document.getElementById('txt-kicker').textContent = t.kicker;
    document.getElementById('txt-title').textContent = t.title;
    elements.signInTab.textContent = t.signInTab;
    elements.signUpTab.textContent = t.signUpTab;
    document.getElementById('signin-email').placeholder = t.email;
    document.getElementById('signin-password').placeholder = t.password;
    document.getElementById('signup-name').placeholder = t.name;
    document.getElementById('signup-email').placeholder = t.email;
    document.getElementById('signup-password').placeholder = t.password;
    document.getElementById('signup-confirm-password').placeholder = t.confirm;
    document.getElementById('txt-remember').textContent = t.remember;
    document.getElementById('txt-forgot').textContent = t.forgot;
    document.getElementById('btn-signin').textContent = t.signIn;
    document.getElementById('btn-signup').textContent = t.signUp;
    document.getElementById('txt-social').textContent = t.social;
    document.getElementById('btn-logout').textContent = t.logout;
    document.querySelectorAll('.password-toggle').forEach(button => {
      const input = button.previousElementSibling;
      button.setAttribute('aria-label', input?.type === 'password' ? t.showPassword : t.hidePassword);
    });
  };

  const friendlyError = (error) => {
    const messages = {
      'auth/email-already-in-use': language === 'my' ? 'ဤအီးမေးလ်ဖြင့် အကောင့်ဖွင့်ပြီးသားရှိပါသည်။' : 'An account already exists with this email address.',
      'auth/invalid-email': text().invalidEmail,
      'auth/weak-password': text().passwordShort,
      'auth/wrong-password': language === 'my' ? 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။' : 'Incorrect email or password.',
      'auth/invalid-credential': language === 'my' ? 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။' : 'Incorrect email or password.',
      'auth/user-not-found': language === 'my' ? 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။' : 'Incorrect email or password.',
      'auth/network-request-failed': language === 'my' ? 'Network error ဖြစ်နေပါသည်။ Connection ကို စစ်ဆေးပါ။' : 'Network error. Check your connection and try again.',
      'auth/operation-not-allowed': language === 'my' ? 'Firebase Console တွင် Email/Password sign-in ကို ဖွင့်ပါ။' : 'Enable Email/Password sign-in in Firebase Console.'
    };
    return messages[error?.code] || (language === 'my' ? 'အကောင့်ဝင်ရောက်မှု မအောင်မြင်ပါ။ ထပ်ကြိုးစားပါ။' : 'Authentication failed. Please try again.');
  };

  const renderUser = (user) => {
    const signedIn = Boolean(user);
    elements.formsContainer?.classList.toggle('hidden', signedIn);
    elements.profileContainer?.classList.toggle('hidden', !signedIn);
    if (!user) return;
    const name = user.displayName || user.email?.split('@')[0] || text().guest;
    if (elements.displayName) elements.displayName.textContent = name;
    if (elements.displayEmail) elements.displayEmail.textContent = user.email || '';
    if (elements.avatar) elements.avatar.textContent = initials(name);
  };

  const setupFirebase = () => {
    try {
      if (!window.firebase || !window.FIREBASE_CONFIG?.apiKey) throw new Error('Firebase unavailable');
      if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
      auth = firebase.auth();
      db = firebase.firestore();
      auth.onAuthStateChanged((user) => {
        if (user) {
          // This page is only the account gateway; authenticated visitors
          // continue to their dedicated profile workspace.
          window.location.replace('profile.html');
          return;
        }
        renderUser(null);
      });
      return true;
    } catch (error) {
      console.error('Standalone authentication setup failed:', error);
      showMessage(text().authUnavailable, 'error');
      return false;
    }
  };

  elements.languageButtons.forEach(button => button.addEventListener('click', () => applyLanguage(button.id === 'lang-en' ? 'en' : 'my')));
  elements.signInTab?.addEventListener('click', () => switchTab('signin'));
  elements.signUpTab?.addEventListener('click', () => switchTab('signup'));
  document.querySelectorAll('.password-toggle').forEach(button => button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(show));
    button.setAttribute('aria-label', show ? text().hidePassword : text().showPassword);
  }));

  elements.signInForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessage();
    const emailField = document.getElementById('signin-email');
    const passwordField = document.getElementById('signin-password');
    const email = emailField.value.trim();
    const password = passwordField.value;
    const validEmail = isValidEmail(email);
    setInvalid(emailField, !validEmail);
    setInvalid(passwordField, !password);
    if (!validEmail) return showMessage(text().invalidEmail);
    if (!password) return showMessage(language === 'my' ? 'စကားဝှက် ထည့်ပါ။' : 'Enter your password.');
    if (!auth) return showMessage(text().authUnavailable);
    try {
      setBusy(elements.signInForm, true);
      await auth.setPersistence(elements.remember?.checked ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
      await auth.signInWithEmailAndPassword(email, password);
      elements.signInForm.reset();
    } catch (error) {
      showMessage(friendlyError(error));
    } finally {
      setBusy(elements.signInForm, false);
    }
  });

  elements.signUpForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessage();
    const nameField = document.getElementById('signup-name');
    const emailField = document.getElementById('signup-email');
    const passwordField = document.getElementById('signup-password');
    const confirmField = document.getElementById('signup-confirm-password');
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const password = passwordField.value;
    const confirmation = confirmField.value;
    const validName = name.length >= 2;
    const validEmail = isValidEmail(email);
    const validPassword = password.length >= 6;
    const matching = password === confirmation;
    [[nameField, validName], [emailField, validEmail], [passwordField, validPassword], [confirmField, matching]].forEach(([field, valid]) => setInvalid(field, !valid));
    if (!validName) return showMessage(text().nameRequired);
    if (!validEmail) return showMessage(text().invalidEmail);
    if (!validPassword) return showMessage(text().passwordShort);
    if (!matching) return showMessage(text().passwordMismatch);
    if (!auth) return showMessage(text().authUnavailable);
    try {
      setBusy(elements.signUpForm, true);
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      await credential.user.updateProfile({ displayName: name });
      try {
        await db.collection('users').doc(credential.user.uid).set({
          name,
          email: credential.user.email,
          photoURL: credential.user.photoURL || '',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch (profileError) {
        console.error('User profile could not be stored in Firestore:', profileError);
      }
      elements.signUpForm.reset();
      showMessage(text().profileSaved, 'success');
      renderUser(credential.user);
    } catch (error) {
      showMessage(friendlyError(error));
    } finally {
      setBusy(elements.signUpForm, false);
    }
  });

  elements.forgotPassword?.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signin-email').value.trim();
    if (!isValidEmail(email)) return showMessage(text().invalidEmail);
    if (!auth) return showMessage(text().authUnavailable);
    try {
      await auth.sendPasswordResetEmail(email);
      showMessage(text().resetSent, 'success');
    } catch (error) {
      showMessage(friendlyError(error));
    }
  });

  elements.socialButtons.forEach(button => button.addEventListener('click', () => showMessage(text().socialUnavailable, 'info')));
  elements.logout?.addEventListener('click', async () => {
    if (!auth) return;
    try {
      await auth.signOut();
      showMessage(text().signedOut, 'success');
    } catch (error) {
      showMessage(friendlyError(error));
    }
  });

  const syncLanguageWithNavbar = () => {
    const navbarLanguage = elements.body.classList.contains('lang-en') ? 'en' : 'my';
    if (navbarLanguage !== language) applyLanguage(navbarLanguage);
  };

  document.addEventListener('hrh:languagechange', (event) => {
    applyLanguage(event.detail?.language || (elements.body.classList.contains('lang-en') ? 'en' : 'my'));
  });

  new MutationObserver(syncLanguageWithNavbar).observe(elements.body, {
    attributes: true,
    attributeFilter: ['class']
  });

  applyLanguage(language);
  if (new URLSearchParams(window.location.search).get('mode') === 'signup') switchTab('signup');
  setupFirebase();
});
