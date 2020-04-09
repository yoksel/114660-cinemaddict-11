const templateElem = document.createElement(`template`);

export const createElement = (str) => {
  templateElem.innerHTML = str;
  return templateElem.content.firstElementChild;
};
