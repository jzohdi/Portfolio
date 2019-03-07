$(document).ready(function() {
  $(this).scrollTop(0);
});

const randomInRange = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const CSS_STRING =
  ".grow-centerRowPlaceholder { width: 100vw; height: 20px; background-color: colorPlaceholder; -webkit-animation-duration: durationPlaceholders; animation-duration: " +
  "durationPlaceholders; animation-timing-function: ease-out; -webkit-animation-name: grow-centerRowPlaceholder; animation-name: grow-centerRowPlaceholder; } @keyframes grow-center" +
  "RowPlaceholder { 0% { transform: translate(0, 100vh);} 100% { transform: translate(0, 0);}}";
function init() {
  const duration = [0.4];
  const animateSection = $("#starter-animation");
  const cssSection = $("#addStyles");
  if (sessionStorage.getItem("previouslyLoaded") !== "true") {
    $("#content").addClass("hide-page");
    $("#main-body").addClass("hide-over-flow");
    let viewHeight = window.innerHeight;
    let num = viewHeight / 20;

    for (let x = 0; x < num; x++) {
      duration.push(duration[x] + 0.07);
    }
    for (let i = 0; i < num; i++) {
      const divString = '<div class="grow-center' + i + '"></div>';
      animateSection.append(divString);
      const durReg = new RegExp("durationPlaceholder", "g");
      const rowReg = new RegExp("RowPlaceholder", "g");
      const cssString = CSS_STRING.replace(durReg, duration[i])
        .replace(rowReg, i)
        .replace("colorPlaceholder", "black");
      cssSection.append(cssString);
    }
  }

  setTimeout(function() {
    showContent(animateSection, cssSection);
    setTimeout(function() {
      sessionStorage.setItem("previouslyLoaded", "true");
      initCanvas();
    }, 1000);
  }, duration[duration.length - 1] * 1000);
}
// init required for start up animation;
init();

function showContent(section, section2) {
  $("#content").removeClass("hide-page");
  $("#main-body").removeClass("hide-over-flow");
  section.empty();
  section2.empty();

  let cssString3 = ".fade-in-text,.fade-in-text2{ opacity: 1;}";
  section2.append(cssString3);
}

const initCanvas = () => {
  const canvas = document.getElementById("map-canvas");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
  // console.log(canvas.width, canvas.height);
  var opacity = 0;

  const ctx = canvas.getContext("2d");
  // ctx.fillRect(170, 180, 150, 100);
  function Particle(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 2;

    this.draw = function() {
      ctx.beginPath();
      ctx.fillStyle = "rgba(255, 255, 255, " + opacity.toString() + ")";
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = "rgba(255, 255, 255, " + opacity.toString() + ")";
      ctx.stroke();
      ctx.fill();
    };

    this.update = function() {
      if (opacity <= 1) {
        opacity += 0.0001;
      }
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };
  }
  const particles = [];

  for (let i = 0; i < 60; i++) {
    let new_x = randomInRange(0, canvas.width);
    let new_y = randomInRange(0, canvas.height);
    let new_dx = Math.random() * 1.5 * (Math.random() < 0.5 ? -1 : 1);
    let new_dy = Math.random() * 1.5 * (Math.random() < 0.5 ? -1 : 1);
    let newParticle = new Particle(new_x, new_y, new_dx, new_dy);
    particles.push(newParticle);
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(10, 104, 255, 1);";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
    });
  }

  animate();
};
function Utility() {}

Utility.prototype = {
  constructor: Utility,
  isElementInView: function(element, fullyInView) {
    const pageTop = $(window).scrollTop();
    const pageBottom = pageTop + $(window).height();
    const elementTop = $(element).offset().top;
    const elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
      return pageTop < elementTop && pageBottom > elementBottom + 30;
    } else {
      return elementTop <= pageBottom && elementBottom >= pageTop;
    }
  }
};

const Utils = new Utility();
window.addEventListener("scroll", function() {
  const langSection = $("#languages-section");
  const isLangInView = Utils.isElementInView(langSection, true);
  if (isLangInView) {
    langSection.removeClass("my-hide").addClass("fade-in-right");
    [
      "python-bar",
      "javascript-bar",
      "sql-bar",
      "java-bar",
      "c-bar",
      "react-bar"
    ].forEach(element => {
      $("#" + element).addClass(element);
    });
    // $("#python-bar").addClass("python-bar");
  }

  const aboutSection = $("#about-section");
  const isAboutInView = Utils.isElementInView(aboutSection, true);
  if (isAboutInView) {
    aboutSection.removeClass("my-hide").addClass("fade-in-left");
  }

  const educationSection = $("#education-section");
  const isEducationInView = Utils.isElementInView(educationSection, true);
  if (isEducationInView) {
    educationSection.removeClass("my-hide").addClass("fade-in-left");
  }
});
