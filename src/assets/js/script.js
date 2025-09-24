gsap.registerPlugin(SplitText, ScrollTrigger);
let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

// dark mode / light mode toggle for tailwind css
const html = document.documentElement;
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
}
document.getElementById("darkToggle").addEventListener("click", () => {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  }
  else {
    localStorage.setItem("theme", "light");
  }
});


// cursor follower
document.addEventListener("mousemove", (e) => {
  document.querySelector("#cursorFollower").classList.add("lg:opacity-100");
  gsap.to("#cursorFollower", {
    x: e.clientX - 6,
    y: e.clientY - 6,
    duration: 1.1,
    ease: "power2.out"
  });
});
// on hover "button" and "a" tag
document.querySelectorAll("button, a").forEach(e => {
  e.addEventListener("mousemove", (e) => {
    gsap.to("#cursorFollower", {
      scale: 0,
    });
  });
  e.addEventListener("mouseleave", (e) => {
    gsap.to("#cursorFollower", {
      scale: 1,
    });
  });
});
// on hover "portfolio image"
document.querySelectorAll("#portfolio article img").forEach(e => {
  e.addEventListener("mousemove", (e) => {
    document.querySelector("#cursorFollower").innerHTML = `<p class="text-[3px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">View More</p>`;
    gsap.to("#cursorFollower", {
      scale: 6,
      backdropFilter: "blur(4px)",
      backgroundColor: primaryColor + "50",
    });
  });
  e.addEventListener("mouseleave", (e) => {
    document.querySelector("#cursorFollower").innerHTML = "";
    gsap.to("#cursorFollower", {
      scale: 1,
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    });
  });
});


// background cursor animation
gsap.to(".bgCursor", {
  rotate: 360,
  duration: 5,
  repeat: -1,
  ease: "linear",
});
document.addEventListener("mousemove", (e) => {
  gsap.to(".bgCursor", {
    x: e.clientX - 200,
    y: e.clientY - 200,
    duration: 30,
    ease: "power2.out"
  })
});

// smooth scroll
const lenis = new Lenis({
  duration: 1,
  easing: (t) => t * (2 - t),
  smooth: true,
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// go top with smooth scroll
const goTopBtn = document.getElementById("goTopBtn");
const scrollProgress = document.getElementById("scrollProgress");
lenis.on("scroll", () => {
  const scrollTop = lenis.scroll;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  scrollProgress.style.height = `${scrolled}%`;
  if (scrollTop > 250) {
    goTopBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
  } else {
    goTopBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
  }
});
goTopBtn.addEventListener("click", () => {
  lenis.scrollTo(0, { duration: 1.5, easing: (t) => t * (2 - t) });
});

// scrollReveal function
function revealSection(selector, options = {}) {
  ScrollReveal().reveal(selector, {
    origin: 'bottom',
    distance: '40px',
    duration: 500,
    opacity: 0,
    easing: 'ease-in-out',
    interval: 150,
    reset: true,
  //   beforeReveal: (el) => {
  //     el.animate(
  //       [
  //         { filter: "blur(5px)" },
  //         { filter: "blur(0px)" }
  //       ],
  //       { duration: 700, fill: "forwards" }
  //     );
  //   },
  //   beforeReset: (el) => {
  //     el.style.filter = "blur(5px)";
  //   },
  });
}

// menu bar
let menuTimeLine = gsap.timeline();
menuTimeLine.to("#menuContainer", {
  backdropFilter: "blur(10px)",
  duration: 0.3,
  onStart: () => {
    menuContainer.classList.add("pointer-events-auto");
    menuContainer.classList.remove("pointer-events-none");
  },
  onReverseComplete: () => {
    menuContainer.classList.remove("pointer-events-auto");
    menuContainer.classList.add("pointer-events-none");
  },
});
menuTimeLine.to("#menuBar", {
  right: 0,
  duration: 0.2,
}, "<");
menuTimeLine.to("#toggleMenu span:nth-of-type(1)", {
  rotation: 45,
  top: "50%",
  transformOrigin: "50% 50%",
}, "<");
menuTimeLine.to("#toggleMenu span:nth-of-type(2)", {
  rotation: -45,
  top: "50%",
  transformOrigin: "50% 50%",
}, "<");
menuTimeLine.from("#menuBar button", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#menuBar p:nth-of-type(1)", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#menuBar ul li", {
  y: 30,
  stagger: 0.04,
  opacity: 0,
  duration: 0.5,
});
menuTimeLine.from("#menuBar p:nth-of-type(2)", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#menuBar div a", {
  opacity: 0,
  y: 30,
  stagger: 0.04,
  duration: 0.05,
});
menuTimeLine.reverse();
document.getElementById("toggleMenu").addEventListener("click", () => {
  menuTimeLine.reversed() ? lenis.stop() : lenis.start();
  menuTimeLine.reversed() ? menuTimeLine.play() : menuTimeLine.reverse();
  menuTimeLine.reversed() ? document.body.classList.remove("overflow-y-hidden") : document.body.classList.add("overflow-y-hidden");
});
document.getElementById("menuContainer").addEventListener("click", () => {
  menuTimeLine.reverse();
  lenis.start();
  document.body.classList.remove("overflow-y-hidden")
});
// active link
let links = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section, header");
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 150;
  sections.forEach((section, index) => {
    if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      links.forEach(link => link.classList.remove('active-nav-links'));
      links[index].classList.add('active-nav-links');
    }
  });
});

