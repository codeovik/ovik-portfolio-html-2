// gsap plugin initialization
gsap.registerPlugin(SplitText, ScrollTrigger);

// get primary color from css variable
let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

/****************************************
**** dark mode ****
****************************************/

// get theme from local storage
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}

// when click dark/light mode button
document.getElementById("darkToggle").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark"); // toggle "dark" class in html tag
  document.documentElement.classList.contains("dark") ? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light"); // save theme in local store
});


/****************************************
**** cursor follower ****
****************************************/

// follow on mouse move
document.addEventListener("mousemove", (e) => {
  document.querySelector("#cursorFollower").classList.add("lg:opacity-100");
  gsap.to("#cursorFollower", {
    x: e.clientX - 6,
    y: e.clientY - 6,
    duration: 1.1,
    ease: "power2.out"
  });
});

// hover on buttons and links
document.querySelectorAll("button, a").forEach(e => {
  e.addEventListener("mousemove", (e) => { // when mouse enter
    gsap.to("#cursorFollower", {
      scale: 0,
    });
  });
  e.addEventListener("mouseleave", (e) => { // when mouse leave
    gsap.to("#cursorFollower", {
      scale: 1,
    });
  });
});

// hover on portfolio image
document.querySelectorAll("#portfolio article img").forEach(e => { // when mouse enter
  e.addEventListener("mousemove", (e) => {
    document.querySelector("#cursorFollower").innerHTML = `<p class="text-[3px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">View More</p>`;
    gsap.to("#cursorFollower", {
      scale: 6,
      backdropFilter: "blur(4px)",
      backgroundColor: primaryColor + "50",
    });
  });
  e.addEventListener("mouseleave", (e) => { // when mouse leave
    document.querySelector("#cursorFollower").innerHTML = "";
    gsap.to("#cursorFollower", {
      scale: 1,
      backdropFilter: "blur(0px)",
      backgroundColor: "#757575",
    });
  });
});


/****************************************
**** background cursor follower ****
****************************************/

// rotate
gsap.to(".bgCursor", {
  rotate: 360,
  duration: 5,
  repeat: -1,
  ease: "linear",
});

// follow on mouse move
document.addEventListener("mousemove", (e) => {
  gsap.to(".bgCursor", {
    x: e.clientX - 200,
    y: e.clientY - 200,
    duration: 30,
    ease: "power2.out"
  })
});


/****************************************
**** smooth scroll ****
****************************************/
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

/****************************************
**** go top with smooth scroll ****
****************************************/
const goTopBtn = document.getElementById("goTopBtn");
const scrollProgress = document.getElementById("scrollProgress");
lenis.on("scroll", () => {
  const scrollTop = lenis.scroll; // smooth scroll
  const docHeight = document.documentElement.scrollHeight - window.innerHeight; // top to present total height
  scrollProgress.style.height = (scrollTop / docHeight) * 100 + "%"; // scroll progress
  // show button
  if (scrollTop > 250) {
    goTopBtn.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
  }
  // hide button
  else {
    goTopBtn.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
    goTopBtn.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
  }
});
// when click tot go top button
goTopBtn.addEventListener("click", () => {
  lenis.scrollTo(0, { duration: 1.5, easing: (t) => t * (2 - t) });
});


/****************************************
**** scroll reveal initiation ****
****************************************/
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
  //         { filter: "blur(5px)" },                           --------------------------
  //         { filter: "blur(0px)" }                  ===>      - This is for blur effect -
  //       ],                                                   --------------------------
  //       { duration: 700, fill: "forwards" }
  //     );
  //   },
  //   beforeReset: (el) => {
  //     el.style.filter = "blur(5px)";
  //   },
  });
}


/****************************************
**** video pop up ****
****************************************/

// video open
function openVideoModal(el) {
  document.querySelector("#popUpVideoModal iframe").src = "https://www.youtube.com/embed/" + el.getAttribute("data-youtube-video-embed-key");
  document.getElementById("popUpVideoModal").classList.remove("hidden");
  document.getElementById("popUpVideoModal").classList.add("flex");
}

// video close
document.querySelector("#popUpVideoModal button").addEventListener("click", () => {
  document.getElementById("popUpVideoModal").classList.add("hidden");
  document.getElementById("popUpVideoModal").classList.remove("flex");
  document.querySelector("#popUpVideoModal iframe").src = "";
});


/****************************************
**** navbar ****
****************************************/

// menu timeline
let menuTimeLine = gsap.timeline();

