const handleComponent = (target, component) => {
  if (component instanceof HTMLElement) {
    target.append(component);

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