// hero section:
// typewriter effect
var typed = new Typed('#typewriter', {
  strings: ['Web Developer', 'U/X Desiner', 'Video Editor'],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
  showCursor: true,
  cursorChar: '_',
});
document.fonts.ready.then(() => {
  // name animation
  gsap.from(new SplitText("header h1", { type: "chars" }).chars, {
    x: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "h1",
      toggleActions: "play none none reverse"
    }
  });
  // skill animation
  gsap.from("header h2", {
    opacity: 0,
    x: 100,
    delay: 1,
  })
  // subtitle animation
  gsap.from(new SplitText("header p", { type: "lines" }).lines, {
    x: 100,
    opacity: 0,
    stagger: 0.3,
    duration: 1,
    delay: 1.6,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "h1",
      toggleActions: "play none none reverse"
    }
  });
  // social icons animation
  gsap.from("header div div:nth-of-type(1) a", {
    opacity: 0,
    delay: 2.7,
    stagger: 0.2,
    duration: 0.3,
    x: 100
  })
  // button animation
  gsap.set("header div div:nth-of-type(2) a", {
    opacity: 0,
    x: 100,
  })
  gsap.to("header div div:nth-of-type(2) a", {
    opacity: 1,
    delay: 2.9,
    stagger: 0.2,
    duration: 0.3,
    x: 0
  })
});
// intro video pop up
document.getElementById("introVideoPopUpBtn").addEventListener("click", () => {
  document.getElementById("introVideoPopUp").classList.remove("hidden");
});
document.querySelector("#introVideoPopUp button").addEventListener("click", () => {
  document.getElementById("introVideoPopUp").classList.add("hidden");
});

// achivements section:
// odometer animation
document.querySelectorAll('[data-target-number]').forEach(function (el) {
  var targetStr = (el.getAttribute('data-target-number') || '').trim();
  if (!targetStr) return;
  var numOnly = targetStr.replace(/[^0-9.\-]/g, '');
  var targetVal = parseFloat(numOnly || '0');
  var prefixMatch = targetStr.match(/^[^\d\-\.]+/);
  var prefix = prefixMatch ? prefixMatch[0] : '';
  var suffix = targetStr.replace(/^[^\d\-\.]*/, '').replace(/-?\d[\d,]*(?:\.\d+)?/, '');
  var startNum = (el.textContent || '').trim().replace(/[^0-9.\-]/g, '');
  if (startNum === '') startNum = '0';
  el.textContent = '';
  if (prefix) {
    var pre = document.createElement('span');
    pre.className = 'odo-prefix';
    pre.textContent = prefix;
    el.appendChild(pre);
  }
  var numSpan = document.createElement('span');
  numSpan.className = 'odometer';
  numSpan.textContent = startNum;
  el.appendChild(numSpan);
  if (suffix) {
    var suf = document.createElement('span');
    suf.className = 'odo-suffix';
    suf.textContent = suffix;
    el.appendChild(suf);
  }
  var odo = new Odometer({
    el: numSpan,
    value: parseFloat(startNum),
    duration: +el.getAttribute('data-duration') || 2000,
    format: el.getAttribute('data-format') || '(,ddd).dd'
  });
  ScrollTrigger.create({
      trigger: el,
      toggleActions: "play none reset none",
      onEnter: function () {
        odo.update(targetVal);
      },
      onLeaveBack: function () {
        odo.update(startNum);
      }
    });
});
// text animation
gsap.from(new SplitText("#achievements h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#achievements h2",
    start: "top 80%",
    end: "top 15%",
    scrub: 1,
  },
});

// colaborate section:
// slider logic
var swiper = new Swiper(".logo-slide", {
  watchSlidesProgress: true,
  slidesPerView: "auto",
  loop: true,
  spaceBetween: 40,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
});
// text animation
gsap.from(new SplitText("#colaborate h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#colaborate h2",
    start: "top 80%",
    end: "top 15%",
    scrub: 1,
  },
});

// exprience section:
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#exprience .main-content",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#exprience .text-content",
    pinSpacing: false
  })
})
// text animation
gsap.from(new SplitText("#exprience h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#exprience h2",
    start: "top 80%",
    end: "top 5%",
    scrub: 1,
  },
});
// content scroll animation
revealSection('#exprience .main-content .content');

