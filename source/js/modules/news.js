import Swiper from "swiper";
import { Navigation, Pagination, Grid } from "swiper/modules";
import 'swiper/css';
import { MOBILE_WIDTH_MAX, DESKTOP_WIDTH_MIN } from "../const";

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
      slidesPerGroup: 2,
      spaceBetween: 30,
      grid: {
        rows: 2,
      },
    },
    1440: {
      slidesPerView: 'auto',
      slidesPerGroup: 3,
      spaceBetween: 32,
    },
  },
});

// переключение табов
const newsNavList = document.querySelector('.news__nav-list');
const newsSlides = document.querySelectorAll('.news__slide');

const switchNewsTabs = () => {
  newsNavList.addEventListener('click', (evt) => {
    if (evt.target.tagName !== 'A') return;
    const nextActiveItem = evt.target.closest('.news__nav-item');
    const currentActiveItem = document.querySelector('.news__nav-item--active');
    currentActiveItem.classList.remove('news__nav-item--active');
    nextActiveItem.classList.add('news__nav-item--active');
  })
}

// изменение раскладки swiper grid на tablet
const changeSlidesPosition = () => {
  if (window.innerWidth > MOBILE_WIDTH_MAX && window.innerWidth < DESKTOP_WIDTH_MIN) {
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
}

// кастомная пагинация
const paginationBullets = document.querySelectorAll('.news__pagination-bullet');
const VISIBLE_BULLETS_COUNT = 4;

// изначально сразу скрываем буллеты, кроме четырех:
const hideBulletsOnInit = () => {
  for (let i = VISIBLE_BULLETS_COUNT + 1; i <= paginationBullets.length; i++) {
    const paginationBullet = document.querySelector(`[data-index="${i}"]`);
    paginationBullet.style.display = 'none';
  }
};

const createIndexArrow = (minIndex, maxIndex) => {
  var indexArrow = [];

  for (var i = minIndex; i <= maxIndex; i++) {
    indexArrow.push(i);
  }

  return indexArrow;
}

const createVisibleBulletsArray = (activeBulletIndex) => {
  let visibleBullets = [];

  if (activeBulletIndex < VISIBLE_BULLETS_COUNT) {
    visibleBullets = createIndexArrow(1, VISIBLE_BULLETS_COUNT);
  } else if (activeBulletIndex === paginationBullets.length) {
    visibleBullets = createIndexArrow(activeBulletIndex - 3, paginationBullets.length);
  } else {
    visibleBullets = createIndexArrow(activeBulletIndex - 2, activeBulletIndex + 1);
  }

  return visibleBullets;
}

const createHiddenBulletsArray = (visibleBullets, allBullets) => {
  const filteredBullets = allBullets.filter((bullet) => !visibleBullets.includes(bullet));
  return filteredBullets;
}

// сбрасываем скрытие буллетов:
const resetBulletSettings = (visibleBullets) => {
  visibleBullets.forEach((bullet) => {
    const paginationBullet = document.querySelector(`[data-index="${bullet}"]`);
    paginationBullet.style.display = 'block';
  })
}

// скрываем буллеты, которые нужно скрыть исходя из того, какой буллет активный:
const hideBullets = (hiddenBullets) => {
  hiddenBullets.forEach((bullet) => {
    const paginationBullet = document.querySelector(`[data-index="${bullet}"]`);
    paginationBullet.style.display = 'none';
  });
}

const modifyPagination = () => {
  const activeBullet = document.querySelector('.news__pagination-bullet.swiper-pagination-bullet-active');
  const activeBulletIndex = parseInt(activeBullet.dataset.index);
  const visibleBullets = createVisibleBulletsArray(activeBulletIndex);
  const allBullets = createIndexArrow(1, paginationBullets.length);
  const hiddenBullets = createHiddenBulletsArray(visibleBullets, allBullets);

  resetBulletSettings(visibleBullets);
  hideBullets(hiddenBullets);
};

const initNewsSwiper = () => {
  newsSwiper.init();
  changeSlidesPosition();
  hideBulletsOnInit();
  newsSwiper.on('slideChange', modifyPagination);
  window.addEventListener('resize', hideBulletsOnInit);
  window.addEventListener('resize', modifyPagination);
}

export { switchNewsTabs, initNewsSwiper }
