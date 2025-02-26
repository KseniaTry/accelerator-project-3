// примечание: в блоке about tablet и news mobile тесты проходили с разными значениями на windows и на macOS.
// в этом файле осуществляется проверка системы пользователя, чтобы в зависимости от этого менять значения стилей.
import { MOBILE_WIDTH_MAX, DESKTOP_WIDTH_MIN } from '../const';

const aboutWrapper = document.querySelector('.about__about-wrapper');
const aboutWrapperText = aboutWrapper.querySelector('p');
const aboutTitle = document.querySelector('.about__title');

const newsSlideTitle = document.querySelector('.news__slide-title');
const newsSlideDecriptionWrapper = document.querySelector('.news__slide-description-wrapper');

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
