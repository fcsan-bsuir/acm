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
}

const stagesSection = document.querySelector("#stages");
const participantsButton = createButton({
  text: t("team_list", "Список участников"),
  role: "primary",
  onClick: () => {
    const activeStage = stages.find(s => s.id === activeStageId);
    if (activeStage) {
      window.location.href = localizeUrl(activeStage.url);
    }
  },
  fontSize: "1.25rem",
});

participantsButton.classList.add("participants-button");

stagesSection.appendChild(participantsButton);
