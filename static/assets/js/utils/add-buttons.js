import { createButton } from "../button.js";

const config = window.BSUIR_CONFIG || {};
const tr = config.translations || {};
const selectedLanguage = config.selectedLanguage;
const t = (key, fallback) => tr[key] || fallback;

function localizeUrl(url) {
  if (!selectedLanguage) return url;
  const parsed = new URL(url, window.location.origin);
  parsed.searchParams.set("lang", selectedLanguage);
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

const stagesNav = document.querySelector("#stages nav ul");

const stages = [
  { id: "quaterfinals", label: t("index_round_quarter", "Четвертьфинал"), url: "/teams" },
  { id: "semifinals", label: t("index_round_semi", "Полуфинал"), url: "/semifinal" },
  { id: "finals", label: t("index_round_final", "Финал"), url: "/studfinal" },
];

let activeButton = null;
let activeStageId = null;
const stagesSection = document.querySelector("#stages");

function createListButton(text, url) {
  const button = createButton({
    text,
    role: "primary",
    onClick: () => {
      window.location.href = localizeUrl(url);
    },
    fontSize: "1.25rem",
  });

  button.classList.add("participants-button");
  return button;
}

function renderStageListButtons(stageId) {
  const oldButtons = stagesSection.querySelector(".participants-buttons");
  if (oldButtons) {
    oldButtons.remove();
  }

  const buttonsWrap = document.createElement("div");
  buttonsWrap.className = "participants-buttons";

  if (stageId === "finals") {
    const studentButton = createListButton(
      t("student_team_list", "Список студенческих команд"),
      "/studfinal",
    );
    studentButton.classList.add("final-stage-list-button");
    buttonsWrap.appendChild(studentButton);

    const schoolButton = createListButton(
      t("school_team_list", "Список школьных команд"),
      "/junfinal",
    );
    schoolButton.classList.add("final-stage-list-button");
    buttonsWrap.appendChild(schoolButton);
  } else {
    const activeStage = stages.find((s) => s.id === stageId);
    if (activeStage) {
      buttonsWrap.appendChild(createListButton(t("team_list", "Список участников"), activeStage.url));
    }
  }

  stagesSection.appendChild(buttonsWrap);
}

stages.forEach((stage) => {
  const button = createButton({
    text: stage.label,
    role: "primary",
    onClick: () => {
      if (activeButton) {
        activeButton.classList.remove("button-clicked");
      }

      button.classList.add("button-clicked");
      activeButton = button;
      activeStageId = stage.id;

      document.querySelectorAll("#stages > div").forEach((div) => {
        div.style.display = "none";
      });
      document.getElementById(stage.id).style.display = "flex";
      renderStageListButtons(stage.id);
    },
    fontSize: "1.25rem",
  });

  const li = document.createElement("li");
  li.appendChild(button);
  stagesNav.appendChild(li);
});

const firstButton = stagesNav.querySelector("button");
if (firstButton) {
  firstButton.classList.add("button-clicked");
  activeButton = firstButton;
  activeStageId = "quaterfinals";
  document.getElementById("quaterfinals").style.display = "flex";
  document.getElementById("semifinals").style.display = "none";
  document.getElementById("finals").style.display = "none";
  renderStageListButtons(activeStageId);
}
