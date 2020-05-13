export const getClass = ({base, mods}) => {
  return mods.reduce((prev, mod) => {
    return `${prev} ${base}--${mod}`;
  }, base);
};
