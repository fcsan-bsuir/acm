import { createFooter } from "../footer.js";

const footer = createFooter({
  socialIcons: [
    {
      src: new URL("../../img/social/tg.svg", import.meta.url).href,
      alt: "Telegram",
      href: "https://t.me/fcsan_by",
    },
    {
      src: new URL("../../img/social/vk.svg", import.meta.url).href,
      alt: "VK",
      href: "https://vk.com/bsuiropen",
    },
    {
      src: new URL("../../img/social/mail.svg", import.meta.url).href,
      alt: "Mail",
      href: "mailto:acm@bsuir.by",
    },
    {
      src: new URL("../../img/social/bsuir.svg", import.meta.url,).href,
      alt: "BSUIR",
      href: "https://bsuir.by",
    },
    {
      src: new URL("../../img/social/fcsan.svg", import.meta.url).href,
      alt: "FCSAN",
      href: "https://vk.com/studsovet_fksis",
    },
  ],
});

document.body.append(footer);