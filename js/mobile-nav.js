(function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
  const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
  const mobileNavClose = document.getElementById("mobile-nav-close");

  if (!hamburgerBtn || !mobileNavDrawer || !mobileNavOverlay) return;

  function openNav() {
    hamburgerBtn.classList.add("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileNavOverlay.classList.add("is-open");
    mobileNavOverlay.style.display = "block";
    mobileNavDrawer.classList.add("is-open");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeNav() {
    hamburgerBtn.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileNavOverlay.classList.remove("is-open");
    mobileNavDrawer.classList.remove("is-open");
    document.body.style.overflow = "";
    
    // Wait for transition before hiding
    setTimeout(() => {
      if (!mobileNavOverlay.classList.contains("is-open")) {
        mobileNavOverlay.style.display = "none";
      }
    }, 300);
  }

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = hamburgerBtn.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", closeNav);
  }

  mobileNavOverlay.addEventListener("click", closeNav);

  // Close when pressing Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNavDrawer.classList.contains("is-open")) {
      closeNav();
    }
  });

  // Close when a link is clicked
  const mobileLinks = mobileNavDrawer.querySelectorAll("a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", closeNav);
  });
})();
