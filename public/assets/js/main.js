/**
 * Template Name: Personal - v2.0.1
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

!(function ($) {
  "use strict";

  // Nav Menu
  $(document).on("click", ".nav-menu a, .mobile-nav a", function (e) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if (hash == "#header") {
          $("#header").removeClass("header-top");
          $("section").removeClass("section-show");
          return;
        }

        if (!$("#header").hasClass("header-top")) {
          $("#header").addClass("header-top");
          setTimeout(function () {
            $("section").removeClass("section-show");
            $(hash).addClass("section-show");
          }, 350);
        } else {
          $("section").removeClass("section-show");
          $(hash).addClass("section-show");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close",
          );
          $(".mobile-nav-overly").fadeOut();
        }

        return false;
      }
    }
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>',
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close",
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close",
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Skills section
  $(".skills-content").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    {
      offset: "80%",
    },
  );

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      900: {
        items: 3,
      },
    },
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
    });
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function () {
    $(".venobox").venobox();
  });
})(jQuery);

// var strings = [
//   "IT Specialist",
//   "&amp; UX/UI Designer",
//   "&amp; Software Developer",
// ];

// var typed = new Typed("#typing", {
//   strings: ["IT Specialist", "UX/UI Designer", "Software Developer"],
//   typeSpeed: 80,
//   backSpeed: 50,
//   backDelay: 1500,
//   loop: true,
// });

// Typewriter effect function
function typewriterEffect(
  elementId,
  strings,
  typeSpeed = 100,
  backSpeed = 50,
  backDelay = 1500,
) {
  const element = document.getElementById(elementId);
  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentString = strings[stringIndex];

    if (isDeleting) {
      element.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentString.length) {
      // Pause at end of string
      setTimeout(() => {
        isDeleting = true;
        type();
      }, backDelay);
    } else if (isDeleting && charIndex === 0) {
      // Move to next string
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      setTimeout(type, 500); // Short pause before starting next string
    } else {
      // Continue typing or deleting
      const speed = isDeleting ? backSpeed : typeSpeed;
      setTimeout(type, speed);
    }
  }

  // Start the effect
  type();
}

// Usage: Call this function when the page loads or DOM is ready
// Assuming you have an element with id="typing" in your HTML
document.addEventListener("DOMContentLoaded", function () {
  typewriterEffect("typing", [
    "IT Specialist !!",
    "Web developer !!",
    "UX/UI Designer !!",
  ]);
});

// const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
// let currentIndex = 0;
// const bgContainer = document.getElementById("bg-container");

// function changeBackground() {
//   // 1. Add fade-out class
//   bgContainer.classList.add("fade-out");

//   // 2. Wait for fade-out to finish, then swap image
//   setTimeout(() => {
//     currentIndex = (currentIndex + 1) % images.length;
//     bgContainer.style.backgroundImage = `url(${images[currentIndex]})`;

//     // 3. Remove fade-out class to fade back in
//     bgContainer.classList.remove("fade-out");
//   }, 1000); // Should match the CSS transition duration
// }

// // Change every 5 seconds
// setInterval(changeBackground, 5000);

// // Background image transition script
// function createBackgroundTransition(
//   images,
//   transitionDuration = 2000,
//   interval = 5000,
// ) {
//   // Create container div
//   const container = document.createElement("div");
//   container.id = "background-transition";
//   container.style.position = "fixed";
//   container.style.top = "0";
//   container.style.left = "0";
//   container.style.width = "100%";
//   container.style.height = "100%";
//   container.style.zIndex = "-1";
//   container.style.overflow = "hidden";

//   // Create two background divs
//   const bg1 = document.createElement("div");
//   bg1.id = "bg1";
//   bg1.style.position = "absolute";
//   bg1.style.top = "0";
//   bg1.style.left = "0";
//   bg1.style.width = "100%";
//   bg1.style.height = "100%";
//   bg1.style.backgroundSize = "cover";
//   bg1.style.backgroundPosition = "center";
//   bg1.style.backgroundRepeat = "no-repeat";
//   bg1.style.transition = `opacity ${transitionDuration}ms ease`;
//   bg1.style.opacity = "1";

//   const bg2 = document.createElement("div");
//   bg2.id = "bg2";
//   bg2.style.position = "absolute";
//   bg2.style.top = "0";
//   bg2.style.left = "0";
//   bg2.style.width = "100%";
//   bg2.style.height = "100%";
//   bg2.style.backgroundSize = "cover";
//   bg2.style.backgroundPosition = "center";
//   bg2.style.backgroundRepeat = "no-repeat";
//   bg2.style.transition = `opacity ${transitionDuration}ms ease`;
//   bg2.style.opacity = "0";

//   container.appendChild(bg1);
//   container.appendChild(bg2);
//   document.body.appendChild(container);

//   let currentBg = bg1;
//   let nextBg = bg2;
//   let currentIndex = 0;

//   // Set initial image
//   currentBg.style.backgroundImage = `url(${images[0]})`;

//   // Function to transition to next image
//   function transitionToNext() {
//     currentIndex = (currentIndex + 1) % images.length;
//     nextBg.style.backgroundImage = `url(${images[currentIndex]})`;
//     nextBg.style.opacity = "1";
//     currentBg.style.opacity = "0";

//     // After transition, swap roles
//     setTimeout(() => {
//       const temp = currentBg;
//       currentBg = nextBg;
//       nextBg = temp;
//       nextBg.style.opacity = "0";
//     }, transitionDuration);
//   }

//   // Start cycling
//   setInterval(transitionToNext, interval);
// }

// // Usage: Call this function when the page loads
// // Replace the image URLs with your actual image paths
// document.addEventListener("DOMContentLoaded", function () {
//   const backgroundImages = [
//     "../Images/Dev\(1\).png", // Replace with your image paths
//     "../Images/H@cker.jpg",
//     "assets/Images/img/portfolio/3.jpg",
//   ];

//   createBackgroundTransition(backgroundImages);
// });

// Select all counters
const counters = document.querySelectorAll(".counter");

// Function to animate counting
const startCounting = (counter) => {
  const target = +counter.getAttribute("data-target");
  const speed = 100; // adjust speed here

  const updateCount = () => {
    const current = +counter.innerText;
    const increment = target / speed;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 15);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
};

// Trigger when section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  },
);

// Observe each counter
counters.forEach((counter) => {
  observer.observe(counter);
});

//Background Image transition script
const images = ["programmer.png", "H@cker.png"];
let currentIndex = 0;
const bgContainer = document.getElementById("bg-container");

function changeBackground() {
  // 1. Add fade-out class
  bgContainer.classList.add("fade-out");

  // 2. Wait for fade-out to finish, then swap image
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    bgContainer.style.backgroundImage = `url(${images[currentIndex]})`;

    // 3. Remove fade-out class to fade back in
    bgContainer.classList.remove("fade-out");
  }, 1000); // Should match the CSS transition duration
}

// Change every 5 seconds
setInterval(changeBackground, 5000);
