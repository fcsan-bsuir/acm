import { createHeader } from "../header.js";

const header = createHeader({
    logoText: "BSUIR Open XIV",
    logoHref: "/",
    navItems: [
        { text: "Главная", href: "#main" },
        { text: "Об олимпиаде", href: "#about" },
        { text: "Этапы", href: "#stages" },
        { text: "Расписание", href: "#schedule" },
        { text: "Партнеры", href: "#partners" },
        { text: "Правила", href: "#rules" },
    ],
    languages: [
        { code: "ru", label: "Русский" },
        { code: "en", label: "English" },
    ],
    authenticated: false,
    authTexts: {
        account: "Личный кабинет",
        logout: "Выйти",
        login: "Войти",
        mobileLogin: "Вход",
        mobileRegister: "Регистрация",
    },
});

document.body.prepend(header);