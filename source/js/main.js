import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';

// меню
const headerNav = document.querySelector('.header__nav');
const headerButton = document.querySelector('.header__toggle');
const navItems = document.querySelectorAll('.header__nav-item');
const navSublistItems = document.querySelectorAll('.header__nav-item--sublist');
const MOBILE_WIDTH_MAX = 767;
const DESKTOP_WIDTH_MIN = 1440;

const switchMenu = () => {
  headerButton.addEventListener('click', (evt) => {
    evt.stopPropagation();
    headerNav.classList.toggle('header__nav--opened');
    headerButton.classList.toggle('header__toggle--opened');
  });
};

const closeMenuOnItemClick = () => {
  navItems.forEach((navItem) => {
    if (!navItem.classList.contains('header__nav-item--sublist')) {
      navItem.addEventListener('click', () => {
        headerNav.classList.remove('header__nav--opened');
        headerButton.classList.remove('header__toggle--opened');
      });
    };
  });
};

const closeMenuOnPageClick = () => {
  document.body.addEventListener("click", function (event) {
    if (event.target.closest('.header__nav') == null) {
      headerNav.classList.remove('header__nav--opened');
      headerButton.classList.remove('header__toggle--opened');
    } else {
      closeMenuOnItemClick();
    }
  });
};

const openSublist = () => {
  navSublistItems.forEach((sublistItem) => {
    sublistItem.addEventListener('click', () => {
      sublistItem.classList.toggle('header__nav-item--sublist-opened');
      const sublist = sublistItem.querySelector('.header__nav-sublist');
      sublist.classList.toggle('header__nav-sublist--opened');
    })
  })
}

switchMenu();
closeMenuOnPageClick();
openSublist();

// hero swiper
const heroSlider = document.querySelector('.hero__swiper');

const heroSwiper = new Swiper(heroSlider, {
  slideClass: 'hero__slide',
  modules: [Pagination],
  slidesPerView: 'auto',
  loop: true,
  allowTouchMove: true,
  pagination: {
    el: '.hero__pagination',
    type: 'bullets',
    bulletClass: 'swiper-pagination-bullet hero__bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active hero__bullet--active',
  },
  breakpoints: {
    1440: {
      allowTouchMove: false,
      pagination: {
        clickable: true,
      }
    },
  }
});

heroSwiper.init();

const heroPagination = document.querySelector('.hero__pagination.swiper-pagination-bullets.swiper-pagination-horizontal');

// расчет высоты тегов <p></p> на случай добавления еще таких же блоков
const getSlideTextSummaryHeight = (activeSlide) => {
  const heroSlideTexts = activeSlide.querySelectorAll('p');
  var slideTextSummaryHeight = 0;

  heroSlideTexts.forEach((slideText) => {
    slideTextSummaryHeight += slideText.clientHeight;
  })

  return slideTextSummaryHeight;
}

// расчет высоты текстового блока слайда
const getAllTextContentHeight = (activeSlide) => {
  const heroSlideTitle = activeSlide.querySelector('h2');
  const heroDetailsButton = activeSlide.querySelector('.hero__button-wrapper');

  const textSummatyHeight = getSlideTextSummaryHeight(activeSlide);
  const allTextContentHeight = heroSlideTitle.clientHeight + textSummatyHeight + heroDetailsButton.clientHeight;
  return allTextContentHeight;
}

// пересчет размера текстового блока активного слайда при переключении слайда
heroSwiper.on('slideChange', function () {
  let activeIndex = heroSwiper.realIndex;
  const heroActiveSlide = document.querySelector(`[data-swiper-slide-index="${activeIndex}"]`)
  const textContentHeight = getAllTextContentHeight(heroActiveSlide);

  if (window.innerWidth <= MOBILE_WIDTH_MAX) {
  heroPagination.style.bottom = `${textContentHeight + 19}px`;
  }

  if (window.innerWidth > MOBILE_WIDTH_MAX && window.innerWidth < DESKTOP_WIDTH_MIN) {
    heroPagination.style.bottom = `${textContentHeight + 35}px`;
  }

});

