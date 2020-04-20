export const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};
