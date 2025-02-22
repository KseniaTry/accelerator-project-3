const REGEX_PHONE = /^[+]?[0-9\s\-()]*$/;
const REGEX_TEXT = /^[А-Яа-яёA-Za-z]*$/;

// очистка формы при возвращении назад после успешной отправки
const resetForm = (form) => {
  window.addEventListener('unload', () => {
    form.reset();
  });
};

// валидация поля "имя"
const validateName = (nameInput) => {
  nameInput.addEventListener('input', () => {
    // проверка соответствия введенного значения регулярному выражению
    if (!REGEX_TEXT.test(nameInput.value)) {
      nameInput.setCustomValidity('Имя может содержать только буквы');
    } else {
      nameInput.setCustomValidity('');
    }
  });
};

// валидация поля "телефон"
const validatePhone = (phoneInput) => {
  phoneInput.addEventListener('input', (evt) => {
    const phoneValue = evt.target.value;

    // очистка поля, если введены только буквы
    if (REGEX_TEXT.test(phoneValue)) {
      phoneInput.value = '';
      return;
    }

    // применение шаблона +7 если введены иные первые две цифры
    if (phoneValue.substr(0, 2) !== '+7') {
      phoneInput.value = phoneValue.replace(/^./, '+7');
      return;
    };

    // проверка соответствия введенного значения регулярному выражению
    if (!REGEX_PHONE.test(phoneValue)) {
      phoneInput.setCustomValidity('Номер телефона может содержать только цифры, знаки +,(,),-. Длина от 9 до 25 символов');
    } else {
      phoneInput.setCustomValidity('');
    };
  });
}

const validateCity = (cityInput) => {
  cityInput.addEventListener('input', (evt) => {
    const selectValue = evt.target.value;
    if (selectValue.value == '') {
      select.setCustomValidity('Выберите значение из списка');
    } else {
      select.setCustomValidity('');
    }
  })
}

const validateForm = (nameInput, phoneInput, cityInput) => {
  validateName(nameInput);
  validatePhone(phoneInput);
  validateCity(cityInput);
}

export { resetForm, validateForm };
