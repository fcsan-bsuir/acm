export function createHeader(options = {}) {
    const {
        logoText,
        logoHref = "/",
        navItems = [],
        languages = [],
        selectedLanguage,
        hideAccountLink = false,
        authenticated = false,
        authTexts = {},
    } = options;

    const {
        account = "",
        logout = "",
        login = "",
        mobileLogin = "",
        mobileRegister = "",
    } = authTexts;

    const {
        account: accountHref = "#account",
        logout: logoutHref = "#logout",
        login: loginHref = "#login",
    } = options.authLinks || {};
    const currentLanguage = resolveCurrentLanguage(languages, selectedLanguage);
    const currentPath = normalizePath(window.location.pathname);

    const header = document.createElement("header");
    header.className = "header";

    const container = document.createElement("div");
    container.className = "header_container";

    const logo = document.createElement("a");
    logo.href = localizeHref(logoHref, currentLanguage);
    logo.className = "header_logo";
    logo.textContent = logoText || "";

    const nav = document.createElement("nav");
    nav.className = "header_nav";

    navItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = localizeHref(item.href, currentLanguage);
        if (item.active) {
            link.classList.add("active");
        }
        link.textContent = item.text;
        link.dataset.text = item.text;
        nav.appendChild(link);
    });

    const actions = document.createElement("div");
    actions.className = "header_actions";

    if (authenticated) {
        if (!hideAccountLink) {
            const accountLink = document.createElement("a");
            accountLink.href = localizeHref(accountHref, currentLanguage);
            accountLink.className = "header_account";
            if (pathMatchesHref(currentPath, accountHref)) {
                accountLink.classList.add("active");
            }
            accountLink.textContent = account;
            accountLink.dataset.text = account;
            actions.appendChild(accountLink);
        }

        const logoutLink = document.createElement("a");
        logoutLink.href = localizeHref(logoutHref, currentLanguage);
        logoutLink.className = "header_logout";
        logoutLink.textContent = logout;
        logoutLink.dataset.text = logout;
        actions.appendChild(logoutLink);
    } else {
        const loginLink = document.createElement("a");
        loginLink.href = localizeHref(loginHref, currentLanguage);
        loginLink.className = "header_login";
        if (pathMatchesHref(currentPath, loginHref)) {
            loginLink.classList.add("active");
        }
        loginLink.textContent = login;
        loginLink.dataset.text = login;
        actions.appendChild(loginLink);
    }

    const langContainer = document.createElement("div");
    langContainer.className = "header_lang_container";

    const lang = document.createElement("button");
    lang.className = "header_lang";
    lang.dataset.accountText = account;
    lang.dataset.logoutText = logout;
    lang.dataset.mobileLoginText = mobileLogin;
    lang.dataset.mobileRegisterText = mobileRegister;
    const initialCode = currentLanguage.toUpperCase();
    const translateIcon = document.createElement("img");
    translateIcon.src = new URL(
        "../../assets/img/translate.svg",
        import.meta.url,
    ).href;
    translateIcon.alt = "translate";
    translateIcon.className = "header_translate_icon";
    const codeSpan = document.createElement("span");
    codeSpan.className = "lang-code";
    codeSpan.textContent = initialCode;
    lang.appendChild(translateIcon);
    lang.appendChild(codeSpan);
    lang.setAttribute("aria-haspopup", "true");
    lang.setAttribute("aria-expanded", "false");

    const dropdown = document.createElement("ul");
    dropdown.className = "header_lang_dropdown";

    languages.forEach((langItem) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = langItem.label;
        btn.dataset.lang = langItem.code;
        btn.addEventListener("click", () => {
            redirectWithLanguage(langItem.code);
        });
        li.appendChild(btn);
        dropdown.appendChild(li);
    });

    langContainer.appendChild(lang);
    langContainer.appendChild(dropdown);

    const burger = document.createElement("button");
    burger.className = "header_burger";
    burger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    actions.appendChild(langContainer);
    actions.appendChild(burger);

    container.appendChild(logo);
    container.appendChild(nav);
    container.appendChild(actions);

    header.appendChild(container);

    const mobileMenu = createMobileMenu(
        navItems,
        languages,
        lang,
        authenticated,
        currentLanguage,
        { accountHref, logoutHref, loginHref },
        hideAccountLink,
    );
    document.body.appendChild(mobileMenu);

    burger.addEventListener("click", () => {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        mobileMenu.classList.add("active");
        document.body.classList.add("mobile-menu-open");
    });

    return header;
}

