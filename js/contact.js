'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    const btn = form.querySelector('button[type="submit"]');
    const endpoint = form.getAttribute('action') || '';

    btn.disabled = true;
    const originalLabel = btn.textContent;
    btn.textContent = 'Gönderiliyor...';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        note.textContent = 'Mesajınız gönderildi, teşekkürler! En kısa sürede dönüş yapacağız.';
        form.reset();
      } else {
        // Formspree hata durumunda alan bazlı mesajlar döndürebilir
        // (örn. {"errors":[{"field":"email","message":"..."}]}); varsa göster,
        // yoksa genel bir Türkçe mesaja düş.
        let detail = '';
        try {
          const data = await res.json();
          if (Array.isArray(data.errors) && data.errors.length) {
            detail = data.errors.map(err => err.message).filter(Boolean).join(' ');
          } else if (data.error) {
            detail = data.error;
          }
        } catch (_) {
          // JSON değilse sessizce genel mesaja düş
        }
        note.textContent = detail
          ? `Gönderilemedi: ${detail}`
          : 'Bir sorun oluştu. Lütfen burakzerencakma@gmail.com adresine doğrudan yazın.';
      }
    } catch (err) {
      note.textContent = 'Bağlantı hatası. Lütfen burakzerencakma@gmail.com adresine doğrudan yazın.';
    } finally {
      note.classList.add('visible');
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
});
