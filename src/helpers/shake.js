import {ClassName} from '../constants';

const getAnimationEndHandler = (container) => {
  const handler = () => {
    container.classList.remove(ClassName.SHAKE);
    container.removeEventListener(`animationend`, handler);
  };

  return handler;
};

export const shake = (container) => {
  const handler = getAnimationEndHandler(container);

  container.classList.add(ClassName.SHAKE);
  container.addEventListener(`animationend`, handler);
};
