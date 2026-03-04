export function createButton({
  text,
  role = "primary",
  fontSize,
  width,
  onClick,
}) {
  const button = document.createElement("button");

  const classes = ["button", `button-${role}`];

  if (fontSize) {
    classes.push("custom-font");
    button.style.setProperty("--max-font-size", fontSize);
  }

  if (width) {
    classes.push("custom-width");
    button.style.setProperty("--max-width", width);
  }

  button.className = classes.join(" ");
  button.textContent = text;

  if (onClick) button.addEventListener("click", onClick);

  return button;
}