// body blur and prepare for click
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
// menu slide and items animation
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
menuTimeLine.from("#menuBar #manuTitle1", {
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
menuTimeLine.from("#menuBar #manuTitle2", {
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
menuTimeLine.from("#menuBar #manuTitle3", {
  y: 30,
  opacity: 0,
  duration: 0.05,
});
menuTimeLine.from("#menuBar #menuContact p", {
  opacity: 0,
  y: 30,
  stagger: 0.04,
  duration: 0.05,
});

menuTimeLine.reverse(); // off timeline by default

// menu toggle in button
document.getElementById("toggleMenu").addEventListener("click", () => {
  gsap.matchMedia().add("(min-width: 1024px)", () => {
    menuTimeLine.reversed() ? lenis.stop() : lenis.start(); // stop/start scroll for equal or more than 1024px width devices
  });
  menuTimeLine.reversed() ? menuTimeLine.play() : menuTimeLine.reverse(); // play/reverse timeline
  menuTimeLine.reversed() ? document.body.classList.remove("overflow-y-hidden") : document.body.classList.add("overflow-y-hidden"); // hide/show body scroll
});

// menu close on body click
document.getElementById("menuContainer").addEventListener("click", () => {
  menuTimeLine.reverse(); // reverse timeline
  lenis.start(); // start scroll
  document.body.classList.remove("overflow-y-hidden"); // show body scroll
});

// active link
let links = document.querySelectorAll("nav ul li a"); // get all nav links
const sections = document.querySelectorAll("section, header"); // get all sections
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 150; // add offset to scroll position
  sections.forEach((section, index) => {
    if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) { // when scroll position is in section
      links.forEach(link => link.classList.remove('active-nav-links')); // remove active class from all links
      links[index].classList.add('active-nav-links'); // add active class to current link
    }
  });
});


/****************************************
**** hero section ****
****************************************/

// typewriter effect
var typed = new Typed('#typewriter', {
  stringsElement: '#typed-strings',
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
  showCursor: true,
  cursorChar: '_',
})

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
  gsap.from("header .social a", {
    opacity: 0,
    delay: 2.7,
    stagger: 0.2,
    duration: 0.3,
    x: 100
  })
  // button animation
  gsap.set("header .button-container a", {
    opacity: 0,
    x: 100,
  })
  gsap.to("header .button-container a", {
    opacity: 1,
    delay: 2.9,
    stagger: 0.2,
    duration: 0.3,
    x: 0
  })
});


/****************************************
**** achievements section ****
****************************************/

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

  // animate when visible
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

// headline animation
document.fonts.ready.then(() => {
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
});


/****************************************
**** colaborate section ****
****************************************/

// logo slide
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

// headline animation
document.fonts.ready.then(() => {
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
});


/****************************************
**** exprience section ****
****************************************/

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

// headline animation
document.fonts.ready.then(() => {
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
});

// items scroll animation
revealSection('#exprience .main-content .content');


/****************************************
**** portfolio section ****
****************************************/

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

// headilne animation
document.fonts.ready.then(() => {
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

// off "a" tag page load
document.querySelectorAll("#portfolio article a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
  });
});


/****************************************
**** plan section ****
****************************************/

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

// headline animation
document.fonts.ready.then(() => {
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
});

// tab logic
document.querySelectorAll("#plan button").forEach(btn => {
  btn.addEventListener("click", () => { // when click any tab button
    document.querySelectorAll("#plan button").forEach(b => {
      b.classList.remove("bg-primary"); // remove active class from all buttons
    });
    btn.classList.add("bg-primary"); // add active class to clicked button
    document.querySelectorAll("#plan .card").forEach(card => card.classList.add("hidden"));
    const target = btn.getAttribute("data-target"); // get target card id from button data attribute
    document.getElementById(target).classList.remove("hidden"); // show target card
  });
});


/****************************************
**** testimonial section ****
****************************************/

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

// headline animation
document.fonts.ready.then(() => {
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
});

// slide logic
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


/****************************************
**** tech-stack section ****
****************************************/

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

// headline animation
document.fonts.ready.then(() => {
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
});

// items scroll animation
revealSection('#tech-stack .main-content div');


/****************************************
**** contact section ****
****************************************/

// save draft data to local storage
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
  document.getElementById("formPopup").classList.add("flex");
});
document.querySelector("#formPopup button").addEventListener("click", () => {
  document.getElementById("formPopup").classList.add("hidden");
  document.getElementById("formPopup").classList.remove("flex");
});

// apply draft data from local storage
const saved = localStorage.getItem("contactDraft");
if (saved) {
  const data = JSON.parse(saved);
  const inputs = document.querySelectorAll("form input, form textarea");
  inputs.forEach((field, i) => {
    const key = field.placeholder || `field${i}`;
    if (data[key]) field.value = data[key];
  });
}

// headline animation
document.fonts.ready.then(() => {
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
});

// items scroll animation
revealSection('form input, form textarea');

// formsubmit.co ajax responce
document.querySelector("form").addEventListener('submit', function(e) {
  e.preventDefault(); // no page refresh
  fetch('https://formsubmit.co/ajax/ovikbiswas01@gmail.com', {
    method: 'POST',
    body: new FormData(document.querySelector("form")), // get data for send
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    // success responce
    .then(data => {
    document.getElementById("formSubmitSuccess").classList.remove("hidden");
    document.getElementById("formSubmitSuccess").classList.add("flex");
    document.querySelector("#formSubmitSuccess button").addEventListener("click", () => {
      document.getElementById("formSubmitSuccess").classList.add("hidden");
      document.getElementById("formSubmitSuccess").classList.remove("flex");
    });
    localStorage.removeItem("contactDraft"); // remove draft from local storage
    document.querySelector("form").reset(); // reset form
    })
    // error responce
  .catch(error => {
    alert("Something went wrong! Please see the console for more info.");
    console.error(error);
  });
});


/****************************************
**** faq section ****
****************************************/

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

// headline animation
document.fonts.ready.then(() => {
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
});

// faq toggle
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling; // get corresponding answer
    const icon = question.querySelector(".icon"); // get icon
    // show answer
    if (answer.classList.contains("max-h-[200px]")) {
      answer.classList.remove("max-h-[200px]", "py-4");
      icon.textContent = "+";
      return;
    }
    // hide all other answers
    document.querySelectorAll(".faq-answer").forEach((e) => {
      e.classList.remove("max-h-[200px]", "py-4");
      e.previousElementSibling.querySelector(".icon").textContent = "+";
    });
    // default
    answer.classList.add("max-h-[200px]", "py-4");
    icon.textContent = "–";
  });
});

// items scroll animation
revealSection('#faq .faq-item');


/****************************************
**** footer ****
****************************************/

// dynamic year
document.querySelector("#year").innerHTML = new Date().getFullYear();