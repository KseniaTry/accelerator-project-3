// примечание: в блоке about tablet и news mobile тесты проходили с разными значениями на windows и на macOS.
// в этом файле осуществляется проверка системы пользователя, чтобы в зависимости от этого менять значения стилей.
import { MOBILE_WIDTH_MAX, DESKTOP_WIDTH_MIN } from "../const";

const aboutWrapper = document.querySelector('.about__about-wrapper'); // p tablet margin-bottom -1px , на маке нет этого значения
const aboutWrapperText = aboutWrapper.querySelector('p');
const aboutTitle = document.querySelector('.about__title'); // tablet magrin-bottom 31px, на маке 30px

const newsSlideTitle = document.querySelector('.news__slide-title'); //   mobile  padding: 10px 18px 4px 0; mac // 10 18 5 0 на винде
const newsSlideDecriptionWrapper = document.querySelector('.news__slide-description-wrapper'); // mobile      padding: 12px 10px 10px 0; mac // 12 10 9 0 на видне

const userDeviceArray = [
  { device: 'Android', platform: /Android/ },
  { device: 'iPhone', platform: /iPhone/ },
  { device: 'iPad', platform: /iPad/ },
  { device: 'Symbian', platform: /Symbian/ },
  { device: 'Windows Phone', platform: /Windows Phone/ },
  { device: 'Tablet OS', platform: /Tablet OS/ },
  { device: 'Linux', platform: /Linux/ },
  { device: 'Windows', platform: /Windows NT/ },
  { device: 'Macintosh', platform: /Macintosh/ }
];

const platform = navigator.userAgent;

function getPlatform() {
  for (const i in userDeviceArray) {
    if (userDeviceArray[i].platform.test(platform)) {
      return userDeviceArray[i].device;
    }
  }
  return `Неизвестная платформа!${platform}`;
}

if (getPlatform() === 'Windows') {
  if (window.innerWidth <= MOBILE_WIDTH_MAX) {
    newsSlideTitle.style.paddingBottom = '5px';
    newsSlideDecriptionWrapper.style.paddingBottom = '9px';
  }

  if (window.innerWidth > MOBILE_WIDTH_MAX && window.innerWidth < DESKTOP_WIDTH_MIN) {
    aboutWrapperText.style.marginBottom = '-1px';
    aboutTitle.style.marginBottom = '31px';
  }
}

if (getPlatform() === 'Macintosh') {
  if (window.innerWidth <= MOBILE_WIDTH_MAX) {
    newsSlideTitle.style.paddingBottom = '4px';
    newsSlideDecriptionWrapper.style.paddingBottom = '10px';
  }

  if (window.innerWidth > MOBILE_WIDTH_MAX && window.innerWidth < DESKTOP_WIDTH_MIN) {
    aboutWrapperText.style.marginBottom = '0';
    aboutTitle.style.marginBottom = '30px';
  }
}
