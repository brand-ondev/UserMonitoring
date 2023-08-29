import { isValid,parseISO } from 'date-fns';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

const isValidDate = (dateString: string): boolean => {
  const date = parseISO(dateString); // Convierte la cadena en un objeto de fecha
  return isValid(date);
}

export { isValidEmail, isValidDate };