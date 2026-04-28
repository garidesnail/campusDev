// Loader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 200); // Кратко забавяне за по-плавен ефект
  }
});

// Анимация при преминаване между страници
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    // Проверка дали линкът е вътрешен и не е котва или имейл
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.hasAttribute('target') && !href.includes('://')) {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        e.preventDefault();
        preloader.classList.remove("hidden");
        setTimeout(() => { window.location.href = href; }, 500);
      }
    }
  });
});

// Navigation
const navMenu = document.querySelector(".nav__menu");
const navLinks = document.querySelectorAll(".nav__menu a");
const navToggle = document.querySelector(".nav__toggle"); // optional toggle control if added later

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    if (navToggle) navToggle.classList.remove("active");
    if (navMenu) navMenu.classList.remove("active");
  }
});

// Localization
const languageSwitch = document.getElementById("switch");
const currentLang = localStorage.getItem("language") || "en";

// Set initial state based on saved language
if (languageSwitch && currentLang === "bg") {
  languageSwitch.checked = true;
}

// Translations object
const translations = {
  en: {
    "header-title": "CampusDev Beta",
    "home-link": "Home",
    "forums-link": "Forums",
    "kafeto-link": "Cafeteria",
    "login-link": "Login/Sign Up",
    "welcome-heading": "Welcome to CampusDev",
    "welcome-text": "The ultimate platform for the students of University of Ruse to share projects, join study groups, and collaborate and build the future together.",
    "features-heading": "Features",
    "features-text": "Here you'll find a variety of tools and resources to help you succeed in your academic journey.",
    "community-heading": "Community",
    "community-text": "Network with students & build better together.",
    "about-heading": "About CampusDev",
    "about-text": "CampusDev is a platform for students to share projects and collaborate. (Currently in beta, we are actively working on adding more features and improving the user experience. We welcome your feedback and suggestions to help us build a better platform for everyone.) ",
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
    "instagram-link": "Instagram",
    "linkedin-link": "LinkedIn",
    "page-title-forums": "Forums",
    "page-title-kafeto": "Cafeteria",
    "faculty-eea-title": "Faculty of Electrical Engineering, Electronics and Automation",
    "faculty-eea-info": "Welcome to the EEA faculty forum. Here you can find information about the educational process, projects, and discussions related to modern technologies and engineering sciences.",
    "faculty-aif-title": "Agrarian and Industrial Faculty",
    "faculty-aif-info": "Forum for the Agrarian and Industrial Faculty. Focus on agricultural machinery, design, and environmental engineering.",
    "specialties-title": "Specialties:",
    "spec-imk": "Internet and Mobile Communications",
    "spec-kst": "Computer Systems and Technologies",
    "spec-el": "Electronics",
    "spec-kua": "Computer Control and Automation",
    "spec-eee": "Electrical Power Engineering and Equipment",
    "spec-design": "Industrial Design",
    "spec-ztt": "Agricultural Machinery and Technologies",
    "spec-ecology": "Ecology and Environmental Protection",
    "student-section-title": "Student Department",
    "student-section-info": "Here you will find useful information related to admission, university opportunities, and scholarships. You can also send anonymous recommendations and inquiries.",
    "admission-title": "Student Admission",
    "admission-info": "Information on the admission campaign, deadlines, exams, and necessary documents for enrollment at Ruse University. Review the full admission conditions on the official website of Ruse University 'Angel Kanchev'.",
    "university-offerings-title": "University Information and Offerings",
    "university-offerings-info": "Ruse University 'Angel Kanchev' offers a wide range of bachelor's, master's, and doctoral programs. The university has modern laboratories, libraries, sports facilities, and student dormitories. It actively participates in international exchange programs such as Erasmus+.",
    "scholarships-title": "Scholarships",
    "scholarships-info": "Various types of scholarships are offered to students based on academic achievement, social status, or participation in research projects. Follow announcements from student councils and administration for current information on deadlines and requirements.",
    "label-professors": "Professors:",
    "label-materials": "📂 Materials",
    "label-messages": "💬 Messages",
    "label-rating-title": "Course Rating:",
    "label-prof-rating": "Professors:",
    "label-material-rating": "Material:",
    "label-base-rating": "Facility:",
    "recommendations-title": "Recommendations and Inquiries (Anonymous)",
    "anonymous-message-label": "Your message:",
    "anonymous-submit-button": "Send Anonymously",
    "anonymous-success-message": "Your message has been sent anonymously. Thank you!",
    "kafeto-post-text": "Does anyone know when the scholarships will be transferred or when the ranking will be released?",
    "kafeto-post-2-text": "I'm looking for a cheap housewares shop near the university, any suggestions?"
  },
  bg: {
    "header-title": "CampusDev Бета",
    "home-link": "Начало",
    "forums-link": "Форуми",
    "kafeto-link": "Кафето",
    "login-link": "Вход/Регистрация",
    "welcome-heading": "Добре дошли в CampusDev",
    "welcome-text": "Най-добрата платформа за студентите на Русенския университет за споделяне на проекти, присъединяване към учебни групи и съвместна работа за изграждане на бъдещето заедно.",
    "features-heading": "Функции",
    "features-text": "Тук ще намерите разнообразие от инструменти и ресурси, които да ви помогнат да успеете във вашето академично пътуване.",
    "community-heading": "Общност",
    "community-text": "Свързвайте се със студенти и строете заедно.",
    "about-heading": "За CampusDev",
    "about-text": "CampusDev е платформа за студенти за споделяне на проекти и сътрудничество. (В момента сме в бета версия и активно работим по добавянето на нови функции и подобряването на потребителското изживяване. Приемаме вашите отзиви и предложения, за да помогнем в изграждането на по-добра платформа за всички.) ",
    "contact-heading": "Контакт",
    "contact-email": "Имейл: ",
    "footer-copyright": "© 2026 CampusDev. Всички права запазени.",
    "footer-mission": "Създадено от студенти за студенти.",
    "privacy-link": "Приватност",
    "terms-link": "Условия",
    "support-link": "Поддръжка",
    "footer-social": "Следете ни на",
    "twitter-link": "Twitter",
    "github-link": "GitHub",
    "instagram-link": "Instagram",
    "linkedin-link": "LinkedIn",
    "page-title-forums": "Форуми",
    "page-title-kafeto": "Кафето",
    "faculty-eea-title": "Факултет Електротехника, електроника и автоматика",
    "faculty-eea-info": "Добре дошли във форума на факултет ЕЕА. Тук можете да намерите информация за учебния процес, проекти и дискусии, свързани със съвременните технологии и инженерните науки.",
    "faculty-aif-title": "Аграрно-индустриален факултет",
    "faculty-aif-info": "Форум на Аграрно-индустриалния факултет. Фокус върху земеделска техника, дизайн и екологично инженерство.",
    "specialties-title": "Специалности:",
    "spec-imk": "Интернет и мобилни комуникации",
    "spec-kst": "Компютърни системи и технологии",
    "spec-el": "Електроника",
    "spec-kua": "Компютърно управление и автоматизация",
    "spec-eee": "Електроенергетика и електрообзавеждане",
    "spec-design": "Промишлен дизайн",
    "spec-ztt": "Земеделска техника и технологии",
    "spec-ecology": "Екология и техника за опазване на околната среда",
    "student-section-title": "Отдел Студенти",
    "student-section-info": "Тук ще намерите полезна информация, свързана с приема, възможностите, които предлага университетът, както и информация за стипендии. Можете също така да изпращате анонимни препоръки и запитвания.",
    "admission-title": "Прием на студенти",
    "admission-info": "Информация за кандидатстудентска кампания, срокове, изпити и необходими документи за записване в Русенски университет. Разгледайте пълните условия за прием на официалния сайт на РУ 'Ангел Кънчев'.",
    "university-offerings-title": "Информация за университета и какво предлага",
    "university-offerings-info": "Русенският университет 'Ангел Кънчев' предлага широк спектър от бакалавърски, магистърски и докторски програми. Университетът разполага с модерни лаборатории, библиотеки, спортни съоръжения и студентски общежития. Активно участва в международни програми за обмен като Еразъм+.",
    "scholarships-title": "Стипендии",
    "scholarships-info": "Различни видове стипендии се предлагат на студентите въз основа на успех, социално положение или участие в научни проекти. Следете обявите на студентските съвети и администрацията за актуална информация относно срокове и изисквания.",
    "label-professors": "Преподаватели:",
    "label-materials": "📂 Материали",
    "label-messages": "💬 Съобщения",
    "label-rating-title": "Рейтинг на дисциплината:",
    "label-prof-rating": "Преподаватели:",
    "label-material-rating": "Материал:",
    "label-base-rating": "База:",
    "recommendations-title": "Препоръки и запитвания (Анонимно)",
    "anonymous-message-label": "Вашето съобщение:",
    "anonymous-submit-button": "Изпрати анонимно",
    "anonymous-success-message": "Вашето съобщение е изпратено анонимно. Благодарим Ви!",
    "kafeto-post-text": "Някой знае ли кога ще ни превеждат стипендиите или кога ще излезе класирането?",
    "kafeto-post-2-text": "Търся евтино магазинче за домашни потреби около университета, някой да има предложения?"
  }
};

// Methods
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
if (languageSwitch) {
  languageSwitch.addEventListener("change", () => {
    const newLang = languageSwitch.checked ? "bg" : "en";
    changeLanguage(newLang);
  });
}

// --- SCROLL REVEAL LOGIC ---
const revealOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Ако искаш анимацията да се повтаря всеки път, махни долния ред:
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 }); // Анимацията започва, когато 15% от елемента са видими

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// Initialize with saved language
changeLanguage(currentLang);
revealOnScroll();
// --- BACK TO TOP BUTTON LOGIC ---
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});