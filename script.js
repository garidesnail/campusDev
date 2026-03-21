const hamburger = document.querySelector(".nav__hamburger");
const menu = document.querySelector(".nav__menu");
const links = document.querySelectorAll(".nav__menu a");

// 1. Toggle Menu (Mobile)
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // Предотвратява затварянето от document listener-а веднага
  
  // Добавяме/Премахваме клас 'active' - CSS ще се погрижи за плавната анимация
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// 2. Автоматично затваряне при избор на линк (UX стандарт)
links.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
  });
});

// 3. Затваряне при клик някъде извън менюто или хедъра
document.addEventListener("click", (e) => {
  const isClickInsideMenu = menu.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (!isClickInsideMenu && !isClickOnHamburger && menu.classList.contains("active")) {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
  }
});

// 4. Reset при промяна на размера на прозореца
// Това гарантира, че ако разпънеш браузъра, менюто няма да остане в "бъгнато" състояние
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    if (menu.classList.contains("active")) {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    }
  }
});