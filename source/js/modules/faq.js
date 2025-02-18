const initSwitchingFaqItems = () => {
  const faqItems = document.querySelectorAll('.faq__accordion-item');

  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('faq__accordion-item--active');
    })
  })
}

export { initSwitchingFaqItems };
