const headerNav = document.querySelector('.header__nav');
const headerButton = document.querySelector('.header__toggle');
const navItems = document.querySelectorAll('.header__nav-item');
const navItemsWithSublist = document.querySelectorAll('.header__nav-item--sublist');
const pageBody = document.querySelector('.page-body');
const navSublistItems = document.querySelectorAll('.header__nav-sublist-item');

const switchMenu = () => {
  headerButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    headerNav.classList.toggle('header__nav--opened');
    headerButton.classList.toggle('header__toggle--opened');
    pageBody.classList.toggle('page-body--window-opened');
    pageBody.classList.toggle('overlay');
  });
};

const closeMenu = () => {
  headerNav.classList.remove('header__nav--opened');
  headerButton.classList.remove('header__toggle--opened');
  pageBody.classList.remove('page-body--window-opened');
  pageBody.classList.remove('overlay');
};

const closeMenuOnItemClick = () => {
  navItems.forEach((navItem) => {
    if (!navItem.classList.contains('header__nav-item--sublist')) {
      navItem.addEventListener('click', () => {
        closeMenu();
      });
    }
  });
};

const closeMenuOnSublistItemClick = () => {
  navSublistItems.forEach((sublistItem) => {
    sublistItem.addEventListener('click', () => {
      closeMenu();
    });
  });
};

const closeMenuOnPageClick = () => {
  document.body.addEventListener('click', (evt) => {
    if (evt.target.closest('.header__nav') === null) {
      closeMenu();
    } else {
      closeMenuOnItemClick();
      closeMenuOnSublistItemClick();
    }
  });
};

const openSublist = () => {
  navItemsWithSublist.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('header__nav-item--sublist-opened');
      const sublist = item.querySelector('.header__nav-sublist');
      sublist.classList.toggle('header__nav-sublist--opened');
    });
  });
};

const initMenu = () => {
  switchMenu();
  closeMenuOnPageClick();
  openSublist();
};

export { initMenu };