// portfolio section:
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#portfolio .main-content",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#portfolio .text-content",
    pinSpacing: false
  })
})
// text animation
gsap.from(new SplitText("#portfolio h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#portfolio h2",
    start: "top 80%",
    end: "top 5%",
    scrub: 1,
  },
});
// image parallax
gsap.utils.toArray("#portfolio article").forEach(article => {
  let img = article.querySelector("img");
  let container = article.querySelector("div");
  gsap.to(img, {
    y: -(img.offsetHeight - container.offsetHeight),
    ease: "none",
    scrollTrigger: {
      trigger: article,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});
// dynamic youtube video pop up
function openVideoModal(el) {
  document.querySelector("#portfolioPopUpModal iframe").src = "https://www.youtube.com/embed/" + el.getAttribute("data-youtube-video-embed-key");
  document.getElementById("portfolioPopUpModal").classList.remove("hidden");
}
function closeVideo() {
  document.getElementById("portfolioPopUpModal").classList.add("hidden");
  document.querySelector("#portfolioPopUpModal iframe").src = "";
}
// off portfolio "a" tag page load
document.querySelectorAll("#portfolio article a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});

// plan section:
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#plan .main-content",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#plan .text-content",
    pinSpacing: false
  })
})
// text animation
gsap.from(new SplitText("#plan h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#plan h2",
    start: "top 80%",
    end: "top 5%",
    scrub: 1,
  },
});
// tab logic
document.querySelectorAll("#plan button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#plan button").forEach(b => {
      b.classList.remove("bg-primary");
    });
    btn.classList.add("bg-primary");
    document.querySelectorAll("#plan .card").forEach(card => card.classList.add("hidden"));
    const target = btn.getAttribute("data-target");
    document.getElementById(target).classList.remove("hidden");
  });
});

// testimonial section:
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#testimonial .main-content",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#testimonial .text-content",
    pinSpacing: false
  })
})
// text animation
gsap.from(new SplitText("#testimonial h2", { type: "words, chars" }).chars, {
  stagger: 0.3,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#testimonial h2",
    start: "top 80%",
    end: "top 5%",
    scrub: 1,
  },
});
// slider logic
var swiper = new Swiper(".testimonial-slide", {
  effect: "cards",
  grabCursor: true,
  loop: true,
  spaceBetween: 40,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});

// tech-stack section:
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#tech-stack .main-content",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#tech-stack .text-content",
    pinSpacing: false
  })
})
// text animation
gsap.from(new SplitText("#tech-stack h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#tech-stack h2",
    start: "top 80%",
    end: "top 5%",
    scrub: 1,
  },
});
// content scroll animation
revealSection('#tech-stack .main-content div');

// conatact section:
// get draft data from client
document.querySelector("form a").addEventListener("click", function (e) {
  e.preventDefault();
  const inputs = document.querySelectorAll("form input, form textarea");
  const data = {};
  inputs.forEach((field, i) => {
    const key = field.placeholder || `field${i}`;
    data[key] = field.value;
  });
  localStorage.setItem("contactDraft", JSON.stringify(data));
  document.getElementById("formPopup").classList.remove("hidden");
});
document.querySelector("#formPopup button").addEventListener("click", () => {
  document.getElementById("formPopup").classList.add("hidden");
});
// send draft data to client
const saved = localStorage.getItem("contactDraft");
if (saved) {
  const data = JSON.parse(saved);
  const inputs = document.querySelectorAll("form input, form textarea");
  inputs.forEach((field, i) => {
    const key = field.placeholder || `field${i}`;
    if (data[key]) field.value = data[key];
  });
}
// text animation
gsap.from(new SplitText("#contact h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#contact h2",
    start: "top 80%",
    end: "top 15%",
    scrub: 1,
  },
});
// content scroll animation
revealSection('form input, form textarea');
// formsubmit.co ajax responce
document.querySelector("form").addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(document.querySelector("form")); // get form data
  fetch('https://formsubmit.co/ajax/ovikbiswas01@gmail.com', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("formSubmitSuccess").classList.remove("hidden");
    document.querySelector("#formSubmitSuccess button").addEventListener("click", () => {
      document.getElementById("formSubmitSuccess").classList.add("hidden");
    });
    localStorage.removeItem("contactDraft");
    document.querySelector("form").reset();
  })
  .catch(error => {
    alert("Something went wrong! Please see the console for more info.");
    console.error(error);
  });
});

// faq section:
// scroll pin
gsap.matchMedia().add("(min-width: 1024px)", () => {
  ScrollTrigger.create({
    trigger: "#faq .main-content",
    start: "top-=40 top",
    end: "bottom bottom",
    pin: "#faq .text-content",
    pinSpacing: false
  })
})
// text animation
gsap.from(new SplitText("#faq h2", { type: "words, chars" }).chars, {
  stagger: 0.1,
  opacity: 0.3,
  scrollTrigger: {
    trigger: "#faq h2",
    start: "top 80%",
    end: "top 5%",
    scrub: 1,
  },
});
// faq logic
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector(".icon");
    if (answer.classList.contains("max-h-[200px]")) {
      answer.classList.remove("max-h-[200px]", "py-4");
      icon.textContent = "+";
      return;
    }
    document.querySelectorAll(".faq-answer").forEach((a) => {
      a.classList.remove("max-h-[200px]", "py-4");
      a.previousElementSibling.querySelector(".icon").textContent = "+";
    });
    answer.classList.add("max-h-[200px]", "py-4");
    icon.textContent = "–";
  });
});
// content scroll animation
revealSection('#faq .faq-item');

// footer section:
// dynamic year
document.querySelector("#year").innerHTML = new Date().getFullYear();