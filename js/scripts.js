"use strict";

$(document).ready(function () {
  $(".slider__items-desc .h2").each(function (index, text) {
    var str = text.textContent.trim();
    var reg = new RegExp(/\s(\S*)/ig);
    var first = str.replace(reg, "");
    var last = str.match(reg).join().trim();
    this.innerHTML = first;
    this.insertAdjacentHTML("afterend", "<h3 class=\"h3\">".concat(last, "</h3>"));
  });
  var owl = $(".slider-carousel").owlCarousel({
    loop: true,
    items: 1,
    smartSpeed: 0,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true // autoHeight: true,

  });
  owl.on("translate.owl.carousel", function (evnt) {
    owl.trigger('left.owl.carousel');
  });
  $(".review__container").owlCarousel({
    loop: true,
    smartSpeed: 600,
    nav: false,
    autoHeight: true,
    responsive: {
      0: {
        items: 1
      },
      992: {
        items: 2
      }
    }
  });

  if (document.body.offsetWidth < 480) {
    window.addEventListener("scroll", function () {
      var header = document.querySelector(".header");
      var postion = header.getBoundingClientRect().top + window.pageYOffset;
      if (window.pageYOffset >= postion) header.style.position = "fixed";
      if (window.pageYOffset <= 0) header.style.position = "relative";
    });
  }

  $('#menu-hamburger').click(function (event) {
    event.preventDefault();
    var elem = document.querySelector(".site-navigation");
    var show = document.querySelector(".main-menu");
    this.classList.toggle('active');

    if (this.classList.contains("active")) {
      show.classList.add("show-menu");
    } else {
      show.classList.remove("show-menu");
    }
  });
  Array.from(document.getElementsByClassName("featured__card-perspective")).forEach(function (el) {
    el.onmousemove = skew;
    el.onmouseout = restart;
  });

  function skew(event) {
    var halfW = this.parentElement.offsetWidth / 2;
    var halfH = this.parentElement.offsetHeight / 2;
    var shiftX = (halfH - event.offsetY) / 30;
    var shiftY = (event.offsetX - halfW) / 30;
    var innerImg = event.currentTarget.querySelector(".featured__card-item-img-backward");
    event.currentTarget.style.transform = "rotateX(".concat(shiftX, "deg) rotateY(").concat(shiftY, "deg)");
    innerImg.style.transform = "translate(".concat(shiftX, "px,").concat(shiftY, "px)");
  }

  function restart(event) {
    event.currentTarget.style.transform = "rotateX(0) rotateY(0)";
  }

  function productsAnimate() {
    var allProducts = Array.from(document.getElementsByClassName("products-items"));
    allProducts.forEach(function (el) {
      el.addEventListener("mousemove", appearBtn);
      el.addEventListener("mouseout", hiddenBtn);
    });

    function appearBtn(event) {
      var header = event.currentTarget.querySelector(".products-items-desc .h3");
      var price = event.currentTarget.querySelector(".products-items-desc-price");
      var btn = event.currentTarget.querySelector(".products-items-desc .btn");
      setValue(header, 25, 0, 0, 50);
      setValue(price, 25, 25, 0, 50);
      setValue(btn, 25, 5, 1, 0);
    }

    ;

    function hiddenBtn(event) {
      var header = event.currentTarget.querySelector(".products-items-desc .h3");
      var price = event.currentTarget.querySelector(".products-items-desc-price");
      var btn = event.currentTarget.querySelector(".products-items-desc .btn");
      setValue(header, 25, 5, 1, 0);
      setValue(price, 25, 25, 1, 0);
      setValue(btn, 25, 0, 0, -25);
    }

    ;

    function setValue(name, time, delay, op, le) {
      name.style.transition = "opacity .".concat(time, "s .").concat(delay, "s linear, left .").concat(time, "s .").concat(delay, "s linear");
      name.style.opacity = op;
      name.style.left = le + "%";
    }
  }

  productsAnimate();

  function rideSweet() {
    window.addEventListener("scroll", function (e) {
      if (document.querySelector(".sweet")) {
        var curPos = window.pageYOffset;
        var sweet = document.querySelector(".sweet").offsetTop;
        var screen = document.documentElement.clientHeight;
        var el = document.querySelector(".sweet__description");

        if (curPos + screen > sweet) {
          el.style.top = 0;
          el.addEventListener("transitionend", function (e) {
            var animate = this.querySelector(".h2");
            animate.classList.add("pulse");
          });
        }
      }
    });
  }

  rideSweet();

  function countliter() {
    var basic = document.getElementsByClassName("quantity")[0];
    basic.addEventListener("click", function (e) {
      e.preventDefault();
      var count = document.querySelector(".quantity input");
      var digit = parseInt(count.value);
      var cell = document.querySelector(".goods__single-price span");
      var price = parseInt(cell.dataset.price);

      if (!isNaN(digit)) {
        switch (e.target.className) {
          case "plus":
            digit++;
            count.value = digit;
            break;

          case "minus":
            if (digit > 1) digit--;
            count.value = digit;
            break;
        }
      } else {
        count.value = 1;
      }

      cell.textContent = digit * price;
    });
  }

  ;
  countliter();

  function popup() {
    var elem = document.getElementsByClassName("popup__ovelay")[0];
    var close = elem.querySelector(".popup__close-line");
    var form = document.getElementsByClassName("get-form")[0];
    var change = elem.querySelector("input[type=number]");
    Array.of(elem, close).forEach(function (el) {
      el.addEventListener("click", function (e) {
        elem.style.opacity = 0;
        elem.addEventListener("transitionend", transEnd);
      });
    });

    function transEnd(e) {
      this.style.display = "none";
      this.style.zIndex = 1;
    }

    ;
    change.addEventListener("input", function (e) {
      var size = parseInt(this.value);
      var quantity = parseInt(document.querySelector(".goods__single-price span").dataset.price);
      var el = this.parentElement.querySelector(".popup__form-total span");
      el.textContent = size * quantity;
    });

    function showPopup(e) {
      var progres = 0;
      var parent = this.closest(".goods__single-desc");
      var name = parent.querySelector(".h2").textContent;
      var num = parseInt(parent.querySelector("input[name=num]").value);
      var quantity = parseInt(parent.querySelector(".goods__single-price span").dataset.price);
      var popup = elem.querySelector(".popup__form");
      var total = popup.querySelector(".popup__form-total span");
      this.removeEventListener("click", showPopup);
      popup.querySelector(".h3 span").textContent = name;
      popup.querySelector("input[type=number]").value = num;
      total.textContent = quantity * num;
      elem.style.display = "block";
      elem.style.zIndex = 10;
      window.requestAnimationFrame(step);

      function step() {
        progres += .1;
        elem.style.opacity = progres;

        if (progres <= 1) {
          requestAnimationFrame(step);
        } else {
          elem.removeEventListener("transitionend", transEnd);
          form.addEventListener("click", showPopup);
        }
      }

      ;
    }

    form.addEventListener("click", showPopup);
  }

  ;
  popup();
});