export function createHeader(options = {}) {
    const {
        logoText,
        logoHref = "/",
        navItems = [],
        languages = [],
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

    const header = document.createElement("header");
    header.className = "header";

    const container = document.createElement("div");
    container.className = "header_container";

    const logo = document.createElement("a");
    logo.href = logoHref;
    logo.className = "header_logo";
    logo.textContent = logoText || "";

    const nav = document.createElement("nav");
    nav.className = "header_nav";

    navItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.href;
    link.textContent = item.text;
    link.dataset.text = item.text;
        nav.appendChild(link);
    });

    const actions = document.createElement("div");
    actions.className = "header_actions";

    if (authenticated) {
        const accountLink = document.createElement("a");
        accountLink.href = "#account";
        accountLink.className = "header_account";
    accountLink.textContent = account;
    accountLink.dataset.text = account;

        const logoutLink = document.createElement("a");
        logoutLink.href = "#logout";
        logoutLink.className = "header_logout";
    logoutLink.textContent = logout;
    logoutLink.dataset.text = logout;

        actions.appendChild(accountLink);
        actions.appendChild(logoutLink);
    } else {
        const loginLink = document.createElement("a");
        loginLink.href = "#login";
        loginLink.className = "header_login";
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
    const initialCode =
        languages[0] && languages[0].code ? languages[0].code.toUpperCase() : "";
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
            const codeEl = lang.querySelector(".lang-code");
            if (codeEl) codeEl.textContent = langItem.code.toUpperCase();
            closeDropdown();
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

    const mobileMenu = createMobileMenu(navItems, languages, lang, authenticated);
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
) {
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
        link.href = item.href;
        link.textContent = item.text;
        if (item.active) link.classList.add("active");
        if (item.primary) link.dataset.primary = "true";
        nav.appendChild(link);
    });

    const bottom = document.createElement("div");
    bottom.className = "mobile_menu_bottom";

    if (authenticated) {
        const accountLink = document.createElement("a");
        accountLink.href = "#account";
        accountLink.textContent = (headerLangButton?.dataset?.accountText) || "";
        const logoutLink = document.createElement("a");
        logoutLink.href = "#logout";
        logoutLink.textContent = (headerLangButton?.dataset?.logoutText) || "";
        bottom.appendChild(accountLink);
        bottom.appendChild(logoutLink);
    } else {
        const login = document.createElement("a");
        login.href = "#login";
        login.textContent = (headerLangButton?.dataset?.mobileLoginText) || "";

        const register = document.createElement("a");
        register.href = "#register";
        register.textContent =
            (headerLangButton?.dataset?.mobileRegisterText) || "";

        bottom.appendChild(login);
        bottom.appendChild(register);
    }

    let currentLang = languages[0]?.code || "ru";

    const langToggle = document.createElement("a");
    langToggle.href = "#";
    langToggle.className = "lang";
    langToggle.textContent = currentLang.toUpperCase();

    langToggle.addEventListener("click", (e) => {
        e.preventDefault();

        const nextLang = languages.find((l) => l.code !== currentLang);
        if (!nextLang) return;

        currentLang = nextLang.code;
        langToggle.textContent = currentLang.toUpperCase();

        if (headerLangButton) {
            const codeEl = headerLangButton.querySelector(".lang-code");
            if (codeEl) {
                codeEl.textContent = currentLang.toUpperCase();
            }
        }
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