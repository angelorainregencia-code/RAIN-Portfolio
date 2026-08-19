// RAIN REGENCIA — Tactical Cyber-Executive interactions
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c RAIN REGENCIA // SYSTEMS OPERATIONAL', 'font-family: monospace; color: #00f0ff; font-weight: 700;');

  /* ---------- mobile menu ---------- */
  const overlay = document.getElementById('mobile-overlay');
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');

  function openMenu() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  /* ---------- smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- scroll-triggered reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in-view'), i * 60);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------- copy email to clipboard ---------- */
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      const original = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'COPIED ✓';
      } catch (err) {
        // Fallback for browsers without clipboard API permission
        const temp = document.createElement('textarea');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyBtn.textContent = 'COPIED ✓';
      }
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = original;
        copyBtn.classList.remove('copied');
      }, 1800);
    });
  }
});