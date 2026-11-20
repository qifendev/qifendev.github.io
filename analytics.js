/**
 * qifen website — pure-JS click analytics (no framework, no build step).
 *
 * Loaded as a plain <script src="analytics.js"></script> on every page.
 * It captures EVERY click on the page via one delegated listener, then emits
 * a small set of GA4 events through gtag.js (Firebase Analytics for Web).
 *
 * The Firebase/GA4 measurement ID lives in firebase-config.js. Until a real
 * G-XXXXXXX id is set there, events are buffered in memory (and optionally
 * mirrored to console) instead of being dropped, so nothing is lost once the
 * ID is filled in.
 *
 * Event names / parameters: see ANALYTICS_EVENTS.md at the repo root.
 */
(function () {
  'use strict';

  var CFG = window.QIFEN_FIREBASE_CONFIG || {};
  var MEASUREMENT_ID = CFG.measurementId || '';
  var DEBUG = /[?&]analytics_debug=1/.test(location.search);

  // ---- gtag bootstrap (Fa ▸ GA4) -------------------------------------------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var ready = false;
  function loadGtag() {
    if (!MEASUREMENT_ID || !/^G-/.test(MEASUREMENT_ID)) {
      if (DEBUG) console.info('[analytics] no measurement id yet; events buffered');
      return;
    }
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    s.onload = function () {
      gtag('js', new Date());
      gtag('config', MEASUREMENT_ID, {
        send_page_view: true,
        // Do not send any PII. The site has no login and no forms.
        anonymize_ip: true,
        app_id: 'qifen-website',
        app_name: 'qifendev.github.io',
        language: (document.documentElement.lang || 'en').toLowerCase()
      });
      ready = true;
      if (DEBUG) console.info('[analytics] gtag ready (' + MEASUREMENT_ID + ')');
    };
    document.head.appendChild(s);
  }

  /** Send an event. Safe before gtag is ready — buffered in dataLayer. */
  function track(name, params) {
    var p = Object.assign({
      language: (document.documentElement.lang || 'en').toLowerCase(),
      page_path: location.pathname + location.search
    }, params || {});
    // Strip undefined / null values (gtag dislikes them).
    Object.keys(p).forEach(function (k) {
      if (p[k] === undefined || p[k] === null) delete p[k];
    });
    if (DEBUG) console.info('[analytics] event', name, p);
    // gtag() queues into dataLayer even before the script loads; GA4 replays
    // the queue on bootstrap, so calling it unconditionally is safe.
    gtag('event', name, p);
    return p;
  }
  window.qifenTrack = track; // public API for pages that want custom events

  // ---- helpers -------------------------------------------------------------
  function text(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  }

  /** Walk up from the event target to find the closest ancestor matching sel. */
  function closest(target, sel) {
    var el = target;
    while (el && el !== document.documentElement) {
      if (el.nodeType === 1 && el.matches && el.matches(sel)) return el;
      el = el.parentElement;
    }
    return null;
  }

  /** Which app card is this element inside? Read the visible name. */
  function appIdFromCard(el) {
    var card = closest(el, '.app-card');
    if (!card) return '';
    var name = card.querySelector('.app-name');
    var raw = name ? text(name) : '';
    // "iShare", "iDownload", ... -> lowercase id used across the repo.
    return raw ? raw.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
  }

  function storeFromHref(href) {
    if (!href) return '';
    if (href.indexOf('play.google.com') !== -1) return 'google_play';
    if (href.indexOf('apps.apple.com') !== -1) return 'app_store';
    if (href.indexOf('mailto:') === 0) return 'email';
    if (href.indexOf('http') === 0) return 'external';
    if (href.indexOf('#') === 0) return 'anchor';
    return 'other';
  }

  // ---- one delegated click listener for the whole site --------------------
  // Capture phase (third arg = true) is deliberate: the language button calls
  // e.stopPropagation() on itself, which would keep a bubbling document
  // listener from ever seeing that click. Capturing runs before the target's
  // own handlers, so no click is lost. We only observe — never prevent/stop.
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || t.nodeType !== 1) return;

    // 1) Language option in theswitcher (.lang-opt[data-lang])
    var langOpt = closest(t, '.lang-opt[data-lang]');
    if (langOpt) {
      track('language_change', {
        to_language: langOpt.getAttribute('data-lang'),
        from_language: (document.documentElement.lang || 'en').toLowerCase(),
        method: 'switcher'
      });
      return;
    }

    // 2) Language switcher button (open/close)
    if (closest(t, '#langBtn')) {
      track('lang_switcher_click', { action: 'toggle' });
      return;
    }

    // 3) Store download badges (Google Play / App Store) and Coming soon
    var badge = closest(t, '.badge');
    if (badge) {
      // The badge itself is usually the <a> (querySelector would miss self).
      var a = badge.tagName === 'A' ? badge : badge.querySelector('a');
      var href = a ? a.getAttribute('href') : '';
      var store = storeFromHref(href);
      if (badge.classList.contains('soon')) {
        track('coming_soon_click', { app_id: appIdFromCard(badge) });
      } else if (store === 'google_play' || store === 'app_store') {
        track('store_click', {
          app_id: appIdFromCard(badge),
          store: store,
          link_url: href || ''
        });
      }
      return;
    }

    // 4) Any other link — anchors, social, privacy, footer
    var link = closest(t, 'a[href]');
    if (link) {
      var lh = link.getAttribute('href') || '';
      var lstore = storeFromHref(lh);
      if (lstore === 'email' || lstore === 'external') {
        track('outbound_click', {
          destination: lstore,
          link_url: lh,
          link_text: text(link),
          app_id: appIdFromCard(link)
        });
      } else if (lstore === 'anchor') {
        track('nav_click', { target: lh, link_text: text(link) });
      } else {
        track('link_click', { link_url: lh, link_text: text(link), store: lstore });
      }
      return;
    }

    // 5) Any other clickable control (button, role=button) not handled above
    var ctl = closest(t, 'button, [role="button"]');
    if (ctl) {
      track('button_click', {
        element_id: ctl.id || '',
        element_text: text(ctl)
      });
      return;
    }

    // 6) Catch-all: record every remaining click with the element info, so
    //    "every button the user clicks" is covered even if markup changes.
    track('ui_click', {
      tag: t.tagName.toLowerCase(),
      element_id: t.id || '',
      class_name: (typeof t.className === 'string' ? t.className : '').slice(0, 80),
      element_text: text(t)
    });
  }, true);

  // ---- optional: first-visit / session context -----------------------------
  try {
    var isNew = !sessionStorage.getItem('qifen_visit');
    sessionStorage.setItem('qifen_visit', '1');
    track('page_view', { is_new_session: isNew, referrer: document.referrer || '' });
  } catch (err) {
    track('page_view', { is_new_session: true });
  }

  loadGtag();
})();
