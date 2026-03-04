export function createInput({ placeholder, type = "text", fontSize, width }) {
  const input = document.createElement("input");

  const classes = ["input"];

  if (fontSize) {
    classes.push("custom-font");
    input.style.setProperty("--max-font-size", fontSize);
  }

  if (width) {
    classes.push("custom-width");
    input.style.setProperty("--max-width", width);
  }

  input.className = classes.join(" ");
  input.type = type;

  if (placeholder) input.placeholder = placeholder;

  return input;
}
