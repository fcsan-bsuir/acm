import { createHeader } from "../header.js";

const config = window.BSUIR_CONFIG || {};
const tr = config.translations || {};
const navLinks = config.navLinks || {};
const homeHref = navLinks.home || "/";
const rulesHref = navLinks.rules || "/rules";
const currentPath = normalizePath(window.location.pathname);
const currentHash = window.location.hash || "";
const onIndex = pathMatchesCurrent(homeHref);

const t = (key, fallback) => tr[key] || fallback;

const header = createHeader({
    logoText: t("title", "BSUIR Open XIV"),
    logoHref: "/",
    navItems: [
        {
            text: t("main_page", "Главная"),
            href: `${homeHref}#main`,
            active: onIndex && (currentHash === "" || currentHash === "#main"),
        },
        { text: t("about", "Об олимпиаде"), href: `${homeHref}#about`, active: onIndex && currentHash === "#about" },
        { text: t("stages", "Этапы"), href: `${homeHref}#stages`, active: onIndex && currentHash === "#stages" },
        { text: t("schedule", "Расписание"), href: `${homeHref}#schedule`, active: onIndex && currentHash === "#schedule" },
        { text: t("partners", "Партнеры"), href: `${homeHref}#partners`, active: onIndex && currentHash === "#partners" },
        { text: t("rules", "Правила"), href: rulesHref, active: pathMatchesCurrent(rulesHref) },
    ],
    languages: [
        { code: "ru", label: "Русский" },
        { code: "en", label: "English" },
    ],
    selectedLanguage: config.selectedLanguage,
    authenticated: config.authenticated || false,
    authLinks: config.authLinks || {
        account: "/team",
        logout: "/accounts/logout",
        login: "/accounts/login",
    },
    authTexts: {
        account: t("profile", "Личный кабинет"),
        logout: t("logout", "Выйти"),
        login: t("participate", "Войти"),
        mobileLogin: t("participate", "Вход"),
        mobileRegister: t("signup", "Регистрация"),
    },
});

document.body.prepend(header);

function normalizePath(pathname) {
    if (!pathname) return "/";
    if (pathname !== "/" && pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }
    return pathname;
}

function pathMatchesCurrent(href) {
    if (!href || href.startsWith("#")) return false;
    const parsed = new URL(href, window.location.origin);
    return normalizePath(parsed.pathname) === currentPath;
}
