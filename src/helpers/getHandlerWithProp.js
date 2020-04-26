export const getHandlerWithProp = (selector, handler) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    const {prop} = control.dataset;

    if (!prop) {
      return;
    }

    handler(prop);
  };
};
