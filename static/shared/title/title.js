export function createTitle({ text, level = "head" }) {
  const titleTag = level === "head" ? "h1" : "h2";

  const title = document.createElement(titleTag);

  title.className = `title title-${level}`;

  title.textContent = text;

  return title;
}
