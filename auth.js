/* Firebase Authentication and account-state UI (Firebase v10 compat SDK). */
document.addEventListener('DOMContentLoaded', () => {
  const authModal = document.getElementById('auth-modal');
  const authMessage = document.getElementById('auth-message');
  const signInForm = document.getElementById('form-signin');
  const signUpForm = document.getElementById('form-signup');
  const signInTab = document.getElementById('tab-signin');
  const signUpTab = document.getElementById('tab-signup');
  const userName = document.getElementById('user-name');
  const profileButton = document.getElementById('profile-open');
  const navProfileImage = document.getElementById('nav-profile-image');
  const navProfileInitials = document.getElementById('nav-profile-initials');
  const logoutButton = document.getElementById('logout-button');
  // Modal triggers and normal page links both represent unauthenticated actions.
  // Keep the selector broad for UI state, but only intercept modal triggers.
  const modalAuthLinks = document.querySelectorAll('[data-auth-open]');
  const authLinks = document.querySelectorAll('[data-auth-open], .account-link[href^="form.html?mode="]');

  const showAuthMessage = (message, type = 'error') => {
    if (!authMessage) return window.alert(message);
    authMessage.textContent = message;
    authMessage.dataset.type = type;
    authMessage.hidden = false;
  };

  const clearAuthMessage = () => {
    if (!authMessage) return;
    authMessage.textContent = '';
    authMessage.hidden = true;
    delete authMessage.dataset.type;
  };

  const switchAuthTab = (mode) => {
    const showSignUp = mode === 'signup';
    signInForm?.classList.toggle('hidden', showSignUp);
    signUpForm?.classList.toggle('hidden', !showSignUp);
    signInTab?.classList.toggle('active', !showSignUp);
    signUpTab?.classList.toggle('active', showSignUp);
    signInTab?.setAttribute('aria-selected', String(!showSignUp));
    signUpTab?.setAttribute('aria-selected', String(showSignUp));
    clearAuthMessage();
  };

  const closeAuthModal = () => {
    authModal?.classList.add('hidden');
    authModal?.setAttribute('aria-hidden', 'true');
  };

  const openAuthModal = (mode = 'signin') => {
    if (!authModal) return;
    switchAuthTab(mode);
    authModal.classList.remove('hidden');
    authModal.setAttribute('aria-hidden', 'false');
    const firstField = document.getElementById(mode === 'signup' ? 'signup-name' : 'signin-email');
    window.setTimeout(() => firstField?.focus(), 0);
  };

  window.openAuthModal = openAuthModal;
  signInTab?.addEventListener('click', () => switchAuthTab('signin'));
  signUpTab?.addEventListener('click', () => switchAuthTab('signup'));
  document.getElementById('auth-close')?.addEventListener('click', closeAuthModal);
  document.getElementById('auth-overlay')?.addEventListener('click', closeAuthModal);
  modalAuthLinks.forEach((trigger) => trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openAuthModal(trigger.dataset.authOpen);
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && authModal && !authModal.classList.contains('hidden')) closeAuthModal();
  });

  let auth;
  let db;
  let storage;

  try {
    if (!window.firebase || !window.FIREBASE_CONFIG?.apiKey) {
      throw new Error('Firebase SDK or configuration is unavailable.');
    }
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    storage = firebase.storage();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((error) => {
      console.error('Could not enable persistent authentication:', error);
    });
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    showAuthMessage('Firebase could not start. Check the SDK scripts and configuration.');
    return;
  }

  window.HRH = window.HRH || {};
  window.HRH.firebase = { auth, db, storage };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const setFormBusy = (form, isBusy) => {
    const submitButton = form?.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = isBusy;
  };

  const friendlyAuthError = (error) => {
    const messages = {
      'auth/email-already-in-use': 'An account already exists with this email address.',
      'auth/invalid-email': 'Enter a valid email address.',
      'auth/weak-password': 'Your password must contain at least 6 characters.',
      'auth/wrong-password': 'Incorrect email or password.',
      'auth/invalid-credential': 'Incorrect email or password.',
      'auth/user-not-found': 'Incorrect email or password.',
      'auth/operation-not-allowed': 'Email/password sign-in is not enabled in Firebase.',
      'auth/network-request-failed': 'Network error. Check your connection and try again.',
      'permission-denied': 'Your Firestore security rules blocked this request.',
    };
    return messages[error?.code] || 'Authentication failed. Please try again.';
  };

  const updateAccountUI = (user) => {
    const displayName = user ? (user.displayName || user.email || 'User') : 'Guest';
    if (userName) {
      userName.textContent = displayName;
      userName.title = user?.email || 'Guest';
    }
    if (navProfileImage && navProfileInitials) {
      if (user?.photoURL) {
        navProfileImage.src = user.photoURL;
        navProfileImage.hidden = false;
        navProfileInitials.hidden = true;
      } else {
        navProfileImage.removeAttribute('src');
        navProfileImage.hidden = true;
        navProfileInitials.textContent = displayName
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part.charAt(0).toUpperCase())
          .join('') || 'G';
        navProfileInitials.hidden = false;
      }
    }
    if (profileButton) {
      profileButton.disabled = !user;
      profileButton.setAttribute('aria-label', user ? 'Open your profile' : 'Guest profile');
    }
    if (logoutButton) logoutButton.hidden = !user;
    authLinks.forEach((link) => { link.hidden = Boolean(user); });
    document.body.classList.toggle('is-authenticated', Boolean(user));
  };

  profileButton?.addEventListener('click', () => {
    if (auth?.currentUser) window.location.assign('profile.html');
  });

  signUpForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearAuthMessage();
    const name = document.getElementById('signup-name')?.value.trim() || '';
    const email = document.getElementById('signup-email')?.value.trim() || '';
    const password = document.getElementById('signup-password')?.value || '';

    if (!name) return showAuthMessage('Please enter your name.');
    if (!isValidEmail(email)) return showAuthMessage('Enter a valid email address.');
    if (password.length < 6) return showAuthMessage('Your password must contain at least 6 characters.');

    try {
      setFormBusy(signUpForm, true);
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      await credential.user.updateProfile({ displayName: name });
      await db.collection('users').doc(credential.user.uid).set({
        name,
        email: credential.user.email,
        photoURL: '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      updateAccountUI(credential.user);
      document.dispatchEvent(new CustomEvent('hrh:profile-updated', {
        detail: { name, email: credential.user.email, photoURL: '' },
      }));
      signUpForm.reset();
      closeAuthModal();
    } catch (error) {
      console.error('Sign-up failed:', error);
      showAuthMessage(friendlyAuthError(error));
    } finally {
      setFormBusy(signUpForm, false);
    }
  });

  signInForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearAuthMessage();
    const email = document.getElementById('signin-email')?.value.trim() || '';
    const password = document.getElementById('signin-password')?.value || '';

    if (!isValidEmail(email)) return showAuthMessage('Enter a valid email address.');
    if (!password) return showAuthMessage('Enter your password.');

    try {
      setFormBusy(signInForm, true);
      await auth.signInWithEmailAndPassword(email, password);
      signInForm.reset();
      closeAuthModal();
    } catch (error) {
      console.error('Sign-in failed:', error);
      showAuthMessage(friendlyAuthError(error));
    } finally {
      setFormBusy(signInForm, false);
    }
  });

  logoutButton?.addEventListener('click', async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      window.alert('Could not log out. Please try again.');
    }
  });

  auth.onAuthStateChanged((user) => {
    updateAccountUI(user);
    if (user) {
      localStorage.setItem('humanRightsHubUser', JSON.stringify({
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
      }));
    } else {
      localStorage.removeItem('humanRightsHubUser');
    }
    document.dispatchEvent(new CustomEvent('hrh:auth-state', { detail: { user } }));
  });
});
