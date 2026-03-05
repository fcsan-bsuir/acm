import { createButton } from "../button.js";

const stagesNav = document.querySelector("#stages nav ul");

const stages = [
  { id: "quaterfinals", label: "Четвертьфинал", url: "/teams" },
  { id: "semifinals", label: "Полуфинал", url: "/semifinal" },
  { id: "finals", label: "Финал", url: "/studfinal" },
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
  text: "Список участников",
  role: "primary",
  onClick: () => {
    const activeStage = stages.find(s => s.id === activeStageId);
    if (activeStage) {
      window.location.href = activeStage.url;
    }
  },
  fontSize: "1.25rem",
});

participantsButton.classList.add("participants-button");

stagesSection.appendChild(participantsButton);
