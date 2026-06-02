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

  /* ── Project screenshot lightbox ── */
  function initScreenshotGallery() {
    const modal = document.getElementById("screenshot-modal");
    if (!modal) return;

    const backdrop = modal.querySelector(".screenshot-modal__backdrop");
    const dialog = modal.querySelector(".screenshot-modal__dialog");
    const titleEl = document.getElementById("screenshot-modal-title");
    const track = modal.querySelector(".screenshot-modal__track");
    const counter = modal.querySelector(".screenshot-modal__counter");
    const btnPrev = modal.querySelector(".screenshot-modal__nav--prev");
    const btnNext = modal.querySelector(".screenshot-modal__nav--next");
    const closeBtns = modal.querySelectorAll("[data-close-modal]");

    let lastFocus = null;

    function parseGallery(trigger) {
      const raw = trigger.getAttribute("data-gallery") || "";
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    function slideCount() {
      return track.querySelectorAll(".screenshot-modal__slide").length;
    }

    function activeIndex() {
      const slides = track.querySelectorAll(".screenshot-modal__slide");
      if (!slides.length) return 0;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let closest = 0;
      let minDist = Infinity;
      slides.forEach((slide, i) => {
        const r = slide.getBoundingClientRect();
        const slideCenter = r.left + r.width / 2;
        const dist = Math.abs(slideCenter - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      return closest;
    }

    function scrollToSlide(index) {
      const slide = track.querySelectorAll(".screenshot-modal__slide")[index];
      if (!slide) return;
      slide.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    function updateUI() {
      const total = slideCount();
      const index = activeIndex();
      const multi = total > 1;

      counter.hidden = !multi;
      btnPrev.hidden = !multi;
      btnNext.hidden = !multi;

      if (multi) {
        counter.textContent = `${index + 1} / ${total}`;
        btnPrev.disabled = index <= 0;
        btnNext.disabled = index >= total - 1;
      }
    }

    function openModal(images, caption) {
      if (!images.length) return;

      lastFocus = document.activeElement;
      track.innerHTML = "";

      images.forEach((src, i) => {
        const slide = document.createElement("div");
        slide.className = "screenshot-modal__slide";
        const img = document.createElement("img");
        img.src = src;
        img.alt = caption ? `${caption} — screenshot ${i + 1}` : `Screenshot ${i + 1}`;
        img.loading = "lazy";
        slide.appendChild(img);
        track.appendChild(slide);
      });

      titleEl.textContent = caption || "Screenshots";
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      updateUI();
      modal.querySelector(".screenshot-modal__close").focus();
    }

    function closeModal() {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      track.innerHTML = "";
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
    }

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".project-screenshot");
      if (!trigger) return;
      e.preventDefault();

      const images = parseGallery(trigger);
      const caption =
        trigger.getAttribute("data-caption") ||
        trigger.closest(".project-card")?.querySelector(".project-name")?.textContent?.trim() ||
        "";

      openModal(images, caption);
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });

    btnPrev.addEventListener("click", () => {
      scrollToSlide(Math.max(0, activeIndex() - 1));
    });

    btnNext.addEventListener("click", () => {
      scrollToSlide(Math.min(slideCount() - 1, activeIndex() + 1));
    });

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateUI);
    }, { passive: true });

    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;

      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (slideCount() <= 1) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToSlide(Math.max(0, activeIndex() - 1));
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToSlide(Math.min(slideCount() - 1, activeIndex() + 1));
      }
    });

    dialog.addEventListener("click", (e) => e.stopPropagation());
  }

  /* ── Boot ── */
  document.addEventListener("DOMContentLoaded", () => {
    initDeepDiveToc();
    initSmoothScroll();
    initNavScroll();
    initScreenshotGallery();
  });
})();
