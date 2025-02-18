import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import { MOBILE_WIDTH_MAX } from "../const";

// hero swiper
const heroSlider = document.querySelector('.hero__swiper');
const heroPagination = document.querySelector('.hero__pagination.swiper-pagination-bullets.swiper-pagination-horizontal');

const heroSwiper = new Swiper(heroSlider, {
  slideClass: 'hero__slide',
  modules: [Pagination],
  slidesPerView: 'auto',
  loop: true,
  centeredSlides: true,
  allowTouchMove: true,
  pagination: {
    el: '.hero__pagination',
    type: 'bullets',
    bulletClass: 'swiper-pagination-bullet hero__bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active hero__bullet--active',
  },
  breakpoints: {
    1440: {
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

// пересчет размера текстового блока активного слайда при переключении слайда
const initHeroSlider = () => {
  heroSwiper.init();

  heroSwiper.on('slideChange', () => {
    let activeIndex = heroSwiper.realIndex;
    const heroActiveSlide = document.querySelector(`[data-swiper-slide-index="${activeIndex}"]`)
    const textContentHeight = getAllTextContentHeight(heroActiveSlide);

    if (window.innerWidth <= MOBILE_WIDTH_MAX) {
      heroPagination.style.bottom = `${textContentHeight + 19}px`;
    }

    if (window.innerWidth > MOBILE_WIDTH_MAX) {
      heroPagination.style.bottom = `${textContentHeight + 35}px`;
    }
  });
}

export { initHeroSlider };
