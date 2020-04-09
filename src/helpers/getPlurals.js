export const getPlurals = (count, variants) => {
  if (count < 2) {
    return variants[0];
  }

  return variants[1];
};
