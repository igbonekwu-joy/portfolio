/* ============================================================
   PORTFOLIO — Alex Okafor
   main.js — all interactivity
   ============================================================ */

(function () {
  "use strict";

  /* ── Deep-dive ToC active-link observer ── */
  function initDeepDiveToc() {
    const sections = document.querySelectorAll(".dd-section[id]");
    const tocLinks = document.querySelectorAll(".dd-toc a");

    if (!sections.length || !tocLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove("active"));
            const active = document.querySelector(
              `.dd-toc a[href="#${entry.target.id}"]`
            );
            if (active) active.classList.add("active");
          }
        });
      },
      { threshold: 0.45, rootMargin: "-64px 0px 0px 0px" }
    );

    sections.forEach((s) => observer.observe(s));
  }

  /* ── Smooth-scroll for all in-page anchor links ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const navH = document.querySelector(".site-nav")?.offsetHeight ?? 64;
        const top =
          target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }

  /* ── Navbar background opacity on scroll ── */
  function initNavScroll() {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;

    window.addEventListener(
      "scroll",
      () => {
        nav.style.borderColor =
          window.scrollY > 10 ? "var(--rule)" : "transparent";
        nav.style.boxShadow =
          window.scrollY > 10 ? "var(--shadow-nav)" : "none";
      },
      { passive: true }
    );
  }

  /* ── Boot ── */
  document.addEventListener("DOMContentLoaded", () => {
    initDeepDiveToc();
    initSmoothScroll();
    initNavScroll();
  });
})();
