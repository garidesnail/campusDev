// ПРЕМАХВАНЕ НА PRELOADER ПРИ ЗАРЕЖДАНЕ
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 800); // Кратко забавяне за по-плавен ефект
  }
});

const navMenu = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__menu a");
const navToggle = document.querySelector(".nav__toggle"); // optional toggle control if added later

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    if (navToggle) navToggle.classList.remove("active");
    if (navMenu) navMenu.classList.remove("active");
  }
});

gsap.registerPlugin(ScrollTrigger);

const scrollContainer = document.querySelector(".scroll-container");

if (scrollContainer) {

  const scroller = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();

 
  const sections = scrollContainer.querySelectorAll("section");

  sections.forEach((section, i) => {

    const prevBg = i === 0 ? "#ffffff" : sections[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "#000000" : sections[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: section,
      scroller: scrollContainer,
      start: "top center",
      end: "bottom center",
      scrub: true,

      onEnter: () => {
        gsap.to(".bg", {
          backgroundColor: section.dataset.bgcolor,
          duration: 0.6,
          overwrite: "auto"
        });
        gsap.to("body", {
          backgroundColor: section.dataset.bgcolor,
          color: section.dataset.textcolor,
          duration: 0.6,
          overwrite: "auto"
        });
      },

      onLeaveBack: () => {
        gsap.to(".bg", {
          backgroundColor: prevBg,
          duration: 0.6,
          overwrite: "auto"
        });
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          duration: 0.6,
          overwrite: "auto"
        });
      }
    });

    gsap.from(section.children, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        scroller: scrollContainer,
        start: "top 85%"
      }
    });

  });

  
  window.addEventListener("resize", () => {
    scroller.update();
    ScrollTrigger.refresh();
  });
}

// LANGUAGE SWITCHING
const languageSwitch = document.getElementById("switch");
const currentLang = localStorage.getItem("language") || "en";

// Set initial state based on saved language
if (currentLang === "bg") {
  languageSwitch.checked = true;
}

// Translations object
const translations = {
  en: {
    "header-title": "CampusDev Beta",
    "home-link": "Home",
    "forums-link": "Forums",
    "kafeto-link": "Kafeto",
    "login-link": "Login/Sign Up",
    "welcome-heading": "Welcome to CampusDev",
    "features-heading": "Features",
    "features-text": "Project feed, study groups, forums, challenge rooms.",
    "community-heading": "Community",
    "community-text": "Network with students & build better together.",
    "about-heading": "About CampusDev",
    "about-text": "CampusDev is a platform for students to share projects and collaborate.",
    "contact-heading": "Contact",
    "contact-email": "Email: ",
    "footer-copyright": "© 2026 CampusDev. All rights reserved.",
    "footer-mission": "Built by students for students.",
    "privacy-link": "Privacy",
    "terms-link": "Terms",
    "support-link": "Support",
    "footer-social": "Follow us on",
    "twitter-link": "Twitter",
    "github-link": "GitHub",
    "linkedin-link": "LinkedIn",
    "page-title-forums": "Forums",
    "page-title-kafeto": "Kafeto"
  },
  bg: {
    "header-title": "CampusDev Бета",
    "home-link": "Начало",
    "forums-link": "Форуми",
    "kafeto-link": "Кафето",
    "login-link": "Вход/Регистрация",
    "welcome-heading": "Добре дошли в CampusDev",
    "features-heading": "Функции",
    "features-text": "Лента на проектите, учебни групи, форуми, стаи за предизвикателства.",
    "community-heading": "Общност",
    "community-text": "Свързвайте се със студенти и строете заедно.",
    "about-heading": "За CampusDev",
    "about-text": "CampusDev е платформа за студенти да споделят проекти и да сътрудничат.",
    "contact-heading": "Контакт",
    "contact-email": "Имейл: ",
    "footer-copyright": "© 2026 CampusDev. Всички права запазени.",
    "footer-mission": "Создавано от студенти за студенти.",
    "privacy-link": "Приватност",
    "terms-link": "Условия",
    "support-link": "Поддръжка",
    "footer-social": "Следете ни на",
    "twitter-link": "Twitter",
    "github-link": "GitHub",
    "linkedin-link": "LinkedIn",
    "page-title-forums": "Форуми",
    "page-title-kafeto": "Кафето"
  }
};

// Function to change language
function changeLanguage(lang) {
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;
  
  // Update page title
  const titleMap = {
    "index.html": "header-title",
    "forums.html": "page-title-forums",
    "kafeto.html": "page-title-kafeto"
  };
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// Listen for language switch
languageSwitch.addEventListener("change", () => {
  const newLang = languageSwitch.checked ? "bg" : "en";
  changeLanguage(newLang);
});

// Initialize with saved language
changeLanguage(currentLang);
