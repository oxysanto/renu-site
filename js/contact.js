'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const note = document.getElementById('formNote');
  const btn = form.querySelector('button[type="submit"]');
  const endpoint = form.getAttribute('action') || '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.disabled = true;
    const originalLabel = btn.textContent;
    btn.textContent = 'Gönderiliyor...';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });

      if (res.ok) {
        showThanks(form);
      } else {
        let detail = '';
        try {
          const data = await res.json();
          if (Array.isArray(data.errors) && data.errors.length) {
            detail = data.errors.map(err => err.message).filter(Boolean).join(' ');
          } else if (data.error) {
            detail = data.error;
          }
        } catch (_) {}
        note.textContent = detail
          ? `Gönderilemedi: ${detail}`
          : 'Bir sorun oluştu. Lütfen frcrenu@gmail.com adresine doğrudan yazın.';
        note.classList.add('visible', 'is-error');
      }
    } catch (err) {
      note.textContent = err.name === 'AbortError'
        ? 'Yanıt 30 saniye içinde gelmedi. Lütfen frcrenu@gmail.com adresine doğrudan yazın.'
        : 'Bağlantı hatası. Lütfen frcrenu@gmail.com adresine doğrudan yazın.';
      note.classList.add('visible', 'is-error');
    } finally {
      clearTimeout(timeoutId);
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
});

function showThanks(form) {
  const wrap = form.closest('.contact-form-wrap');
  const thanks = document.createElement('div');
  thanks.className = 'thanks-panel';
  thanks.innerHTML =
    '<p class="eyebrow">MESAJ GÖNDERİLDİ</p>' +
    '<h3 class="thanks-title">Teşekkürler!</h3>' +
    '<p class="body-text">Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız.</p>' +
    '<button type="button" class="btn btn-ghost mt-sm" id="thanksBack">Yeni Mesaj Yaz</button>';

  thanks.querySelector('#thanksBack').addEventListener('click', () => {
    form.reset();
    wrap.replaceChild(form, thanks);
    form.removeAttribute('hidden');
    form.style.display = '';
  });

  form.setAttribute('hidden', '');
  wrap.replaceChild(thanks, form);
}
