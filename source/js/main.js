import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Grid } from "swiper/modules";
import 'swiper/css';
import { initMenu } from "./menu";

const MOBILE_WIDTH_MAX = 767;
const DESKTOP_WIDTH_MIN = 1440;

initMenu();

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

// news swiper
const newsSlider = document.querySelector('.news__swiper');

const newsSwiper = new Swiper(newsSlider, {
  slideClass: 'news__slide',
  hashNavigation: true,
  direction: 'horizontal',
  modules: [Navigation, Pagination, Grid],
  allowTouchMove: true,
  pagination: {
    el: '.news__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<button class="news__pagination-bullet ' + className + '" data-index=' + (index + 1) + '>' + (index + 1) + '</button>';
    },
  },
  navigation: {
    prevEl: '.news__button--prev',
    nextEl: '.news__button--next',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 61,
      grid: {
        rows: 2,
      },
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
      },
    },
    1440: {
      slidesPerView: 'auto',
      spaceBetween: 32,
    },
  },
  // on: {
  //   init: function () {
  //     hideBulletsOnInit();
  //   },
  // },
});

newsSwiper.init();

// переключение табов
const newsNavList = document.querySelector('.news__nav-list');
const newsSlides = document.querySelectorAll('.news__slide');

newsNavList.addEventListener('click', evt => {
  if (evt.target.tagName !== 'A') return;
  const nextActiveItem = evt.target.closest('.news__nav-item');
  const currentActiveItem = document.querySelector('.news__nav-item--active');
  currentActiveItem.classList.remove('news__nav-item--active');
  nextActiveItem.classList.add('news__nav-item--active');
})

// изменение раскладки swiper grid на tablet
if (window.innerWidth >= 768 && window.innerWidth < 1440) {
  newsSlides.forEach((slide, index) => {
    switch (index) {
      case 0:
        slide.style.order = 1;
        break;
      case 1:
        slide.style.order = 3;
        slide.style.marginTop = '0';
        break;
      case 2:
        slide.style.order = 2;
        slide.style.marginTop = '30px';
        break;
      case 3:
        slide.style.order = 4;
        slide.style.marginRight = '30px';
        break;
      default:
        slide.style.order = index + 1;
        break;
    }
  });
};

// кастомная пагинация
const paginationBullets = document.querySelectorAll('.news__pagination-bullet');
const VISIBLE_BULLETS_COUNT = 4;

const hideBulletsOnInit = () => {
  for (let i = VISIBLE_BULLETS_COUNT + 1; i <= paginationBullets.length; i++) {
    const paginationBullet = document.querySelector(`[data-index="${i}"]`);
    paginationBullet.style.display = 'none';
  }
};

hideBulletsOnInit();

const createIndexArrow = (minIndex, maxIndex) => {
  var indexArrow = [];

  for (var i = minIndex; i <= maxIndex; i++) {
    indexArrow.push(i);
  }

  return indexArrow;
}

const createVisibleBulletsArray = (activeBulletIndex) => {
  var visibleBullets = [];

  if (activeBulletIndex < VISIBLE_BULLETS_COUNT) {
    for (let i = 1; i <= VISIBLE_BULLETS_COUNT; i++) {
      visibleBullets.push(i);
    }
  } else if (activeBulletIndex === paginationBullets.length) {
    for (let i = activeBulletIndex - 3; i <= paginationBullets.length; i++) {
      visibleBullets.push(i);
    }
  } else {
    for (let i = activeBulletIndex - 2; i <= activeBulletIndex + 1; i++) {
      visibleBullets.push(i);
    }
  }

  return visibleBullets;
}

const createHiddenBulletsArray = (visibleBullets, allBullets) => {
  const filteredBullets = allBullets.filter((bullet) => !visibleBullets.includes(bullet));
  return filteredBullets;
}

const modifyPagination = () => {
  let activeBulletIndex = newsSwiper.realIndex + 1;
  const visibleBullets = createVisibleBulletsArray(activeBulletIndex);
  const allBullets = createIndexArrow(1, paginationBullets.length);
  const hiddenBullets = createHiddenBulletsArray(visibleBullets, allBullets);

  const resetBulletSettings = () => {
    visibleBullets.forEach((bullet) => {
      const paginationBullet = document.querySelector(`[data-index="${bullet}"]`);
      paginationBullet.style.display = 'block';
    })
  }

  resetBulletSettings();

  const hideBullets = () => {
    hiddenBullets.forEach((bullet) => {
      const paginationBullet = document.querySelector(`[data-index="${bullet}"]`);
      paginationBullet.style.display = 'none';
    });
  }

  hideBullets();
};

newsSwiper.on('slideChange', modifyPagination);
window.addEventListener('resize', hideBulletsOnInit);
window.addEventListener('resize', modifyPagination);

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
