(() => {
  'use strict';
  // Pending client confirmation. Allowed values: null, 'vendas', 'thiago', 'guilherme'.
  // null preserves existing CTA destinations and leaves all contacts unassigned.
  const PRIMARY_SALES_CONTACT = null;
  const contactLinks = [...document.querySelectorAll('[data-contact-id]')];
  const primaryContact = contactLinks.find(link => link.dataset.contactId === PRIMARY_SALES_CONTACT);
  if (primaryContact) {
    const phonePath = new URL(primaryContact.href).pathname;
    document.querySelectorAll('[data-sales-cta]').forEach(link => {
      const destination = new URL(link.href);
      destination.pathname = phonePath;
      link.href = destination.href;
    });
    contactLinks.forEach(link => {
      link.dataset.contactRole = link === primaryContact ? 'primary' : 'secondary';
    });
  }
  document.documentElement.classList.add('js');
  const header = document.querySelector('.header');
  const menu = document.querySelector('#navigation');
  const toggle = document.querySelector('.menu-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopPointer = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)');
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    const hero = heroVideo.closest('.hero-visual');
    const poster = hero.querySelector('.hero-poster');
    const videoDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const connection = navigator.connection;
    let pageReady = false;
    let inView = hero.getBoundingClientRect().top < window.innerHeight && hero.getBoundingClientRect().bottom > 0;
    let failed = false;
    let triedMp4 = false;
    const permitted = () => videoDesktop.matches && !reducedMotion.matches &&
      !connection?.saveData && (!connection?.effectiveType || connection.effectiveType === '4g') &&
      (!connection || typeof connection.downlink !== 'number' || connection.downlink >= 1.5);
    const showPoster = () => hero.classList.remove('video-ready');
    const synchronizeVideo = () => {
      if (!permitted()) {
        heroVideo.pause();
        showPoster();
        if (heroVideo.hasAttribute('src')) {
          heroVideo.removeAttribute('src');
          heroVideo.removeAttribute('poster');
          heroVideo.load();
        }
        failed = false;
        triedMp4 = false;
        return;
      }
      if (!pageReady || !inView || document.hidden || failed) {
        heroVideo.pause();
        return;
      }
      if (!heroVideo.hasAttribute('src')) {
        // Source-free markup prevents mobile, reduced-motion and data-saver downloads.
        heroVideo.poster = poster.currentSrc || poster.src;
        triedMp4 = !heroVideo.canPlayType('video/webm; codecs="vp9"');
        heroVideo.src = triedMp4 ? heroVideo.dataset.mp4 : heroVideo.dataset.webm;
      }
      heroVideo.muted = true;
      heroVideo.play().catch(() => { showPoster(); });
    };
    heroVideo.addEventListener('playing', () => {
      if (permitted() && inView && !document.hidden) hero.classList.add('video-ready');
      else synchronizeVideo();
    });
    heroVideo.addEventListener('error', () => {
      showPoster();
      if (!permitted()) return;
      if (!triedMp4) {
        triedMp4 = true;
        heroVideo.src = heroVideo.dataset.mp4;
        synchronizeVideo();
      } else {
        failed = true;
      }
    });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      synchronizeVideo();
    }).observe(hero);
    videoDesktop.addEventListener('change', synchronizeVideo);
    reducedMotion.addEventListener('change', synchronizeVideo);
    connection?.addEventListener('change', synchronizeVideo);
    document.addEventListener('visibilitychange', synchronizeVideo);
    const prepareVideo = () => {
      // Prioritize the poster, typography and CTAs before requesting the video.
      const ready = () => { pageReady = true; synchronizeVideo(); };
      poster.decode().catch(() => {}).then(() => {
        if ('requestIdleCallback' in window) requestIdleCallback(ready, { timeout: 1200 });
        else setTimeout(ready, 0);
      });
    };
    if (document.readyState === 'complete') prepareVideo();
    else window.addEventListener('load', prepareVideo, { once: true });
  }
  const setMenu = (open, returnFocus = false) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (returnFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  menu.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false);
    // Move keyboard focus to the destination after closing the mobile menu.
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
  });
  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setMenu(false));
  const heroImage = document.querySelector('.hero-visual');
  let framePending = false;
  const updateScroll = () => {
    document.body.classList.toggle('hero-in-view', document.querySelector('.hero').getBoundingClientRect().bottom > 90);
    const top = window.scrollY;
    header.classList.toggle('scrolled', top > 35);
    if (desktopPointer.matches && !reducedMotion.matches && top < 950) {
      heroImage.style.setProperty('--parallax', `${Math.min(top * 0.025, 18)}px`);
    } else {
      heroImage.style.removeProperty('--parallax');
    }
    framePending = false;
  };
  window.addEventListener('scroll', () => {
    if (!framePending) { requestAnimationFrame(updateScroll); framePending = true; }
  }, { passive: true });
  reducedMotion.addEventListener('change', updateScroll);
  desktopPointer.addEventListener('change', updateScroll);
  updateScroll();
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    if (!reducedMotion.matches) document.querySelectorAll('.reveal').forEach((element) => {
      // Visible content stays visible; only enhance sections below the fold.
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('will-reveal');
        revealObserver.observe(element);
      }
    });
    const navLinks = Array.from(menu.querySelectorAll('a'));
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    navLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) navObserver.observe(section);
    });
  }
  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      if (!desktopPointer.matches || reducedMotion.matches) return;
      const box = button.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * 0.045;
      const y = (event.clientY - box.top - box.height / 2) * 0.07;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    const reset = () => { button.style.transform = ''; };
    button.addEventListener('pointerleave', reset);
    button.addEventListener('blur', reset);
    reducedMotion.addEventListener('change', reset);
    desktopPointer.addEventListener('change', reset);
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
