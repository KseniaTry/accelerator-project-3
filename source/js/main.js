import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Grid } from "swiper/modules";
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


// programs swiper
const programsSlider = document.querySelector('.programs__swiper');
const programsButtons = document.querySelectorAll('.programs__button');
const programsScrollbar = document.querySelector('.programs__scrollbar');

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
        dragSize: 326,
      },
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 32,
      allowTouchMove: false,
      scrollbar: {
        dragSize: 394,
      },
    },
  },
});

programsSwiper.init();

if (window.innerWidth >= DESKTOP_WIDTH_MIN) {
  programsButtons.forEach((button) => {
    button.classList.remove('swiper-button-lock');

    if (button.classList.contains('programs__button--next')) {
      button.disabled = false;
      button.classList.remove('swiper-button-disabled');
    }
  })

  programsScrollbar.classList.remove('swiper-scrollbar-lock');
  programsScrollbar.style.display = 'block';
}

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
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
    dynamicBullets: true,
    dynamicMainBullets: 4,
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

// изменение раскладки swiper grid
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


// if (window.innerWidth >= 768) {
//   let activeIndex = newsSwiper.realIndex;
//   // const currentNextSlide = document.querySelector('.swiper-slide-next');
//   // console.log(currentNextSlide);
//   // currentNextSlide.classList.remove('swiper-slide-next');

//   newsSlides.forEach((slide, index) => {
//       if (index === activeIndex + 1) {
//         console.log(slide);
//         slide.classList.add('swiper-slide-next');
//       };

//       if (index === activeIndex + 2) {
//         slide.classList.remove('swiper-slide-next');
//       }
//     });
// }


// Вторую же, судя по всему, придется делать почти руками:
// воспользуйтесь API Swiper'а, например методом mySwiper.slideTo(index, speed, runCallbacks)
// повесив его на каждый свой буллет.
// Количество слайдов можете тоже посчитать при помощи API mySwiper.slides.length.

// const newsPagitation = document.querySelector('.news__pagination');

// let newsSlidesLength = newsSwiper.slides.length;

// for (let i = 1; i <= newsSlidesLength; i++) {
//   newsPagitation.insertAdjacentHTML('beforeend', `<li class="news__pagination-item"><a class="news__pagination-link" data-page="${i}" href="#">${i}</a></li>`);
// }

// const newsPaginationItems = newsPagitation.querySelectorAll('news__pagination-link');
// const MIN = 1;
// const MAX = newsSlidesLength;

// //
// const addActivePaginationItem = () => {
//   const currentActiveItem = document.querySelector('.news__pagination-item--active');

//   // удаляем предыдущее выделение пагиниции синим
//   if (currentActiveItem !== null) {
//     currentActiveItem.classList.remove('news__pagination-item--active');
//   }

//   // добавляем новое выделение пагинации синим (= активному слайду)
//   const activeSlideIndex = newsSlider.querySelector('.swiper-slide-active').dataset.hash;
//   const activePaginationLink = document.querySelector(`[data-page="${activeSlideIndex}"]`);
//   const activePaginationItem = activePaginationLink.closest('.news__pagination-item');
//   activePaginationItem.classList.add('news__pagination-item--active');
// }

// addActivePaginationItem();

// const isEven = number => number % 2 === 0;

// newsPagitation.addEventListener('click', evt => {
//   if (evt.target.tagName !== 'A') return;
//   const targetItemIndex = evt.target.dataset.page;
//   console.log(targetItemIndex);

//   if (!isEven(targetItemIndex)) {
//     newsSwiper.slideTo(targetItemIndex - 2);
//   }

//   console.log('real index ' + newsSwiper.realIndex);

//   console.log('hash data ' + targetItemIndex);
//   updatePagitation(targetItemIndex);
//   addActivePaginationItem();
// })


// const updatePagitation = (targetItemIndex) => {
//   console.log('real index ' + newsSwiper.realIndex);

// }


// const page = +evt.target.dataset.page;
// console.log(page);
// updateValues(page);
// })

// function updateValues(page) {
//   newsPaginationItems.forEach((item, i) => {
//     item.innerText = clamp(page + i - 2, i);
//     item.dataset.page = clamp(page + i - 2, i);
//   })
// }

// function clamp(value, i) {
//   return Math.max(MIN + i, Math.min(value, MAX - 3 + i))
// }

// Блок FAQ
const faqItems = document.querySelectorAll('.faq__accordion-item');

faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('faq__accordion-item--active');
  })
})
