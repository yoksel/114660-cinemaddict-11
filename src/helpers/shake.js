import {ClassName} from '../constants';

export const shake = (container) => {
  const handler = () => {
    container.classList.remove(ClassName.SHAKE);
    container.removeEventListener(`animationend`, handler);
  };

  container.classList.add(ClassName.SHAKE);
  container.addEventListener(`animationend`, handler);
};
