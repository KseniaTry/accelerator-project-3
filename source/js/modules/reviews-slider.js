import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";
import 'swiper/css';

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
      spaceBetween: 10,
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

const initReviewsSlider = () => {
  reviewsSwiper.init();
}

export { initReviewsSlider };
