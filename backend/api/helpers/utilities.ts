export const generateUniqueRandomDigits = (length: number): string => {
  let result = "";
  const digits = "0123456789";

  const timestamp = Date.now().toString();

  result += timestamp.slice(-length); 
  for (let i = result.length; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return result;
};
