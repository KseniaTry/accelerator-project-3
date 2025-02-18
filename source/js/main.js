import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar} from "swiper/modules";
import 'swiper/css';
import { initMenu } from "./menu";
import { switchNewsTabs, initNewsSwiper } from "./news";
import "./form";
import { createCustomSelect } from "./custom-select";

const MOBILE_WIDTH_MAX = 767;
const DESKTOP_WIDTH_MIN = 1440;

// меню
initMenu();

// блок news
switchNewsTabs();
initNewsSwiper();

// кастомный селект главной формы
const customSelectWrapper = document.querySelector('.form__custom-select-wrapper');
const cityInput = document.getElementById('city');
const customSelect = document.querySelector('.form__custom-select');
const customSelectWrapperClass = '.form__custom-select-wrapper';

createCustomSelect(cityInput, customSelectWrapper, customSelect, customSelectWrapperClass);

// кастомный селект модального окна
const modalCustomSelectWrapper = document.querySelector('.modal__custom-select-wrapper');
const modalCityInput = document.getElementById('city-modal');
const modalCustomSelect = document.querySelector('.modal__custom-select');
const modalCustomSelectWrapperClass = '.modal__custom-select-wrapper';

createCustomSelect(modalCityInput, modalCustomSelectWrapper, modalCustomSelect, modalCustomSelectWrapperClass);

// hero swiper
const heroSlider = document.querySelector('.hero__swiper');

const heroSwiper = new Swiper(heroSlider, {
  slideClass: 'hero__slide',
  modules: [Pagination],
  slidesPerView: 'auto',
  autoHeight: true,
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

  if (window.innerWidth > MOBILE_WIDTH_MAX) {
    heroPagination.style.bottom = `${textContentHeight + 35}px`;
  }
});

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

openModal();

const closeModal = () => {
  closeModalButton.addEventListener('click', () => {
    modal.classList.add('modal__wrapper--closed');
    pageBody.classList.remove('page-body--window-opened');
    pageBody.classList.remove('overlay');
  });
};

closeModal();

// programs swiper
const programsSlider = document.querySelector('.programs__swiper');
const programsSwiperWrapper = document.querySelector('.programs__swiper-wrapper');
const programsSlides = document.querySelectorAll('.programs__slide');

// клонирование слайдов на десктопе
const cloneSlidesOnDesktop = () => {
  if (window.innerWidth >= DESKTOP_WIDTH_MIN) {
    if (programsSlides.length <= 4) {
      programsSlides.forEach((slide) => {
        slide.classList.remove('swiper-slide-active');
        slide.classList.remove('swiper-slide-next');
        const slideClone = slide.cloneNode(true);
        programsSwiperWrapper.appendChild(slideClone);
      })
    }
  }
}

cloneSlidesOnDesktop();

const programsSwiper = new Swiper(programsSlider, {
  slideClass: 'programs__slide',
  modules: [Navigation, Scrollbar],
  navigation: {
    prevEl: '.programs__button--prev',
    nextEl: '.programs__button--next',
    clickable: true,
  },
  scrollbar: {
    el: '.programs__scrollbar',
    draggable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      allowTouchMove: true, // возможность переключения тачем
      scrollbar: {
        enabled: false,
      },
    },
    768: {
      slidesPerView: 2.127,
      spaceBetween: 30,
      allowTouchMove: true,
      scrollbar: {
        dragSize: 'auto',
      },
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 32,
      allowTouchMove: false,
      scrollbar: {
        dragSize: 'auto',
      },
    },
  },
});

programsSwiper.init();

// Блок FAQ
const faqItems = document.querySelectorAll('.faq__accordion-item');

faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('faq__accordion-item--active');
  })
})

// блок REVIEWS
const reviewsSlider = document.querySelector('.reviews__swiper');

const reviewsSwiper = new Swiper(reviewsSlider, {
  slideClass: 'reviews__slide',
  modules: [Navigation, Scrollbar],
  navigation: {
    prevEl: '.reviews__button--prev',
    nextEl: '.reviews__button--next',
    clickable: true,
  },
  scrollbar: {
    el: '.reviews__scrollbar',
    draggable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      allowTouchMove: true,
      scrollbar: {
        enabled: false,
      },
    },
    768: {
      slidesPerView: 1.276,
      spaceBetween: 30,
      allowTouchMove: true,
      scrollbar: {
        dragSize: 326,
      },
    },
    1440: {
      slidesPerView: 2,
      spaceBetween: 32,
      allowTouchMove: false,
      scrollbar: {
        dragSize: 394,
      },
    },
  },
});

reviewsSwiper.init();
