const header = document.querySelector("#site-header");
const scrollingMenu = document.querySelector("#scrolling-menu");

window.addEventListener("scroll", () => {
  const headerHeight = header.offsetHeight;
  const addedClasses = ["scale-1"];
  const removeClasses = ["scale-0"];
  if (window.pageYOffset >= headerHeight) {
    scrollingMenu.classList.remove(removeClasses);
    scrollingMenu.classList.add(addedClasses);
  } else {
    scrollingMenu.classList.remove(addedClasses);
    scrollingMenu.classList.add(removeClasses);
  }
});

const dropdownLinks = document.querySelectorAll(".has-dropdown");
const bodyOverlay = document.querySelector("#overlay");
const visibleClass = "invisible";

dropdownLinks.forEach((item) => {
  item.addEventListener("mouseover", () => {
    bodyOverlay.classList.remove(visibleClass);
  });
  item.addEventListener("mouseout", () => {
    bodyOverlay.classList.add(visibleClass);
  });
});

const dropdownParents = document.querySelectorAll(".dropdown-parent");
const dropdownArrows = document.querySelectorAll(".dropdown-arrows");

dropdownParents.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const classes = {
      active: "active",
      show: "max-h-fit",
      hide: "max-h-0",
    };
    const parent = e.target.parentNode;
    const children = parent.children;
    const childrenArr = Array.from(children);
    const childDropdown = childrenArr.find((el) =>
      el.classList.contains("dropdown")
    );
    if (childDropdown.classList.contains(classes.show)) {
      childDropdown.classList.remove(classes.show);
      childDropdown.classList.add(classes.hide);
    } else {
      childDropdown.classList.remove(classes.hide);
      childDropdown.classList.add(classes.show);
    }

    if (parent.classList.contains(classes.active)) {
      parent.classList.remove(classes.active);
    } else {
      parent.classList.add(classes.active);
    }
  });
});

const menuOpen = document.querySelectorAll(".menu-open");
const menuClose = document.querySelector(".menu-close");
const offscreenNav = document.querySelector("#offscreen-nav");
const navClasses = {
  show: "right-0",
  hide: "-right-full",
};

menuOpen.forEach((button) => {
  button.addEventListener("click", (e) => {
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

menuClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (offscreenNav.classList.contains(navClasses.show)) {
    offscreenNav.classList.remove(navClasses.show);
    offscreenNav.classList.add(navClasses.hide);
    bodyOverlay.classList.add(visibleClass);
  }
});

const cursor = document.querySelectorAll(".cursor");
