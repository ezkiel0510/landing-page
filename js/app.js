/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Check if the section is in viewport
function isSectionInViewport(section) {
  const box = section.getBoundingClientRect();
  const res = window.screen.availWidth;

  if (res > 900) {
    return (
      box.top >= 0 &&
      box.left >= 0 &&
      box.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      box.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  } else {
    return box.top <= 150 && box.bottom >= 150;
  }
}

// Check if the menu item have a same class as current section in viewport
function findLink(sec) {
  const secId = sec.getAttribute("id");
  const navLinks = document.getElementsByClassName("menu__link");
  for (const navLink of navLinks) {
    for (const aclass of navLink.classList) {
      if (aclass === secId) return navLink;
    }
  }
  return null;
}

// Scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

// Add class 'active' to section when near top of viewport
function makeActive() {
  for (const section of sections) {
    if (isSectionInViewport(section)) {
      // Add active state to section & corresponding Nav link.
      section.classList.add("active");
      const menuItem = findLink(section);
      menuItem.classList.add("active");
    } else {
      // Remove active state from other section and corresponding Nav link.
      section.classList.remove("active");
      const menuItem = findLink(section);
      menuItem.classList.remove("active");
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build the Navigation Menu
document.addEventListener("DOMContentLoaded", function createMenu() {
  const navMenu = document.getElementById("navbar__list");
  for (const section of sections) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = `${section.getAttribute("data-nav")}`;
    link.className = `menu__link ${section.id}`;
    item.appendChild(link);
    item.addEventListener("click", function () {
      scrollToSection(section.id);
    });
    navMenu.appendChild(item);
  }
});

// Make sections active
document.addEventListener("scroll", function () {
  makeActive();
});

// Testing Function
// document.addEventListener("click", function () {
//   for (const section of sections) {
//     const box = section.getBoundingClientRect();
//     console.log("box :>> ", box);
//     if (isSectionInViewport(section)) {
//       console.log(`${section.id} in view port`);
//     } else {
//       console.log(`${section.id} out view port`);
//     }
//   }
// });

/**
 * End Main Functions
 *
 */
