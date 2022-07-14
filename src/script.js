import Swiper from 'swiper';

const header = document.querySelector('#site-header');
const scrollingMenu = document.querySelector('#scrolling-menu');

window.addEventListener('scroll', () => {
  const headerHeight = header.offsetHeight;
  const addedClasses = ['scale-1'];
  const removeClasses = ['scale-0'];
  if (window.pageYOffset >= headerHeight) {
    scrollingMenu.classList.remove(removeClasses);
    scrollingMenu.classList.add(addedClasses);
  } else {
    scrollingMenu.classList.remove(addedClasses);
    scrollingMenu.classList.add(removeClasses);
  }
});

const dropdownLinks = document.querySelectorAll('.has-dropdown');
const bodyOverlay = document.querySelector('#overlay');
const visibleClass = 'invisible';

dropdownLinks.forEach((item) => {
  item.addEventListener('mouseover', () => {
    bodyOverlay.classList.remove(visibleClass);
  });
  item.addEventListener('mouseout', () => {
    bodyOverlay.classList.add(visibleClass);
  });
});

const dropdowns = document.querySelectorAll('.dropdown-parent');
const dropdownArrows = document.querySelectorAll('.dropdown-arrows');

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', (event) => {
    //Declare Variables
    let current = event.target.parentNode;
    let active = 'active';
    //Check if the parent has children, or do something if not
    if (!current.classList.contains('dropdown-parent')) {
      return;
    } else {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (current.classList.contains(active)) {
        current.classList.remove('active');
      } else {
        current.classList.add('active');
      }
    }
  });
});

const menuOpen = document.querySelectorAll('.menu-open');
const menuClose = document.querySelector('.menu-close');
const offscreenNav = document.querySelector('#offscreen-nav');
const navClasses = {
  show: 'right-0',
  hide: '-right-full',
};

menuOpen.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (offscreenNav.classList.contains(navClasses.show)) {
      return;
    } else {
      offscreenNav.classList.remove(navClasses.hide);
      offscreenNav.classList.add(navClasses.show);
      bodyOverlay.classList.remove(visibleClass);
    }
  });
});

menuClose.addEventListener('click', (e) => {
  e.preventDefault();
  if (offscreenNav.classList.contains(navClasses.show)) {
    offscreenNav.classList.remove(navClasses.show);
    offscreenNav.classList.add(navClasses.hide);
    bodyOverlay.classList.add(visibleClass);
  }
});

const previewSlider = new Swiper('.previews-slider', {
  slidesPerView: 3,
  spaceBetween: 32,
  grabCursor: true,
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 4,
    },
    1080: {
      slidesPerView: 6,
    },
    1280: {
      slidesPerView: 7.5,
    },
  },
});

class Accordion {
  constructor(parent) {
    this.parent = parent;
    if (this.parent) {
      this.itemsArr = Array.from(this.parent.children);
      this.currentItem = this.itemsArr[0];
      this.init();
      this.itemsArr.forEach((a) => {
        const children = a.children;
        const childrenArr = Array.from(children);
        childrenArr.forEach((b) => {
          b.addEventListener('click', (event) => {
            event.preventDefault();
            this.currentItem = event.currentTarget.parentNode;
            this.clear();
            this.activate();
          });
        });
      });
    }
  }

  init() {
    this.clear();
    this.activate();
  }

  clear() {
    this.itemsArr.forEach((item) => {
      item.classList.remove('open');
      item.classList.add('closed');
    });
  }

  activate() {
    this.currentItem.classList.remove('closed');
    this.currentItem.classList.add('open');
  }
}

const accordion = document.querySelector('.features-accordion');
const featuresAccordion = new Accordion(accordion);

class Calculator {
  constructor(calculator) {
    this.calculator = document.querySelector(calculator);
    this.ordersFigure = document.querySelector(
      `${calculator} #orders_per_month_figure`
    );
    this.ordersRange = document.querySelector(
      `${calculator} #orders_per_month`
    );
    this.averageFigure = document.querySelector(
      `${calculator} #average_order_value_figure`
    );
    this.averageRange = document.querySelector(
      `${calculator} #average_order_value`
    );
    this.monthlyTotal = document.querySelector(`${calculator} #monthly_total`);
    this.annualTotal = document.querySelector(`${calculator} #annual_total`);
    this.activeClass = 'active';

    this.init();
    this.toggle();
  }

  init() {
    this.ordersFigure.textContent = this.ordersRange.value;
    this.averageFigure.textContent = '£' + this.averageRange.value;
  }

  toggle() {
    let inputs = [this.ordersRange, this.averageRange];
    inputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        if (input.id === this.ordersRange.id) {
          this.ordersFigure.textContent = this.ordersRange.value;
        } else {
          this.averageFigure.textContent = '£' + this.averageRange.value;
        }
        this.changeValues();
      });
    });
  }

  changeValues() {
    let a = this.ordersRange.value;
    let b = this.averageRange.value;
    let x = (a * b * 0.3 - 100).toFixed(0);
    let y = ((a * b * 0.3 - 100) * 12).toFixed(0);
    this.monthlyTotal.textContent = `£${this.getK(x)}`;
    this.annualTotal.textContent = `£${this.getK(y)}`;
  }

  getK(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + 'k';
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(0) + 'm';
    } else if (num < 900) {
      return num;
    }
  }

  reveal() {
    if (this.calculator.classList.contains(this.activeClass)) {
      this.calculator.classList.remove(this.activeClass);
    } else {
      this.calculator.classList.add(this.activeClass);
    }
  }
  close() {
    this.calculator.classList.remove(this.activeClass);
  }
}

const calculator = new Calculator('#savings-calculator');

document
  .querySelector('#reveal-calculator')
  .addEventListener('click', (event) => {
    event.preventDefault();
    calculator.reveal();
    calculator.calculator.classList.contains(calculator.activeClass)
      ? (event.currentTarget.textContent = 'Close')
      : (event.currentTarget.textContent = 'Calculate Savings');
  });
