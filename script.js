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