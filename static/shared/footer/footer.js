export function createFooter(options = {}) {
  const { socialIcons = [] } = options;

  const footer = document.createElement("footer");
  footer.className = "footer";

  const footerContent = document.createElement("div");
  footerContent.className = "footer_content";

  const footerImg = document.createElement("div");
  footerImg.className = "footer_img";

  socialIcons.forEach((icon) => {
    const link = document.createElement("a");
    link.href = icon.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const img = document.createElement("img");
    img.src = icon.src;
    img.alt = icon.alt;

    link.appendChild(img);
    footerImg.appendChild(link);
  });

  footerContent.appendChild(footerImg);
  footer.appendChild(footerContent);

  return footer;
}
