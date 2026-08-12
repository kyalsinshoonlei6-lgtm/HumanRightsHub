const legacyFirebaseConfig = {
  apiKey: "AIzaSyCGByHZdF7yQbW24FFoctfxdu7mkLMjLkw", // Firebase Console မှ ရလာသော API Key အမှန်ထည့်ပါ
  authDomain: "fir-cc3bf.firebaseapp.com",
  projectId: "fir-cc3bf",
  storageBucket: "fir-cc3bf.firebasestorage.app",
  messagingSenderId: "495783101105",
  appId: "1:495783101105:web:2b814838d6665e02185890"
};

// Keep every page connected to the Firebase project configured for Human Rights Hub.
const firebaseConfig = {
  apiKey: "AIzaSyAGw8_6XHCB5Qsf1EAZd9hyBSoW3u6ZLtM",
  authDomain: "registration-system-d44a1.firebaseapp.com",
  projectId: "registration-system-d44a1",
  storageBucket: "registration-system-d44a1.firebasestorage.app",
  messagingSenderId: "266476868928",
  appId: "1:266476868928:web:921a33b7c7a874993f16a5",
  measurementId: "G-4PHJFCJG83"
};
window.FIREBASE_CONFIG = firebaseConfig;

window.HRH = window.HRH || {};
if (window.firebase) {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  window.HRH.firebase = {
    app: firebase.app(),
    auth: firebase.auth(),
    db: firebase.firestore(),
    storage: firebase.storage()
  };
}
