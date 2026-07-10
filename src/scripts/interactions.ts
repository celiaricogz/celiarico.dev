export function initInteractions(): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Scroll reveals ---
  const reveals = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  );

  if (reduce) {
    reveals.forEach((el) => {
      el.style.transition = "none";
      el.classList.add("is-revealed");
    });
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = parseInt(el.getAttribute("data-d") ?? "0", 10);
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-revealed");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
    // Accessibility fallback — ensure reveals fire even if IO is slow
    setTimeout(
      () => reveals.forEach((el) => el.classList.add("is-revealed")),
      2800,
    );
  }

  // --- Smooth scroll navigation ---
  document.querySelectorAll<HTMLElement>("[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 1,
          behavior: "smooth",
        });
      }
    });
  });

  // --- Story rail + topbar ---
  const sectionIds = [
    "hero",
    "problem",
    "approach",
    "evidence",
    "collaboration",
    "next",
  ];
  const sections = sectionIds.map((id) => document.getElementById(id));
  const dots = Array.from(
    document.querySelectorAll<HTMLElement>("[data-rail-dot]"),
  );
  const railFill = document.querySelector<HTMLElement>("[data-rail-fill]");
  const topbar = document.querySelector<HTMLElement>("[data-topbar]");

  const setActiveDot = (idx: number) => {
    dots.forEach((dot, i) => {
      const mark = dot.querySelector<HTMLElement>("[data-dot]");
      if (mark) mark.classList.toggle("is-active", i === idx);
    });
  };

  dots.forEach((dot) => {
    const label = dot.querySelector<HTMLElement>("[data-dot-label]");
    if (!label) return;
    dot.addEventListener("mouseenter", () => label.classList.add("is-visible"));
    dot.addEventListener("mouseleave", () =>
      label.classList.remove("is-visible"),
    );
    dot.addEventListener("focus", () => label.classList.add("is-visible"));
    dot.addEventListener("blur", () => label.classList.remove("is-visible"));
  });

  // --- Timeline ---
  const timeline = document.querySelector<HTMLElement>("[data-timeline]");
  const timelineFill = document.querySelector<HTMLElement>(
    "[data-timeline-fill]",
  );
  const stageDots = Array.from(
    document.querySelectorAll<HTMLElement>("[data-stage-dot]"),
  );

  // --- Scroll handler ---
  let activeSection = 0;
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - vh;

      // Rail fill
      if (railFill) {
        const pct = docH > 0 ? Math.max(0, Math.min(100, (y / docH) * 100)) : 0;
        railFill.style.height = `${pct}%`;
      }

      // Topbar
      if (topbar) {
        topbar.classList.toggle("is-scrolled", y > 40);
      }

      // Active section tracking
      let active = 0;
      sections.forEach((sec, i) => {
        if (sec && sec.getBoundingClientRect().top <= vh * 0.42) active = i;
      });
      if (active !== activeSection) {
        activeSection = active;
        setActiveDot(active);
      }

      // Timeline fill + stage dots
      if (timeline && timelineFill) {
        const r = timeline.getBoundingClientRect();
        const start = vh * 0.6;
        const prog = Math.max(0, Math.min(1, (start - r.top) / r.height));
        timelineFill.style.height = `${prog * r.height}px`;
        stageDots.forEach((dot) => {
          const dr = dot.getBoundingClientRect();
          dot.classList.toggle("is-passed", dr.top < start);
        });
      }

      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  setActiveDot(0);
  onScroll();

  // --- Theme + language toggles ---
  initThemeAndLanguageControls();
}

function syncLabels(): void {
  const lang = document.documentElement.lang === "es" ? "es" : "en";
  document.querySelectorAll<HTMLElement>("[data-label-en]").forEach((el) => {
    const label = el.getAttribute(`data-label-${lang}`);
    if (label) el.setAttribute("aria-label", label);
  });
}

function initThemeAndLanguageControls(): void {
  const themeToggle = document.querySelector<HTMLButtonElement>(
    "[data-theme-toggle]",
  );
  const langButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]"),
  );

  const syncThemeState = () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle?.setAttribute("aria-checked", String(isDark));
  };

  const syncLangState = () => {
    const lang = document.documentElement.lang === "es" ? "es" : "en";
    langButtons.forEach((btn) => {
      btn.setAttribute(
        "aria-pressed",
        String(btn.getAttribute("data-lang-btn") === lang),
      );
    });
  };

  syncThemeState();
  syncLangState();
  syncLabels();

  themeToggle?.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      window.localStorage.setItem("cr-theme-v2", next);
    } catch (e) {}
    syncThemeState();
  });

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-btn");
      if (lang !== "en" && lang !== "es") return;
      document.documentElement.lang = lang;
      try {
        window.localStorage.setItem("cr-lang", lang);
      } catch (e) {}
      syncLangState();
      syncLabels();
    });
  });
}
