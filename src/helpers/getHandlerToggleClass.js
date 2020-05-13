export const getHandlerToggleClass = (selector, className) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    control.classList.toggle(className);
  };
};
