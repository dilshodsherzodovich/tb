export const convertCelciumFromFarad = (fahrenheit) => {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return Math.floor(celsius * 10) / 10;
};
