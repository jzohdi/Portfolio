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
const mobileAndTabletcheck = function() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function Utility() {}

Utility.prototype = {
  constructor: Utility,
  isElementInView: function(element, fullyInView, padding = 0) {
    const pageTop = $(window).scrollTop();
    const pageBottom = pageTop + $(window).height();
    const elementTop = element.offset().top;
    const elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
      return pageTop < elementTop && pageBottom > elementBottom;
    } else {
      return (
        elementTop + padding <= pageBottom && elementBottom + padding >= pageTop
      );
    }
  }
};
window.initialScroll;
const Utils = new Utility();
const mobileTablet = mobileAndTabletcheck();
const padding = mobileTablet ? 400 : 0;
var lastRun = null;

function oneIn2Min() {
  if (lastRun == null || new Date().getTime() - lastRun > 3000) {
    document.getElementById("myBtn").style.display = "none";
  }
  lastRun = new Date().getTime();
}

window.addEventListener("scroll", function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";

    setTimeout(oneIn2Min, 3000);
  } else {
    document.getElementById("myBtn").style.display = "none";
  }

  // console.log("scrolling");
  const langSection = $("#languages-section");
  const isLangInView = Utils.isElementInView(langSection, false, padding);
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
  const isAboutInView = Utils.isElementInView(
    aboutSection,
    !mobileTablet,
    padding
  );
  if (isAboutInView) {
    // console.log("in view");
    aboutSection.removeClass("my-hide").addClass("fade-in-left");
  }

  //   const educationSection = $("#education-section");
  //   const isEducationInView = Utils.isElementInView(educationSection, true);
  //   if (isEducationInView) {
  //     educationSection.removeClass("my-hide").addClass("fade-in-left");
  //   }
});

// const emailButton = $("#email-button");
const emailButton = document.getElementById("email-button");
emailButton.addEventListener("click", function() {
  window.open(String("mailto:jzohdi^terpmail.umd.edu").replace("^", "@"));
});

const sections = [
  ".second-page-section",
  ".third-page-section",
  ".fourth-page-section"
];
const navButtons = ["nav-about", "nav-projects", "nav-contact"];
navButtons.forEach(function(element, index) {
  document.getElementById(element).addEventListener("click", function() {
    scrollTo(sections[index]);
    $("#toggle-nav-button").click();
  });
});
const scrollTo = function(section) {
  $("#toggle-nav-button").click();
  $("html,body").animate(
    {
      scrollTop: $(section).offset().top
    },
    "slow"
  );
};

const topFunction = function() {
  scrollTo("#main-body");
};
