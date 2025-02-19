// модальное окно
const aboutButton = document.querySelector('.about__details');
const modal = document.querySelector('.modal__wrapper');
const closeModalButton = document.querySelector('.modal__close');
const pageBody = document.querySelector('.page-body');

const openModal = () => {
  aboutButton.addEventListener('click', () => {
    modal.classList.remove('modal__wrapper--closed');
    window.scrollTo(0, 0);
    pageBody.classList.add('page-body--window-opened');
    pageBody.classList.add('overlay');
  });
};

const closeModal = () => {
  closeModalButton.addEventListener('click', () => {
    modal.classList.add('modal__wrapper--closed');
    pageBody.classList.remove('page-body--window-opened');
    pageBody.classList.remove('overlay');
  });
};

const closeModalOnPageClick = () => {
  document.body.addEventListener('click', (evt) => {
    if (evt.target.closest('.modal__form') == null) {
      closeModal();
    }
  });
};

const initModal = () => {
  openModal();
  closeModal();
  closeModalOnPageClick();
}

export { initModal };

