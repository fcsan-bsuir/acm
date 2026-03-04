function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(
    ".header_nav a, .mobile_menu_nav a",
  );
  const homeLink = document.querySelector(
    '.header_nav a[href="#main"], .header_nav a[href="/#main"], .mobile_menu_nav a[href="#main"], .mobile_menu_nav a[href="/#main"]'
  );

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset) {
      link.dataset.active = "false";
    }
  });

  if (homeLink) {
    homeLink.classList.add("active");
    if (homeLink.dataset) {
      homeLink.dataset.active = "true";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".header_nav a, .mobile_menu_nav a")
    .forEach((link) => {
      link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      
      let targetId = null;
      if (href) {
        if (href.startsWith("#")) {
          targetId = href;
        } else {
          try {
            const url = new URL(href, window.location.href);
            if (url.pathname === window.location.pathname && url.hash) {
              targetId = url.hash;
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
      
      if (targetId) {
        e.preventDefault();

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const header = document.querySelector(".header");
          const headerHeight = header ? header.offsetHeight : 0;

          const offset = -20;

          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          const mobileMenu = document.querySelector(".mobile_menu");
          if (mobileMenu && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
          }
        }
      }
    });
  });
});

window.addEventListener(
  "scroll",
  debounce(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(
      ".header_nav a, .mobile_menu_nav a",
    );

    let currentSectionId = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      const distance = Math.abs(sectionTop);

      if (sectionTop <= 200 && sectionBottom >= 200) {
        if (distance < minDistance) {
          minDistance = distance;
          currentSectionId = section.getAttribute("id");
        }
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset) {
        link.dataset.active = "false";
      }
    });

    if (currentSectionId) {
      const activeLinks = document.querySelectorAll(
        `.header_nav a[href="#${currentSectionId}"], .header_nav a[href="/#${currentSectionId}"], .mobile_menu_nav a[href="#${currentSectionId}"], .mobile_menu_nav a[href="/#${currentSectionId}"]`,
      );

      activeLinks.forEach((link) => {
        link.classList.add("active");
        if (link.dataset) {
          link.dataset.active = "true";
        }
      });
    } else {
      if (window.scrollY < 100) {
        const homeLinks = document.querySelectorAll(
          '.header_nav a[href="#main"], .header_nav a[href="/#main"], .mobile_menu_nav a[href="#main"], .mobile_menu_nav a[href="/#main"]',
        );
        homeLinks.forEach((link) => {
          link.classList.add("active");
          if (link.dataset) {
            link.dataset.active = "true";
          }
        });
      } else {
        const firstLink = navLinks[0];
        if (firstLink) {
          firstLink.classList.add("active");
          if (firstLink.dataset) {
            firstLink.dataset.active = "true";
          }
        }
      }
    }
  }, 20),
);

document.addEventListener("click", (e) => {
  const mobileMenu = document.querySelector(".mobile_menu");
  const burger = document.querySelector(".header_burger");

  if (mobileMenu && mobileMenu.classList.contains("active")) {
    if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});
