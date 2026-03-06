function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function normalizePath(pathname) {
  if (!pathname) return "/";
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getHomePathname() {
  const config = window.BSUIR_CONFIG || {};
  const navLinks = config.navLinks || {};
  const homeHref = navLinks.home || "/";
  try {
    return normalizePath(new URL(homeHref, window.location.origin).pathname);
  } catch (error) {
    return "/";
  }
}

function getLocalUrl(href) {
  if (!href) return null;
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return url;
  } catch (error) {
    return null;
  }
}

function getSamePageHash(link) {
  const href = link.getAttribute("href");
  const url = getLocalUrl(href);
  if (!url || !url.hash) return null;
  if (normalizePath(url.pathname) !== normalizePath(window.location.pathname)) {
    return null;
  }
  return url.hash;
}

function setActiveByHash(hash) {
  const navLinks = document.querySelectorAll(".header_nav a, .mobile_menu_nav a");
  navLinks.forEach((link) => {
    const linkHash = getSamePageHash(link);
    const isActive = !!linkHash && linkHash === hash;
    link.classList.toggle("active", isActive);
    if (link.dataset) {
      link.dataset.active = isActive ? "true" : "false";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (normalizePath(window.location.pathname) !== getHomePathname()) {
    return;
  }

  const initialHash = window.location.hash || "#main";
  setActiveByHash(initialHash);
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".header_nav a, .mobile_menu_nav a")
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = getSamePageHash(this);

        if (targetId) {
          e.preventDefault();
          setActiveByHash(targetId);

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

            const currentUrl = new URL(window.location.href);
            currentUrl.hash = targetId;
            window.history.replaceState({}, "", currentUrl.toString());

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
    if (normalizePath(window.location.pathname) !== getHomePathname()) {
      return;
    }

    const sections = document.querySelectorAll("section");

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

    if (currentSectionId) {
      setActiveByHash(`#${currentSectionId}`);
    } else {
      if (window.scrollY < 100) {
        setActiveByHash("#main");
      } else {
        setActiveByHash("#main");
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
