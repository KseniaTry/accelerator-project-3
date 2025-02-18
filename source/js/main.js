import { initMenu } from "./modules/menu";
import { switchNewsTabs, initNewsSwiper } from "./modules/news";
import { initMainFormSettings } from "./modules/main-form";
import { initModalFormSettings } from "./modules/modal-form";
import { initHeroSlider } from "./modules/hero-slider";
import { initModal } from "./modules/modal";
import { initReviewsSlider } from "./modules/reviews-slider";
import { initProgramsSlider } from "./modules/programs-slider";
import { initSwitchingFaqItems } from "./modules/faq";

// меню
initMenu();

// hero
initHeroSlider();

// блок news
switchNewsTabs();
initNewsSwiper();

// основная форма
initMainFormSettings();

// модальное окно
initModal();
initModalFormSettings();

// блок reviews
initReviewsSlider();

// programs swiper
initProgramsSlider();

// блок FAQ
initSwitchingFaqItems();
