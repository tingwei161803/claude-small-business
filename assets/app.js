/* Reading progress bar + active-section highlighting in the TOC. */
(() => {
  const progress = document.querySelector('.progress');
  const sections = Array.from(document.querySelectorAll('.section[id]'));
  const tocItems = new Map(
    Array.from(document.querySelectorAll('.toc__item')).map((el) => [el.dataset.target, el])
  );

  function updateProgress() {
    if (!progress) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
  }

  function updateActive() {
    const offset = window.innerHeight * 0.35;
    let current = sections[0]?.id;
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top - offset <= 0) current = s.id;
    }
    tocItems.forEach((el, id) => {
      el.dataset.active = id === current ? 'true' : 'false';
    });
  }

  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      updateProgress();
      updateActive();
      raf = null;
    });
  }

  /* Mobile TOC toggle */
  const toc = document.querySelector('.toc');
  const tocToggle = document.querySelector('.toc__toggle');
  if (tocToggle && toc) {
    tocToggle.addEventListener('click', () => {
      const open = toc.dataset.open === 'true';
      toc.dataset.open = open ? 'false' : 'true';
      tocToggle.setAttribute('aria-expanded', toc.dataset.open === 'true' ? 'true' : 'false');
    });
    document.querySelectorAll('.toc__item a').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 960px)').matches) {
          toc.dataset.open = 'false';
          if (tocToggle) tocToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* Switching language: on wide screens carry the hash so the reader stays on the
     same chapter (the TOC is pinned alongside). On mobile that lands mid-page and
     feels like a glitch, so let the clean link load at the top. */
  document.querySelectorAll('[data-lang-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = window.location.hash;
      const keepChapter = hash && window.matchMedia('(min-width: 961px)').matches;
      if (keepChapter) {
        e.preventDefault();
        window.location.href = a.getAttribute('href') + hash;
      }
    });
  });

  /* Highlight Anthropic product names (Claude / Claude Code / Claude Cowork) in body copy.
     Done in JS so both language pages stay in sync and the markup stays clean. */
  function highlightProducts() {
    // Longest names first so "Claude Code" wins over a bare "Claude" at the same spot.
    const PRODUCT_RE = /Claude Code|Claude Cowork|Claude/g;
    const SKIP_TAGS = new Set(['A', 'CODE', 'PRE', 'SCRIPT', 'STYLE', 'BUTTON', 'H1', 'H2', 'H3', 'H4']);
    const roots = document.querySelectorAll(
      '.prose, .stage__block > p:not(.stage__block-label), .stage__block ul, .stage__block ol, .tool__desc, .challenge__body, .recipe__desc, .install-step__block p, .prompt-card__does'
    );

    const chips = [];
    roots.forEach((root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || node.nodeValue.indexOf('Claude') === -1) return NodeFilter.FILTER_REJECT;
          for (let p = node.parentElement; p && p !== root.parentElement; p = p.parentElement) {
            if (SKIP_TAGS.has(p.tagName) || p.classList.contains('product')) return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const targets = [];
      while (walker.nextNode()) targets.push(walker.currentNode);

      targets.forEach((node) => {
        const text = node.nodeValue;
        const frag = document.createDocumentFragment();
        let last = 0;
        let m;
        PRODUCT_RE.lastIndex = 0;
        while ((m = PRODUCT_RE.exec(text)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          const span = document.createElement('span');
          span.className = 'product';
          span.textContent = m[0];
          frag.appendChild(span);
          chips.push(span);
          last = m.index + m[0].length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });

    animateChips(chips);
  }

  /* Light up each product chip as it scrolls into view. Falls back to the
     static filled state when motion is reduced or IntersectionObserver is absent. */
  function animateChips(chips) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!chips.length || reduce || !('IntersectionObserver' in window)) return;

    chips.forEach((chip) => chip.classList.add('is-armed'));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-armed');
        entry.target.classList.add('is-lit');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
    chips.forEach((chip) => io.observe(chip));
  }

  /* Copy-to-clipboard for prompt cards. Each .prompt-card__copy button copies the
     text of its sibling .prompt-card__pre code, then flips to a "copied" label that
     reverts after a short delay. Labels follow the page language. */
  function initCopyButtons() {
    const buttons = Array.from(document.querySelectorAll('.prompt-card__copy'));
    if (!buttons.length) return;

    // Chinese pages get Chinese labels; everything else falls back to English.
    const isZh = (document.documentElement.lang || '').toLowerCase().startsWith('zh');
    const LABELS = isZh ? { copy: '複製', copied: '已複製' } : { copy: 'Copy', copied: 'Copied' };
    // Screen-reader announcement pushed to the card's aria-live status node on success.
    const COPIED_MESSAGE = isZh ? 'Prompt 已複製到剪貼簿' : 'Prompt copied to clipboard';

    // Best-effort copy: prefer the async Clipboard API, fall back to execCommand.
    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
      }
      return legacyCopy(text);
    }

    function legacyCopy(text) {
      return new Promise((resolve, reject) => {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.top = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          const ok = document.execCommand('copy');
          document.body.removeChild(ta);
          ok ? resolve() : reject(new Error('execCommand failed'));
        } catch (err) {
          reject(err);
        }
      });
    }

    buttons.forEach((btn) => {
      // Resolve the default label once: explicit attr first, then current text.
      // data-label-default is an optional override hook; no HTML sets it today.
      const defaultLabel = btn.dataset.labelDefault || btn.textContent.trim() || LABELS.copy;
      let timer = null;

      btn.addEventListener('click', () => {
        const card = btn.closest('.prompt-card');
        const code = card ? card.querySelector('.prompt-card__pre code') : null;
        if (!code) return;
        const text = (code.textContent || '').trim();
        if (!text) return;

        const status = card ? card.querySelector('.prompt-card__status') : null;

        copyText(text)
          .then(() => {
            btn.dataset.copied = 'true';
            btn.textContent = LABELS.copied;
            if (status) status.textContent = COPIED_MESSAGE;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              btn.dataset.copied = 'false';
              btn.textContent = defaultLabel;
              if (status) status.textContent = '';
            }, 1800);
          })
          .catch(() => { /* clipboard unavailable — leave the button untouched */ });
      });
    });
  }

  /* Show the live GitHub star count in the header button. */
  function loadStarCount() {
    const el = document.querySelector('.ghstar__count');
    if (!el) return;
    const REPO = 'tingwei161803/claude-small-business';
    const CACHE_KEY = 'csmb_gh_stars';
    const TTL = 60 * 60 * 1000; // 1 hour
    const render = (n) => {
      el.textContent = n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
      el.hidden = false;
    };

    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (cached && typeof cached.n === 'number' && Date.now() - cached.t < TTL) render(cached.n);
    } catch (e) { /* private mode / bad cache — ignore */ }

    fetch(`https://api.github.com/repos/${REPO}`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || typeof data.stargazers_count !== 'number') return;
        render(data.stargazers_count);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ n: data.stargazers_count, t: Date.now() }));
        } catch (e) { /* storage unavailable — count still shows this session */ }
      })
      .catch(() => { /* offline or rate-limited — leave the button without a count */ });
  }

  highlightProducts();
  initCopyButtons();
  loadStarCount();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateProgress();
  updateActive();
})();
