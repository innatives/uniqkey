$(document).ready(function () {
  // Event listener for when the input field loses focus
  $(".email-input").on("blur", function () {
    // Fetch the value of the input field
    var emailValue = $(this).val();

    // Print the value to the console
    console.log("Email:", emailValue);
  });
});

// when the DOM is ready
$(document).ready(function () {
  // make an array of invalid domains
  const invalidDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "competitor.com",
  ];

  // get the submit button
  const submitBtn = $(".hack-button");
  // on submit button click
  submitBtn.click(() => {
    // get the email field
    const email = $(".email-input");
    // split email at '@' character to get domain
    const domainPart = email.val().split("@")[1];

    // if the domain exists in the invalidDomains array
    if (invalidDomains.indexOf(domainPart) !== -1) {
      // clear email field
      email.val("");
      // add a 'use business mail' placeholder
      email.attr("placeholder", "Please enter a business email");
      // prevent form submission
      return false;
    } else {
      // else if email is not invalid
      // submit form
      return true;
    }
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
        }),
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

/*
//TABS UNDERLINE
// ———— Store variables
const navLinks = document.querySelectorAll("[tblnk]");
const navCorners = document.querySelector(".tabs_underline");

navLinks.forEach(function (link) {
  	// ———— Give active link a combo class after removing it from other links
  link.addEventListener("click", function () {
    navLinks.forEach(function (link) {
      link.classList.remove("is--active");
    });
    this.classList.add("is--active");
  });

  // ———— Move unbderline into link we're hovering
  link.addEventListener("mouseenter", function () {
    const state = Flip.getState(navCorners);
    this.appendChild(navCorners);
    Flip.from(state, {
      duration: 0.4,
      ease: "power1.inOut"
    });
  });

  // ———— Move underline back to active link on hover out
  link.addEventListener("mouseleave", function () {
    const state = Flip.getState(navCorners);
    const activeLink = document.querySelector("[tblnk].w--current");
    activeLink.appendChild(navCorners);
    Flip.from(state, {
      duration: 0.4,
      ease: "power1.inOut"
    });
  });
});
*/
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

/*
//COMPARISION CHARTS
document.addEventListener("DOMContentLoaded", function () {
  // 1. Select the Bars
  let bars = document.querySelectorAll(".comp_param_chart_bar");

  // Define the animation function
  function animateBars() {
    bars.forEach((bar) => {
      // 2. Find the nearest .comp_param_chart_value--fs7.1-fw2-pl1
      let valueElement = bar.querySelector("[score-value]");

      if (valueElement) {
        // 3. Extract Value and Convert
        let value = parseFloat(valueElement.innerText.trim());

        if (!isNaN(value)) {
          let percentage = value * 10;

          // 4. Use GSAP to animate the width
          gsap.fromTo(
            bar,
            { width: "0%" },
            { width: `${percentage}%`, duration: 1 }
          );
        }
      }
    });
  }

  // Initialize ScrollTrigger
  let wrapper = document.querySelector(".comparision_chart_wrap");

  if (wrapper) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        ease: "Power1.easeOut",
        start: "top center", // Adjust as needed
        onEnter: () => animateBars(),
        once: true // Ensures the animation only triggers once
      }
    });
  } else {
    console.error("No element found with class .comparision_chart_wrap");
  }
});

//CHART COLOR
document.addEventListener("DOMContentLoaded", function () {
  const attributes = [
    "ease-of-use",
    "admin",
    "setup",
    "support",
    "authentification",
    "login",
    "extension"
  ];

  attributes.forEach((attribute) => {
    // 1. Find all elements with the current attribute
    let elementsWithAttribute = document.querySelectorAll(`[${attribute}]`);

    if (elementsWithAttribute.length === 0) {
      console.error(`No elements found with attribute '${attribute}'`);
      return;
    }

    // 2. For each of those elements, get the numeric value from its child with the `score-value` attribute
    let scores = Array.from(elementsWithAttribute).map((element) => {
      let scoreElement = element.querySelector("[score-value]");
      if (!scoreElement) return { element: element, score: -Infinity }; // defaulting to -Infinity if score not found
      return {
        element: element,
        score: parseFloat(scoreElement.textContent.trim())
      };
    });

    // 3. Identify the element with the highest score
    let maxScoreElement = scores.reduce((prev, current) => {
      return prev.score > current.score ? prev : current;
    }).element;

    // 4. Find the corresponding `[chart-bar]` for the maxScoreElement and apply the `cm0-2` class
    let correspondingChartBar = maxScoreElement.querySelector("[chart-bar]");
    if (correspondingChartBar) {
      correspondingChartBar.classList.add("cm0-2");
    } else {
      console.error(
        `No [chart-bar] found associated with the element having max score for attribute '${attribute}'`
      );
    }
  });
});

var input = document.querySelector("#phone"),
  dialCode = document.querySelector(".dialCode"),
  errorMsg = document.querySelector("#error-msg"),
  validMsg = document.querySelector("#valid-msg");

var iti = intlTelInput(input, {
  initialCountry: "dk",
  placeholderNumberType: "FIXED_LINE"
});

var updateInputValue = function (event) {
  dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
};
input.addEventListener("input", updateInputValue, false);
input.addEventListener("countrychange", updateInputValue, false);

var errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number"
];

var reset = function () {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
};

input.addEventListener("blur", function () {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
});

input.addEventListener("change", reset);
input.addEventListener("keyup", reset);

document.addEventListener("DOMContentLoaded", function () {
  // 1. Find all elements with [recommend-value] attribute
  let valueElements = document.querySelectorAll("[recommend-value]");

  valueElements.forEach((valueElement) => {
    // 2. Extract Value and Convert to Percentage
    let value = parseFloat(valueElement.innerText.trim());

    if (!isNaN(value)) {
      let percentage = `${value}%`;

      // 3. Find the corresponding [recommend-bar] element
      let barElement = valueElement.closest("[recommend-bar]");

      if (barElement) {
        // 4. Set Height
        barElement.style.height = percentage;
      }
    }
  });
});

*/

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
/*
gsap.utils.toArray("[sanimate]").forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    duration: 0.3,
    markers: false,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%", // Adjust this value based on when you want the animation to start
      end: "bottom 20%", // Adjust this value based on when you want the animation to end
      toggleActions: "play none none reverse"
    }
  });
});
*/
/*
// CARD ANIMATION ON LOAD
function pageLoad() {
  let tl = gsap.timeline({ delay: 0.5 });
  tl.from("[animcard]", {
    scale: 0.6,
    opacity: 0,
    stagger: { each: 0.2, from: "start" },
    ease: "power2.out",
    duration: 0.3
  });
}
pageLoad();
*/

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
  },
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
    },
  );
});

