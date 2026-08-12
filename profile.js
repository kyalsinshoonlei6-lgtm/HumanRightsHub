document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('profile-page')) return;

  const elements = {
    image: document.getElementById('profile-img'),
    initials: document.getElementById('profile-initials'),
    name: document.getElementById('display-name'),
    role: document.getElementById('display-role'),
    email: document.getElementById('display-email'),
    bio: document.getElementById('display-bio'),
    container: document.querySelector('.profile-container'),
    navName: document.getElementById('user-name'),
    editButton: document.getElementById('toggle-edit-btn'),
    editCard: document.getElementById('edit-card'),
    cancelButton: document.getElementById('cancel-btn') || document.querySelector('.form-actions .btn-secondary'),
    form: document.getElementById('profile-form'),
    nameInput: document.getElementById('input-name'),
    roleInput: document.getElementById('input-role'),
    emailInput: document.getElementById('input-email'),
    bioInput: document.getElementById('input-bio'),
    message: document.getElementById('profile-message'),
    saveButton: document.getElementById('save-profile') || document.querySelector('.form-actions .btn-primary'),
    logoutButton: document.getElementById('logout-button'),
    signIn: document.getElementById('nav-signin'),
    signUp: document.getElementById('nav-signup'),
  };

  let auth;
  let db;
  let currentUser;
  let currentProfile = null;
  const defaultRole = () => document.body.classList.contains('lang-my') ? 'အသင်းဝင်' : 'Member';
  const initialsFor = (name = '') => name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase() || 'U';

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

  const renderAvatar = (photoURL, name) => {
    const hasPhoto = Boolean(photoURL);
    if (elements.image) elements.image.hidden = !hasPhoto;
    if (elements.initials) elements.initials.hidden = hasPhoto;
    if (elements.initials) elements.initials.textContent = initialsFor(name);
    if (hasPhoto && elements.image) elements.image.src = photoURL;
  };

  const render = () => {
    if (!currentProfile) return;
    const { name, email, photoURL, role, bio } = currentProfile;
    if (elements.name) elements.name.textContent = name;
    if (elements.role) elements.role.textContent = role || defaultRole();
    if (elements.email) elements.email.innerHTML = `<i class="fa-regular fa-envelope" aria-hidden="true"></i> ${email || ''}`;
    if (elements.bio) {
      elements.bio.textContent = bio || '';
      elements.bio.hidden = !bio;
    }
    if (elements.navName) {
      elements.navName.textContent = name;
      elements.navName.title = email;
    }
    renderAvatar(photoURL, name);
  };

  const populateForm = () => {
    if (!currentProfile) return;
    if (elements.nameInput) elements.nameInput.value = currentProfile.name || '';
    if (elements.roleInput) elements.roleInput.value = currentProfile.role || '';
    if (elements.emailInput) {
      elements.emailInput.value = currentProfile.email || '';
      elements.emailInput.readOnly = true;
      elements.emailInput.disabled = true;
    }
    if (elements.bioInput) elements.bioInput.value = currentProfile.bio || '';
  };

  const setEditing = (isEditing) => {
    if (elements.editCard) elements.editCard.classList.toggle('hidden', !isEditing);
    if (elements.editButton) elements.editButton.hidden = isEditing;
    if (elements.container) elements.container.classList.toggle('is-editing', isEditing);
    clearMessage();
    if (isEditing) {
      populateForm();
      window.setTimeout(() => elements.nameInput?.focus(), 0);
    }
  };

  const setSaving = (saving) => {
    if (elements.saveButton) {
      elements.saveButton.disabled = saving;
      elements.saveButton.dataset.loading = String(saving);
    }
    if (elements.form) elements.form.setAttribute('aria-busy', String(saving));
  };

  const syncLanguage = () => render();

  try {
    if (!window.firebase || !window.FIREBASE_CONFIG?.apiKey) throw new Error('Firebase unavailable');
    if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
  } catch (error) {
    console.error('Profile setup failed:', error);
    showMessage('Firebase is unavailable. Please try again later.');
    return;
  }

  if (elements.editButton) elements.editButton.addEventListener('click', () => setEditing(true));

  // Editing is a dedicated workspace: return to the main site on cancel.
  if (elements.cancelButton) {
    elements.cancelButton.addEventListener('click', () => {
      window.location.assign('index.html');
    });
  }

  if (elements.image) {
    elements.image.addEventListener('error', () => {
      elements.image.hidden = true;
      if (elements.initials) elements.initials.hidden = false;
    });
  }

  if (elements.form) {
    elements.form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearMessage();
      const name = elements.nameInput.value.trim();
      const role = elements.roleInput.value.trim();
      const bio = elements.bioInput.value.trim();
      let photoURL = currentProfile?.photoURL || currentUser?.photoURL || '';

      if (name.length < 2) return showMessage('Enter a name with at least 2 characters.');

      try {
        setSaving(true);
        // Image uploads are disabled. Update only the display name so Firebase
        // never receives an invalid/empty photoURL value.
        const authProfileUpdate = { displayName: name };
        if (photoURL) authProfileUpdate.photoURL = photoURL;
        await currentUser.updateProfile(authProfileUpdate);
        let cloudSyncFailed = false;
        try {
          await db.collection('users').doc(currentUser.uid).set({
            name,
            email: currentUser.email,
            photoURL,
            role,
            bio,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          }, { merge: true });
        } catch (cloudError) {
          console.warn('Profile saved to Firebase Auth but not Firestore:', cloudError);
          cloudSyncFailed = true;
        }
        currentProfile = { name, email: currentUser.email || '', photoURL, role, bio };
        render();
        showMessage(
          cloudSyncFailed
            ? 'Profile updated. Cloud profile details could not be synced yet. / ပရိုဖိုင် ပြင်ဆင်ပြီးပါပြီ၊ cloud data ကို နောက်မှ ထပ်သိမ်းပါမည်။'
            : 'Profile updated successfully. / ပရိုဖိုင် ပြင်ဆင်ပြီးပါပြီ။',
          cloudSyncFailed ? 'info' : 'success'
        );

        // Return to the main website after the success message is visible.
        window.setTimeout(() => window.location.assign('index.html'), 800);
      } catch (error) {
        console.error('Profile update failed:', error);
        showMessage(
          error?.code === 'permission-denied'
            ? 'Firestore rules do not allow this profile update.'
            : `Profile update failed. Please try again. ${error?.code ? `(${error.code})` : ''}`
        );
      } finally {
        setSaving(false);
      }
    });
  }

  new MutationObserver(syncLanguage).observe(document.body, { attributes: true, attributeFilter: ['class'] });

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.replace('form.html?mode=signin');
      return;
    }
    currentUser = user;
    if (elements.signIn) elements.signIn.hidden = true;
    if (elements.signUp) elements.signUp.hidden = true;
    if (elements.logoutButton) elements.logoutButton.hidden = false;
    try {
      const profileDoc = await db.collection('users').doc(user.uid).get();
      const stored = profileDoc.exists ? profileDoc.data() : {};
      currentProfile = {
        name: stored.name || user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        photoURL: stored.photoURL || user.photoURL || '',
        role: stored.role || defaultRole(),
        bio: stored.bio || '',
      };
      render();
    } catch (error) {
      console.error('Profile loading failed:', error);
      currentProfile = { name: user.displayName || 'User', email: user.email || '', photoURL: user.photoURL || '', role: defaultRole(), bio: '' };
      render();
    }
  });
});
