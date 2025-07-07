export const validateForm = (fields) => {
  const errors = {};
  const { firstName = "", lastName = "", email = "", password = "" } = fields;

  const isEmpty = (value) => !value || value.trim() === "";

  if ("firstName" in fields && isEmpty(firstName)) {
    errors.firstName = "Поле Ім'я обов'язкове";
  } else if ("firstName" in fields && firstName.length < 2) {
    errors.firstName = "Повинно бути більше 5 літер";
  }

  if ("lastName" in fields && isEmpty(lastName)) {
    errors.lastName = "Поле Прізвище обов'язкове";
  } else if ("lastName" in fields && lastName.length < 2) {
    errors.lastName = "Повинно бути більше 5 літер";
  }

  if ("email" in fields && isEmpty(email)) {
    errors.email = "Поле Email обов'язкове";
  } else if ("email" in fields && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Невірний формат email";
  }

  if ("password" in fields && isEmpty(password)) {
    errors.password = "Поле Пароль обов'язкове";
  } else if ("password" in fields && password.length < 5) {
    errors.password = "Повинно бути більше 5 літер";
  }

  return errors;
};
