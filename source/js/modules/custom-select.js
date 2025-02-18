// кастомный селект
const openCustomSelect = (cityInput, customSelectWrapper, customSelect) => {
  cityInput.addEventListener('click', () => {
    customSelectWrapper.classList.toggle('custom-select--opened');
    customSelect.classList.toggle('custom-select__select--opened');
  })
}

const closeCustomSelect = (customSelectWrapper, customSelect) => {
  customSelectWrapper.classList.remove('custom-select--opened');
  customSelect.classList.remove('custom-select__select--opened');
}

const closeCustomSelectOnPageClick = (customSelectWrapper, customSelect, className) => {
  document.body.addEventListener('click', (evt) => {
    if (evt.target.closest(className) == null) {
      customSelectWrapper.classList.remove('custom-select--opened');
      customSelect.classList.remove('custom-select__select--opened');
    }
  });
};

const createCustomSelect = (cityInput, customSelectWrapper, customSelect, className) => {
  openCustomSelect(cityInput, customSelectWrapper, customSelect);
  closeCustomSelectOnPageClick(customSelectWrapper, customSelect, className);

  customSelect.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'DIV') return;
    cityInput.value = evt.target.textContent;
    closeCustomSelect(customSelectWrapper, customSelect);
    closeCustomSelectOnPageClick(customSelectWrapper, customSelect, className);
  })
}

export { createCustomSelect };
