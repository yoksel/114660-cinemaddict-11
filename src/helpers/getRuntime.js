export const getRuntime = ({hours, mins}) => {
  hours = hours > 0 ? `${hours}h` : ``;
  mins = mins > 0 ? `${mins}m` : ``;

  if (hours && mins) {
    hours += ` `;
  }
  return hours + mins;
};
