export const replaceElement = (oldComponent, newComponent) => {
  if (!oldComponent && !newComponent) {
    return;
  }

  oldComponent.getElement().replaceWith(newComponent.getElement());
};
