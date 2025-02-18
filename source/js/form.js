const mainForm = document.querySelector('.form__form');
const phoneInput = document.getElementById('phone');
const nameInput = document.getElementById('name');
const inputs = document.querySelectorAll('.form__input');

const REGEX_PHONE = /^[+]?[0-9\s\-()]*$/;
const REGEX_TEXT = /^[А-Яа-яёA-Za-z]*$/;

// очистка формы при возвращении назад после успешной отправки
const resetForm = (form) => {
  window.addEventListener('unload', () => {
    form.reset();
  });
};

resetForm(mainForm);

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

validateName(nameInput);
validatePhone(phoneInput);
