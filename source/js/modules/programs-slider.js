import Swiper from 'swiper';
import { Navigation, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import { DESKTOP_WIDTH_MIN } from '../const';

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
      });
    }
  }
};

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
      allowTouchMove: true,
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

const initProgramsSlider = () => {
  cloneSlidesOnDesktop();
  programsSwiper.init();
};

export { initProgramsSlider };
