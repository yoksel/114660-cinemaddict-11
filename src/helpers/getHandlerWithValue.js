export const getHandlerWithValue = (selector, handler) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    if (control.value === undefined) {
      return;
    }

    handler(control.value);
  };
};
