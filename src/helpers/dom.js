const templateElem = document.createElement(`template`);

export const createElement = (str) => {
  templateElem.innerHTML = str;
  return templateElem.content.firstElementChild;
};

export const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replaceElement = (oldComponent, newComponent) => {
  if (!oldComponent && !newComponent) {
    return;
  }

  oldComponent.getElement().replaceWith(newComponent.getElement());
};

const handleComponent = (target, component) => {
  if (!component) {
    return;
  }

  if (component instanceof HTMLElement) {
    target.append(component);

    return;
  }

  const element = component.getElement();

  if (!element) {
    return;
  }

  target.append(component.getElement());
};

export const renderElement = (target, component) => {
  if (!Array.isArray(component)) {
    handleComponent(target, component);

    return;
  }

  const items = component;

  for (const item of items) {
    handleComponent(target, item);
  }
};
