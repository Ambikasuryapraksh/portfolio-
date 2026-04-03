(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  const stored = localStorage.getItem("theme");
  if (stored === "light") {
    root.setAttribute("data-theme", "light");
  }

  function updateThemeIcon() {
    const icon = themeToggle?.querySelector(".icon-btn__icon");
    if (!icon) return;
    const isLight = root.getAttribute("data-theme") === "light";
    icon.textContent = isLight ? "Light" : "Dark";
  }

  function toggleTheme() {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", root.getAttribute("data-theme") === "light" ? "light" : "dark");
    updateThemeIcon();
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    updateThemeIcon();
  }

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close when a link is clicked (mobile)
    navMenu.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches("a.nav__link")) {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scrollspy for active nav link
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function setActiveLink() {
    const y = window.scrollY + 120;
    let currentId = sections[0]?.id;

    for (const sec of sections) {
      if (sec.offsetTop <= y) currentId = sec.id;
    }

    navLinks.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("is-active", href === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  // Project modal
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const modalTitle = document.getElementById("modalTitle");
  const modalLink = document.getElementById("modalLink");
  const modalImage = document.getElementById("modalImage");

  const modalCloseEls = Array.from(document.querySelectorAll("[data-modal-close]"));

  const projectContent = {
    groundnut: {
      title: "CNN-Based Groundnut Leaf Disease Classification",
      body:
        "Developed a deep learning model using ResNeXt-101 for accurate classification of groundnut leaf diseases. " +
        "Published at the 3rd International Conference on Data Analytics, Soft Computing, and Networks (IDASCN 2024).",
      imageHref: "./assets/projects/groundnut.svg",
      linkText: "Paper / Link",
      linkHref: "#",
    },
    apna: {
      title: "APNA Theater Web Application",
      body:
        "Built a responsive movie streaming website using HTML, CSS, and JavaScript with authentication and search features. " +
        "Focus included smooth user interaction and improved usability/performance.",
      imageHref: "./assets/projects/apna.svg",
      linkText: "Live / Repo",
      linkHref: "#",
    },
    artgallery: {
      title: "Art Gallery DBMS System",
      body:
        "Designed and implemented a database management system using SQL and ER modeling. " +
        "Modeled entities and relationships, then implemented core database operations for the system.",
      imageHref: "./assets/projects/artgallery.svg",
      linkText: "Database / Repo",
      linkHref: "#",
    },
  };

  function openModal(key) {
    const data = projectContent[key];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;

    if (modalLink) {
      modalLink.textContent = data.linkText || "View (link)";
      modalLink.href = data.linkHref || "#";
    }

    if (modalImage && data.imageHref) {
      modalImage.src = data.imageHref;
      modalImage.alt = data.title + " image";
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".project-card").forEach((card) => {
    const key = card.getAttribute("data-project");
    card.addEventListener("click", () => openModal(key));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(key);
    });
  });

  modalCloseEls.forEach((el) => el.addEventListener("click", closeModal));
  if (modal) {
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // Contact form -> mailto
  const contactForm = document.getElementById("contactForm");
  const formHint = document.getElementById("formHint");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();

      const to = "suryaprakashambika701@gmail.com";
      const subject = encodeURIComponent(`Portfolio Contact - ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`);

      // Opens user's email client
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

      if (formHint) {
        formHint.textContent = "Opening your email client...";
        setTimeout(() => (formHint.textContent = ""), 2500);
      }
    });
  }
})();

