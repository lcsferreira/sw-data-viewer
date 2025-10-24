export const capitalizeFirstLetter = (string: string) => {
  if (string === "n/a") return "N/A";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
