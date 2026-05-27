(function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  const navLinks = document.querySelectorAll(".primary-nav a");
  const backToTop = document.querySelector(".back-to-top");

  function closeNav() {
    if (!navToggle || !nav) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeNav();
    });
  });

  function updateActiveNav() {
    const currentPosition = window.scrollY + 160;

    navLinks.forEach(function (link) {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      const starts = target.offsetTop;
      const ends = starts + target.offsetHeight;
      link.classList.toggle("active", currentPosition >= starts && currentPosition < ends);
    });

    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 260);
    }
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", closeNav);
  window.addEventListener("load", updateActiveNav);
})();
