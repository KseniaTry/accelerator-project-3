import { createCustomSelect } from "./custom-select";
import { resetForm, validateForm } from "./form-validation";

// кастомный селект главной формы + валидация
const customSelectWrapper = document.querySelector('.form__custom-select-wrapper');
const cityInput = document.getElementById('city');
const customSelect = document.querySelector('.form__custom-select');
const customSelectWrapperClass = '.form__custom-select-wrapper';
const mainForm = document.querySelector('.form__form');
const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('name');

const initMainFormSettings = () => {
  cityInput.addEventListener('keydown', evt => evt.preventDefault());
  createCustomSelect(cityInput, customSelectWrapper, customSelect, customSelectWrapperClass);
  resetForm(mainForm);
  validateForm(nameInput, phoneInput, cityInput);
}

export { initMainFormSettings };
