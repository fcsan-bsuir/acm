import { createTitle } from "../title.js";

const config = window.BSUIR_CONFIG || {};
const tr = config.translations || {};
const t = (key, fallback) => tr[key] || fallback;

const aboutSection = document.querySelector("#about");
const aboutTitle = createTitle({ text: t("about", "Об олимпиаде"), level: "head" });

aboutSection.insertBefore(aboutTitle, aboutSection.firstChild);

const stagesSection = document.querySelector("#stages");
const stagesTitle = createTitle({ text: t("stages", "Этапы"), level: "head" });

stagesSection.insertBefore(stagesTitle, stagesSection.firstChild);

const scheduleSection = document.querySelector("#schedule");
const scheduleTitle = createTitle({ text: t("schedule", "Расписание"), level: "head" });

scheduleSection.insertBefore(scheduleTitle, scheduleSection.firstChild);

const partnersSection = document.querySelector("#partners");
const partnersTitle = createTitle({ text: t("partners", "Партнеры"), level: "head" });

partnersTitle.classList.add('partners-title');

partnersSection.insertBefore(partnersTitle, partnersSection.firstChild);
