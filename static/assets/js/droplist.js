export function createDroplist({ placeholder, data = [], fontSize, width }) {
  const droplist = document.createElement("select");

  const classes = ["droplist"];

  if (fontSize) {
    classes.push("custom-font");
    droplist.style.setProperty("--max-font-size", fontSize);
  }

  if (width) {
    classes.push("custom-width");
    droplist.style.setProperty("--max-width", width);
  }

  droplist.className = classes.join(" ");

  if (placeholder) {
    const stdOption = document.createElement("option");
    stdOption.textContent = placeholder;
    stdOption.value = "";
    stdOption.disabled = true;
    stdOption.selected = true;
    droplist.appendChild(stdOption);
  }

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    droplist.appendChild(option);
  });

  return droplist;
}
