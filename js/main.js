'use strict';

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.borderBottomColor = window.scrollY > 10
        ? 'rgba(198,206,220,0.24)'
        : 'rgba(198,206,220,0.09)';
    });
  }

  const mapFrame = document.getElementById('mapFrame');
  const mapBtn = document.getElementById('mapLoadBtn');
  if (mapFrame && mapBtn) {
    mapBtn.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = mapFrame.getAttribute('data-map-src');
      frame.title = 'ReNU 11804 konum haritası';
      frame.loading = 'lazy';
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      mapFrame.replaceChildren(frame);
    });
  }

  initConsent();
});

const GA_MEASUREMENT_ID = 'G-FT3FD86QX2';
const CONSENT_KEY = 'renu_consent';

function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch (_) {
    return null;
  }
}

function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch (_) {}
}

function loadAnalytics() {
  if (typeof window.gtag === 'function') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  const granted = getConsent() === 'yes';
  window.gtag('consent', 'default', { analytics_storage: granted ? 'granted' : 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(s);
}

function showCookieBanner() {
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'region');
  banner.setAttribute('aria-label', 'Çerez tercihleri');
  banner.innerHTML =
    '<div class="cookie-banner-inner">' +
      '<p class="cookie-banner-text">Bu site, ziyaretçi analizi için çerezler kullanır. ' +
      '<a href="/pages/gizlilik-politikasi.html">Gizlilik Politikası</a> incelenebilir.</p>' +
      '<div class="cookie-banner-actions">' +
        '<button type="button" class="btn btn-primary btn-sm" data-consent="yes">Kabul Et</button>' +
        '<button type="button" class="btn btn-ghost btn-sm" data-consent="no">Sadece Zorunlu</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(banner);

  banner.querySelectorAll('[data-consent]').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-consent');
      setConsent(value);
      if (value === 'yes') loadAnalytics();
      banner.remove();
    });
  });
}

function initConsent() {
  const consent = getConsent();
  if (consent === 'yes') {
    loadAnalytics();
  } else if (consent === null) {
    showCookieBanner();
  }
}
