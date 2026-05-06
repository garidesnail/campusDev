// Loader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 200); // Кратко забавяне за по-плавен ефект
  }
});

// Login State Management
function updateNavigation() {
  const user = localStorage.getItem('user');
  const navLogin = document.getElementById('nav-login');
  const navProfile = document.getElementById('nav-profile');
  
  if (navLogin && navProfile) {
    if (user) {
      // User is logged in
      navLogin.style.display = 'none';
      navProfile.style.display = 'block';
    } else {
      // User is not logged in
      navLogin.style.display = 'block';
      navProfile.style.display = 'none';
    }
  }
}

// Update navigation on page load
document.addEventListener('DOMContentLoaded', updateNavigation);
window.addEventListener('load', updateNavigation);

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


// Dynamic Translation using LibreTranslate API
async function dynamicTranslate(lang) {
  const targetLang = lang === "bg" ? "bg" : "en";
  const sourceLang = lang === "bg" ? "en" : "bg";

  console.log(`Starting translation to: ${targetLang}`);

  const skipSelectors = [
    '.header h1', 
    'h1:first-of-type', 
    '.nav__logo', 
    '.logo', 
    '#preloader', 
    '.nav__menu',
    '.language-switch', 
    '#switch'
  ];

  const isInSkipList = (element) => {
    return skipSelectors.some(selector => element.closest(selector));
  };

  // Функция за превод на конкретен текст
  const translateText = async (text) => {
    if (!text.trim() || text.length > 500) return null;
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({ q: text, source: sourceLang, target: targetLang, format: "text" }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) return null; 
      const data = await response.json();
      return data.translatedText;
    } catch (e) {
      console.warn("Translation failed (CORS or Network). Use Live Server:", e.message);
      return null;
    }
  };

  const translationPromises = [];

  // Обхождаме всички елементи, но търсим само ТЕКСТОВИТЕ ВЪЗЛИ вътре в тях
  const elements = document.querySelectorAll('p, li, h2, h3, h4, span, a, button, label');
  elements.forEach(el => {
    if (isInSkipList(el)) return;

    // TreeWalker намира само чистия текст, без да докосва HTML таговете
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
      const originalText = node.nodeValue.trim();
      if (originalText.length > 1) {
        const promise = translateText(originalText).then(translated => {
          if (translated) node.nodeValue = translated;
        });
        translationPromises.push(promise);
      }
    }
  });

  // Превод на placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    const text = el.getAttribute('placeholder');
    const promise = translateText(text).then(translated => {
      if (translated) el.setAttribute('placeholder', translated);
    });
    translationPromises.push(promise);
  });

  await Promise.all(translationPromises);
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

// Initialize with dynamic translation on page load
document.addEventListener('DOMContentLoaded', () => {
  // Инициализираме елементите тук, за да сме сигурни, че съществуват
  const languageSwitch = document.getElementById("switch");
  const currentLang = localStorage.getItem("language") || "en";
  
  // Обновяваме навигацията (login/profile)
  updateNavigation();
  revealOnScroll();

  if (languageSwitch) {
    // Настройваме първоначалното състояние
    if (currentLang === "bg") {
      languageSwitch.checked = true;
    }

    // Закачаме слушателя за промяна
    languageSwitch.addEventListener("change", async () => {
      const newLang = languageSwitch.checked ? "bg" : "en";
      localStorage.setItem("language", newLang);
      await dynamicTranslate(newLang);
    });
  }

  // Не превеждаме, ако текущият език е английски (базовият език на сайта)
  if (currentLang !== "en") {
    dynamicTranslate(currentLang);
  }
});

// --- BACK TO TOP BUTTON LOGIC ---
const backToTop = document.getElementById("backToTop");

if (backToTop) {
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
}

function goToProfile(){
  window.location.href = "profile.html";
}