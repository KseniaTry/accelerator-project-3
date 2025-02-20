const aboutButton = document.querySelector('.about__details');
const modal = document.querySelector('.modal__wrapper');
const closeModalButton = document.querySelector('.modal__close');
const pageBody = document.querySelector('.page-body');

const openModal = () => {
  aboutButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    modal.classList.remove('modal__wrapper--closed');
    window.scrollTo(0, 0);
    pageBody.classList.add('page-body--window-opened');
    pageBody.classList.add('overlay');
  });
};

const closeModal = () => {
  closeModalButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    modal.classList.add('modal__wrapper--closed');
    pageBody.classList.remove('page-body--window-opened');
    pageBody.classList.remove('overlay');
  });
};

const closeModalOnPageClick = () => {
  document.body.addEventListener('click', (evt) => {
    evt.stopImmediatePropagation();
    if (evt.target.closest('.modal__form') == null) {
      modal.classList.add('modal__wrapper--closed');
    } else {
      pageBody.classList.add('page-body--window-opened');
      pageBody.classList.add('overlay');
    };
  });
};

const initModal = () => {
  openModal();
  closeModal();
  closeModalOnPageClick();
}

export { initModal };

