import { createCustomSelect } from './custom-select';
import { resetForm, validateForm } from './form-validation';

// кастомный селект модального окна + валидация
const modalCustomSelectWrapper = document.querySelector('.modal__custom-select-wrapper');
const modalCityInput = document.getElementById('city-modal');
const modalCustomSelect = document.querySelector('.modal__custom-select');
const modalCustomSelectWrapperClass = '.modal__custom-select-wrapper';
const modalForm = document.querySelector('.modal__form');
const modalPhoneInput = document.getElementById('phone-modal');
const modalNameInput = document.getElementById('name-modal');

const initModalFormSettings = () => {
  modalCityInput.addEventListener('keydown', (evt) => evt.preventDefault());
  createCustomSelect(modalCityInput, modalCustomSelectWrapper, modalCustomSelect, modalCustomSelectWrapperClass);
  resetForm(modalForm);
  validateForm(modalNameInput, modalPhoneInput, modalCityInput);
};

export { initModalFormSettings };
