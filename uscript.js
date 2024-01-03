$(document).ready(function () {
  // Event listener for when the input field loses focus
  $(".email-input").on("blur", function () {
    // Fetch the value of the input field
    var emailValue = $(this).val();

    // Print the value to the console
    console.log("Email:", emailValue);
  });
});

$(".products_link").on("mouseenter", function () {
  // Find the .btn_main_icon inside the hovered .products_link
  let btnMainIcon = $(this).find(".btn_main_icon");

  // Remove the is-hidden class from the found .btn_main_icon
  btnMainIcon.removeClass("is-hidden");
});

//AUTO SWITCH TABS
var Webflow = Webflow || [];
Webflow.push(function () {
  // Fix for Safari
  if (navigator.userAgent.includes("Safari")) {
    document.querySelectorAll("[tabs-link]").forEach(
      (t) =>
        (t.focus = function () {
          const x = window.scrollX,
            y = window.scrollY;
          const f = () => {
            setTimeout(() => window.scrollTo(x, y), 1);
            t.removeEventListener("focus", f);
          };
          t.addEventListener("focus", f);
          HTMLElement.prototype.focus.apply(this, arguments);
        })
    );
  }

  // Start Tabs
  var tabTimeout;
  clearTimeout(tabTimeout);
  tabLoop();

  // Connect your class names to elements.
  function tabLoop() {
    tabTimeout = setTimeout(function () {
      var $next = $("[tabs-menu]").children(".w--current:first").next();

      if ($next.length) {
        $next.click(); // user click resets timeout
      } else {
        $("[tabs-link]:first").click();
      }
    }, 10000); // 5 Second Rotation
  }

  // Reset Loops
  $("[tabs-link]").click(function () {
    clearTimeout(tabTimeout);
    tabLoop();
  });
});

// MENU LINKS
$("[tblnk]").on("mouseenter", function () {
  let state = Flip.getState(".tabs_underline");
  $(".tabs_underline").appendTo($(this));
  Flip.from(state, {
    duration: 0.4,
    ease: "power2.out",
  });
});
$("[tabs-menu2]").on("mouseleave", function () {
  let state = Flip.getState(".tabs_underline");
  $(".tabs_underline").appendTo($("[tblnk].w--current"));
  Flip.from(state, {
    duration: 0.4,
    ease: "power2.out",
  });
});

//TEXT ANIMATE

$("[animate]").each(function (index) {
  let typeSplit = new SplitType(this, {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from($(this).find(".word"), {
    opacity: 0.3,
    duration: 0.2,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: this,
      start: "top 60%",
      end: "top 90%",
      scrub: true,
    },
  });
});

$("[animate2]").each(function (index) {
  let typeSplit = new SplitType(this, {
    types: "lines, words, chars",
    tagName: "span",
  });

  gsap.from($(this).find(".word"), {
    opacity: 0.3,
    duration: 0.2,
    ease: "power3.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: this,
      start: "top 80%",
      end: "top 90%",
      scrub: true,
    },
  });
});

$(".products_link").hover(
  function () {
    // This function is triggered when the mouse enters the .products_link element
    $(this).find("[is-link]").addClass("is-hover");
    $(this).find(".btn_main_icon.is-menu").addClass("is-hover");
  },
  function () {
    // This function is triggered when the mouse leaves the .products_link element
    $(this).find("[is-link]").removeClass("is-hover");
    $(this).find(".btn_main_icon.is-menu").removeClass("is-hover");
  }
);

$("[cards-animate]").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: this,
      start: "top 70%", // adjust this value to control when the animation starts
      end: "bottom 20%", // adjust this value to control when the animation ends
      scrub: false,
      markers: false, // you can remove markers if you don't need them
    },
  });
  tl.from($(this).find(".card_sg_wrap--br2,.card_full--pd2-br2,[canimate]"), {
    opacity: 0,

    y: 20,
    ease: "power4.out",
    duration: 0.2,
  });
  tl.from(
    $(this).find(".card_sg_icon,.features_header--fs6,.features_text--fs7"),
    {
      opacity: 0,
      y: 20,
      ease: "power1.out",
      duration: 0.3,
    }
  );
});

$(document).ready(function () {
  $("#submitForm").click(function () {
    var userEmail = $("#email").val(); // Get the email value
    console.log(userEmail); // Print the email to the console

    localStorage.setItem("userEmail", userEmail); // Store the email in localStorage
  });
});

$(document).ready(function () {
  var retrievedEmail = localStorage.getItem("userEmail"); // Retrieve the email from localStorage

  if (retrievedEmail) {
    $("#email").val(retrievedEmail); // Set the email as the value of the email input field
  }
});

$(document).ready(function () {
  $("[stats]").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 1500,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
});

//ANIMATE INTRO CARD
$("[herobottom]").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: this,
      start: "top 50%", // adjust this value to control when the animation starts
      end: "bottom 80%", // adjust this value to control when the animation ends
      scrub: false,
      markers: false, // you can remove markers if you don't need them
    },
  });
  tl.from($(this).find("[headerbottom]"), {
    opacity: 0,
    y: 80,
    ease: "power4.out",
    duration: 0.2,
  });
  tl.from($(this).find("[cardhero]"), {
    opacity: 0,
    y: 80,
    ease: "power1.out",
    duration: 0.2,
  });
  tl.from(
    $(this).find(
      ".card_sg_icon,.hero_header_second--fs5,.features_text--fs7,.button_wrap"
    ),
    {
      opacity: 80,
      y: 300,
      ease: "power3.out",
      duration: 0.2,
    }
  );
});

const animation = lottie.loadAnimation({
  container: document.querySelector(".hero_lottie_animation"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets-global.website-files.com/6551ee66d6f9c36816491aaf/6558c0184b526a29619a0c7f_homepage-main-v10.json",
});

const lottiePlayhead = { frame: 0 };
animation.addEventListener("data_ready", () => {
  gsap.to(lottiePlayhead, {
    frame: animation.totalFrames - 1,
    ease: "none",
    onUpdate: () => animation.goToAndStop(lottiePlayhead.frame, true),
    scrollTrigger: {
      trigger: "#homePin",
      pin: true,
      start: "top top",
      end: "+=2000",
      scrub: 2,
      markers: true,
    },
  });
});