function createMobileMenu(
    navItems,
    languages = [],
    headerLangButton,
    authenticated = false,
    selectedLanguage = "ru",
    authHrefs = {},
    hideAccountLink = false,
) {
    const {
        accountHref = "#account",
        logoutHref = "#logout",
        loginHref = "#login",
    } = authHrefs;

    const menu = document.createElement("div");
    menu.className = "mobile_menu";

    const header = document.createElement("div");
    header.className = "mobile_menu_header";

    const close = document.createElement("button");
    close.className = "mobile_menu_close";
    close.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    header.appendChild(close);

    const nav = document.createElement("nav");
    nav.className = "mobile_menu_nav";

    navItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = localizeHref(item.href, selectedLanguage);
        link.textContent = item.text;
        if (item.active) link.classList.add("active");
        if (item.primary) link.dataset.primary = "true";
        nav.appendChild(link);
    });

    const bottom = document.createElement("div");
    bottom.className = "mobile_menu_bottom";

    if (authenticated) {
        if (!hideAccountLink) {
            const accountLink = document.createElement("a");
            accountLink.href = localizeHref(accountHref, selectedLanguage);
            accountLink.textContent = (headerLangButton?.dataset?.accountText) || "";
            bottom.appendChild(accountLink);
        }
        const logoutLink = document.createElement("a");
        logoutLink.href = localizeHref(logoutHref, selectedLanguage);
        logoutLink.textContent = (headerLangButton?.dataset?.logoutText) || "";
        bottom.appendChild(logoutLink);
    } else {
        const login = document.createElement("a");
        login.href = localizeHref(loginHref, selectedLanguage);
        login.textContent = (headerLangButton?.dataset?.mobileLoginText) || "";
        bottom.appendChild(login);
    }

    const langToggle = document.createElement("a");
    langToggle.href = "#";
    langToggle.className = "lang";
    langToggle.textContent = selectedLanguage.toUpperCase();

    langToggle.addEventListener("click", (e) => {
        e.preventDefault();
        const nextLang = languages.find((l) => l.code !== selectedLanguage);
        if (!nextLang) return;
        redirectWithLanguage(nextLang.code);
    });

    bottom.appendChild(langToggle);

    setTimeout(() => {
        try {
            const headerNav = document.querySelector(".header_nav");
            if (!headerNav) return;
            const navLinks = headerNav.querySelectorAll("a");
            if (!navLinks || navLinks.length === 0) return;
            let baseLink =
                Array.from(navLinks).find((l) => !l.dataset.primary) || navLinks[0];
            const baseWidth = baseLink.getBoundingClientRect().width;
            Array.from(navLinks).forEach((l) => {
                if (l.dataset.primary) {
                    l.style.minWidth = Math.ceil(baseWidth + 100) + "px";
                    l.style.boxSizing = "border-box";
                    l.style.textAlign = "center";
                }
            });
        } catch (e) {}
    }, 0);

    menu.appendChild(header);
    menu.appendChild(nav);
    menu.appendChild(bottom);

    close.addEventListener("click", () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);

        menu.classList.remove("active");
        document.body.classList.remove("mobile-menu-open");
    });

    return menu;
}

function resolveCurrentLanguage(languages, explicitLanguage) {
    const allowed = new Set((languages || []).map((lang) => lang.code));
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    const fallbackLanguage = languages[0]?.code || "ru";
    const candidate = explicitLanguage || urlLanguage || fallbackLanguage;

    if (allowed.size > 0 && !allowed.has(candidate)) {
        return fallbackLanguage;
    }

    return candidate;
}

function redirectWithLanguage(language) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("lang", language);
    window.location.href = currentUrl.toString();
}

function normalizePath(pathname) {
    if (!pathname) return "/";
    if (pathname !== "/" && pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }
    return pathname;
}

function pathMatchesHref(currentPath, href) {
    if (!href || href.startsWith("#")) return false;
    const parsed = new URL(href, window.location.origin);
    return normalizePath(parsed.pathname) === normalizePath(currentPath);
}

function localizeHref(href, language) {
    if (!href || href.startsWith("#")) {
        return href;
    }

    const parsed = new URL(href, window.location.origin);
    if (parsed.origin !== window.location.origin) {
        return href;
    }

    if (language) {
        parsed.searchParams.set("lang", language);
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}
