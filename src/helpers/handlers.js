const getControl = (event, selector) => {
  return event.target.closest(selector);
};

export const getHandlerToggleClass = (selector, className) => {
  return (event) => {
    const control = getControl(event, selector);

    if (!control) {
      return;
    }

    control.classList.toggle(className);
  };
};

export const getHandlerWithProp = (selector, handler) => {
  return (event) => {
    const control = getControl(event, selector);

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

export const getHandlerWithValue = (selector, handler) => {
  return (event) => {
    const control = getControl(event, selector);

    if (!control) {
      return;
    }

    if (control.value === undefined) {
      return;
    }

    handler(control.value);
  };
};