/*   
  tl.from($(this).find(".card_sg_icon"), {
    scale: 0.2,
    opacity: 0,
    stagger: { each: 0.1, from: "start" },
    ease: "power2.out",
    duration: 0.1
  });

tl.from($(this).find(".card_sg_wrap--br2,.card_full--pd2-br2,[canimate]"), {
    scale: 0.9,
    opacity: 0,
    stagger: { each: 0.2, from: "start" },
    ease: "power2.out",
    duration: 0.2
  });
*/

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
        },
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
      ".card_sg_icon,.hero_header_second--fs5,.features_text--fs7,.button_wrap",
    ),
    {
      opacity: 80,
      y: 300,
      ease: "power3.out",
      duration: 0.2,
    },
  );
});

/*
//LOTTIE
const animation = lottie.loadAnimation({
  container: document.querySelector(".hero_lottie_animation"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path:
    "https://assets-global.website-files.com/6551ee66d6f9c36816491aaf/6558c0184b526a29619a0c7f_homepage-main-v10.json"
});

const lottiePlayhead = { frame: 0 };
animation.addEventListener("data_ready", () => {
  gsap.to(lottiePlayhead, {
    frame: animation.totalFrames - 1,
    ease: "none",
    onUpdate: () => animation.goToAndStop(lottiePlayhead.frame, true),
    scrollTrigger: {
      trigger: "[homeanim]",
      pin: false,
      start: "top top",
      end: "+=200%",
      scrub: 4,
      markers: false
    }
  });
});
*/

const chartMain = document.querySelector(".chart_tabs");
const chart1 = document.querySelector("[chartBar]");
const chart2 = document.querySelector("[chartBar2]");
const chartnmb = gsap.utils.toArray("[chartNumber]");

