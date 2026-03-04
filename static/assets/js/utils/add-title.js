import { createTitle } from "../title.js";

const aboutSection = document.querySelector("#about");
const aboutTitle = createTitle({ text: "Об олимпиаде", level: "head" });

aboutSection.insertBefore(aboutTitle, aboutSection.firstChild);

const stagesSection = document.querySelector("#stages");
const stagesTitle = createTitle({ text: "Этапы", level: "head" });

stagesSection.insertBefore(stagesTitle, stagesSection.firstChild);

const scheduleSection = document.querySelector("#schedule");
const scheduleTitle = createTitle({ text: "Расписание", level: "head" });

scheduleSection.insertBefore(scheduleTitle, scheduleSection.firstChild);

const partnersSection = document.querySelector("#partners");
const partnersTitle = createTitle({ text: "Наши партнеры", level: "head" });

partnersTitle.classList.add('partners-title');

partnersSection.insertBefore(partnersTitle, partnersSection.firstChild);