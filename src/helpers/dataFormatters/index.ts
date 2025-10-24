export const formatHeight = (height: string) => {
  if (height === "unknown") return "Unknown";
  return `${height} cm`;
};

export const formatMass = (mass: string) => {
  if (mass === "unknown") return "Unknown";
  return `${mass} kg`;
};

export const formatBirthYear = (birthYear: string) => {
  if (birthYear === "unknown") return "Unknown";
  return birthYear.replace("BBY", " BBY");
};