const tl = gsap.timeline({});
tl.to(chart1, {
  width: "100%",
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});
tl.to(
  chart2,
  {
    width: "40%",
    duration: 1,
    ease: "power3.out",
  },
  "<10%",
);
tl.from(
  chartnmb,
  {
    opacity: 0,
    duration: 0.5,
    ease: "power3.out",
  },
  "<15%",
);

/*!
 * DrawSVGPlugin 3.7.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (t) {
  "use strict";
  var e,
    n,
    r,
    i,
    s,
    o = function () {
      return "undefined" != typeof window;
    },
    a = function () {
      return e || (o() && (e = window.gsap) && e.registerPlugin && e);
    },
    f = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    h = {
      rect: ["width", "height"],
      circle: ["r", "r"],
      ellipse: ["rx", "ry"],
      line: ["x2", "y2"],
    },
    d = function (t) {
      return Math.round(1e4 * t) / 1e4;
    },
    u = function (t) {
      return parseFloat(t) || 0;
    },
    l = function (t, e) {
      var n = u(t);
      return ~t.indexOf("%") ? (n / 100) * e : n;
    },
    g = function (t, e) {
      return u(t.getAttribute(e));
    },
    c = Math.sqrt,
    _ = function (t, e, n, r, i, s) {
      return c(Math.pow((u(n) - u(t)) * i, 2) + Math.pow((u(r) - u(e)) * s, 2));
    },
    p = function (t) {
      return "non-scaling-stroke" === t.getAttribute("vector-effect");
    },
    y = function (t) {
      if (!(t = n(t)[0])) return 0;
      var e,
        r,
        i,
        s,
        o,
        a,
        d,
        u = t.tagName.toLowerCase(),
        l = t.style,
        y = 1,
        x = 1;
      p(t) &&
        ((x = t.getScreenCTM()),
        (y = c(x.a * x.a + x.b * x.b)),
        (x = c(x.d * x.d + x.c * x.c)));
      try {
        r = t.getBBox();
      } catch (t) {}
      var w = r || {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        },
        v = w.x,
        P = w.y,
        b = w.width,
        k = w.height;
      if (
        ((r && (b || k)) ||
          !h[u] ||
          ((b = g(t, h[u][0])),
          (k = g(t, h[u][1])),
          "rect" !== u && "line" !== u && ((b *= 2), (k *= 2)),
          "line" === u &&
            ((v = g(t, "x1")),
            (P = g(t, "y1")),
            (b = Math.abs(b - v)),
            (k = Math.abs(k - P)))),
        "path" === u)
      )
        (s = l.strokeDasharray),
          (l.strokeDasharray = "none"),
          (e = t.getTotalLength() || 0),
          (e *= (y + x) / 2),
          (l.strokeDasharray = s);
      else if ("rect" === u) e = 2 * b * y + 2 * k * x;
      else if ("line" === u) e = _(v, P, v + b, P + k, y, x);
      else if ("polyline" === u || "polygon" === u)
        for (
          i = t.getAttribute("points").match(f) || [],
            "polygon" === u && i.push(i[0], i[1]),
            e = 0,
            o = 2;
          o < i.length;
          o += 2
        )
          e += _(i[o - 2], i[o - 1], i[o], i[o + 1], y, x) || 0;
      else
        ("circle" !== u && "ellipse" !== u) ||
          ((a = (b / 2) * y),
          (d = (k / 2) * x),
          (e = Math.PI * (3 * (a + d) - c((3 * a + d) * (a + 3 * d)))));
      return e || 0;
    },
    x = function (t, e) {
      if (!(t = n(t)[0])) return [0, 0];
      e || (e = y(t) + 1);
      var i = r.getComputedStyle(t),
        s = i.strokeDasharray || "",
        o = u(i.strokeDashoffset),
        a = s.indexOf(",");
      return (
        a < 0 && (a = s.indexOf(" ")),
        (s = a < 0 ? e : u(s.substr(0, a))) > e && (s = e),
        [-o || 0, s - o || 0]
      );
    },
    w = function () {
      o() &&
        ((r = window),
        (s = e = a()),
        (n = e.utils.toArray),
        (i = -1 !== ((r.navigator || {}).userAgent || "").indexOf("Edge")));
    },
    v = {
      version: "3.7.1",
      name: "drawSVG",
      register: function (t) {
        (e = t), w();
      },
      init: function (t, e, n, o, a) {
        if (!t.getBBox) return !1;
        s || w();
        var f,
          h,
          g,
          c = y(t);
        return (
          (this._style = t.style),
          (this._target = t),
          e + "" == "true"
            ? (e = "0 100%")
            : e
            ? -1 === (e + "").indexOf(" ") && (e = "0 " + e)
            : (e = "0 0"),
          (h = (function (t, e, n) {
            var r,
              i,
              s = t.indexOf(" ");
            return (
              s < 0
                ? ((r = void 0 !== n ? n + "" : t), (i = t))
                : ((r = t.substr(0, s)), (i = t.substr(s + 1))),
              (r = l(r, e)) > (i = l(i, e)) ? [i, r] : [r, i]
            );
          })(e, c, (f = x(t, c))[0])),
          (this._length = d(c)),
          (this._dash = d(f[1] - f[0])),
          (this._offset = d(-f[0])),
          (this._dashPT = this.add(this, "_dash", this._dash, d(h[1] - h[0]))),
          (this._offsetPT = this.add(this, "_offset", this._offset, d(-h[0]))),
          i &&
            (g = r.getComputedStyle(t)).strokeLinecap !== g.strokeLinejoin &&
            ((h = u(g.strokeMiterlimit)),
            this.add(t.style, "strokeMiterlimit", h, h + 0.01)),
          (this._live = p(t) || ~(e + "").indexOf("live")),
          (this._nowrap = ~(e + "").indexOf("nowrap")),
          this._props.push("drawSVG"),
          1
        );
      },
      render: function (t, e) {
        var n,
          r,
          i,
          s,
          o = e._pt,
          a = e._style;
        if (o) {
          for (
            e._live &&
            (n = y(e._target)) !== e._length &&
            ((r = n / e._length),
            (e._length = n),
            e._offsetPT && ((e._offsetPT.s *= r), (e._offsetPT.c *= r)),
            e._dashPT
              ? ((e._dashPT.s *= r), (e._dashPT.c *= r))
              : (e._dash *= r));
            o;

          )
            o.r(t, o.d), (o = o._next);
          (i = e._dash || (t && 1 !== t && 1e-4) || 0),
            (n = e._length - i + 0.1),
            (s = e._offset),
            i &&
              s &&
              i + Math.abs(s % e._length) > e._length - 0.2 &&
              (s += s < 0 ? 0.1 : -0.1) &&
              (n += 0.1),
            (a.strokeDashoffset = i ? s : s + 0.001),
            (a.strokeDasharray =
              n < 0.2
                ? "none"
                : i
                ? i + "px," + (e._nowrap ? 999999 : n) + "px"
                : "0px, 999999px");
        }
      },
      getLength: y,
      getPosition: x,
    };
  a() && e.registerPlugin(v),
    (t.DrawSVGPlugin = v),
    (t.default = v),
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
});

gsap.registerPlugin(DrawSVGPlugin);
const tween = gsap.timeline({});
tween.fromTo(
  "#circleUniqkey",
  { drawSVG: "0% 0%" },
  { drawSVG: "25% 0%", duration: 2, delay: 1 },
);
tween.from("[piechartUniqkey]", {
  opacity: 0,
  duration: 0.5,
});

tween.from(
  "#circleCompetition",
  {
    duration: 4,
    drawSVG: "0%",
    ease: "power1.inOut",
    delay: 1,
    // Optional: to make the animation repeat indefinitely
  },
  "0",
);
tween.from("[piechartCompetition]", {
  opacity: 0,
  duration: 0.5,
});

// Mutation Observer callback function
function mutationCallback(mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      let targetElement = mutation.target;
      if (targetElement.classList.contains("w--current")) {
        tl.restart();
        tween.restart();
      }
    }
  }
}

// Create a new MutationObserver and pass the callback function
const observer = new MutationObserver(mutationCallback);

// Options for the observer (which mutations to observe)
const config = { attributes: true, attributeFilter: ["class"] };

// Start observing the specific element
const elementToObserve = document.querySelector(
  ".tab_link_text--bg0-fs7-fc2-ph0-2.is-top.w-inline-block.w-tab-link",
);
if (elementToObserve) {
  observer.observe(elementToObserve, config);
}
