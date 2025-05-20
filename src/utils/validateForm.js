export const validateForm = ({ firstName, lastName, email, password }) => {
  const errors = {};
  if (firstName && firstName.length < 5) {
    errors.firstName = "Повинно бути більше 5 літер";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Невірний формат email";
  }
  if (password && password.length < 5) {
    errors.password = "Повинно бути більше 5 літер";
  }
  if (lastName && lastName.length < 5) {
    errors.lastName = "Повинно бути більше 5 літер";
  }
  return errors;
};
