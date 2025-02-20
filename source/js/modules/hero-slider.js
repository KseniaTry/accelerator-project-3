import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import { DESKTOP_WIDTH_MIN, MOBILE_WIDTH_MAX } from "../const";

const heroSlider = document.querySelector('.hero__swiper');

const heroSwiper = new Swiper(heroSlider, {
  slideClass: 'hero__slide',
  modules: [Pagination],
  slidesPerView: 'auto',
  loop: true,
  autoHeight: true,
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

// пересчет расположения пагинации left
const updateLeftPosition = () => {
  const heroPagination = document.querySelector('.hero__pagination.swiper-pagination-bullets.swiper-pagination-horizontal');

  if (window.innerWidth <= MOBILE_WIDTH_MAX) {
    heroPagination.style.left = `${Math.floor(((window.innerWidth - 320) / 2) + 15)}px`;
  }

  if (window.innerWidth > MOBILE_WIDTH_MAX && window.innerWidth < DESKTOP_WIDTH_MIN) {
    heroPagination.style.left = `${Math.floor(((window.innerWidth - 768) / 2) + 45)}px`;
  }

  if (window.innerWidth >= DESKTOP_WIDTH_MIN) {
    heroPagination.style.left = `${Math.floor(((window.innerWidth - 1440) / 2) + 100)}px`;
  }
}

// пересчет размера текстового блока активного слайда при переключении слайда
const updateBottomPosition = () => {
  let activeIndex = heroSwiper.realIndex;
  const heroActiveSlide = document.querySelector(`[data-swiper-slide-index="${activeIndex}"]`)
  const textContentHeight = getAllTextContentHeight(heroActiveSlide);
  const heroPagination = document.querySelector('.hero__pagination.swiper-pagination-bullets.swiper-pagination-horizontal');

  if (window.innerWidth <= MOBILE_WIDTH_MAX) {
    heroPagination.style.bottom = `${textContentHeight + 19}px`;
  }

  if (window.innerWidth > MOBILE_WIDTH_MAX) {
    heroPagination.style.bottom = `${textContentHeight + 35}px`;
  }
};

const initHeroSlider = () => {
  heroSwiper.init();
  updateBottomPosition();
  updateLeftPosition();

  heroSwiper.on('slideChange', () => {
    updateBottomPosition();
  });

  window.addEventListener('resize', () => {
    updateLeftPosition();
  });
}

export { initHeroSlider };
