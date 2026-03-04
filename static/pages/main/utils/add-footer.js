import { createFooter } from "../../../shared/footer/footer.js";

const footer = createFooter({
  socialIcons: [
    {
      src: "/static/assets/img/social/tg.svg",
      alt: "Telegram",
      href: "https://t.me/fcsan_by",
    },
    {
      src: "/static/assets/img/social/vk.svg",
      alt: "VK",
      href: "https://vk.com/bsuiropen",
    },
    {
      src: "/static/assets/img/social/mail.svg",
      alt: "Mail",
      href: "mailto:acm@bsuir.by",
    },
    {
      src: "/static/assets/img/social/bsuir.svg",
      alt: "BSUIR",
      href: "https://bsuir.by",
    },
    {
      src: "/static/assets/img/social/fcsan.svg",
      alt: "FCSAN",
      href: "https://vk.com/studsovet_fksis",
    },
  ],
});

document.body.append(footer);