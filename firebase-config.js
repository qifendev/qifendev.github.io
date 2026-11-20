/**
 * Firebase Web app config for qifendev.github.io (project: qifen-website).
 *
 * Pure-static site — no npm, no build step, no Flutter. These globals are read
 * by analytics.js. Everything works except actual upload until measurementId
 * is set to the real GA4 tag; events are buffered in dataLayer meanwhile.
 */
window.QIFEN_FIREBASE_CONFIG = {
  projectId: "qifen-website",
  appId: "1:560692380028:web:e500f02711f70ce569a4f9",
  storageBucket: "qifen-website.firebasestorage.app",
  apiKey: "AIzaSyCtK965bT53jBLDjbTUR2sGH6_NfP8VA0U",
  authDomain: "qifen-website.firebaseapp.com",
  messagingSenderId: "560692380028",
  projectNumber: "560692380028",
  // GA4 Measurement ID (Analytics enabled in the Firebase console 2026-11-20).
  measurementId: "G-JVWCQ2WCCN"
};
