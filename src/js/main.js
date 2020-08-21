$(document).ready(function () {
  // Variables
  var fixedMenu = $(".menu");
  var slideMenu = $(".nav-menu");
  var menuBtn = $(".menu-btn");
  var menuLinks = $("li a");
  var servicesLinks = $(".item-content a");

  // Transparent menu
  $(window).on("scroll", function () {
    // Nav Menu
    if ($(window).scrollTop()) {
      fixedMenu.css("opacity", 0.9);
    } else {
      fixedMenu.css("opacity", 1);
    }
  });

  // Scroll Top Button
  $(window).scroll(function () {
    let scroll = $(window).scrollTop() + $(window).height();
    let offset = $("#contacts").offset().top;
    if (scroll > offset) {
      $("#topBtn").fadeIn();
    } else {
      $("#topBtn").fadeOut();
    }
  });
  $("#topBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // Close and open menu
  menuBtn.click(function () {
    $(this).toggleClass("close");
    slideMenu.toggleClass("active-menu");
  });

  // Active menu link
  menuLinks.click(function () {
    menuLinks.removeClass("active");
    $(this).addClass("active");
  });

  // Smooth Scroll
  menuLinks.on("click", function () {
    var target = $(this).attr("href");
    var top = $(target).offset().top;
    $("html, body").animate({ scrollTop: top - 80 }, 500);
    return false;
  });

  // Services to prices smooth scroll
  servicesLinks.on("click", function () {
    var target = $(this).attr("href");
    var top = $(target).offset().top;
    $("html, body").animate({ scrollTop: top }, 500);
  });

  // Home banner to about page
  $(".home-button").on("click", function () {
    var target = $(this).attr("href");
    var top = $(target).offset().top;
    $("html, body").animate({ scrollTop: top - 80 }, 500);
  });

  // Slider
  $slick_slider = $(".services-slider");
  settings_slider = {
    infinite: true,
    slidesToShow: 1,
    prevArrow: '<button class="prev arrow"></button>',
    nextArrow: '<button class="next arrow"></button>',
    slidesToScroll: 1,
  };
  slick_on_mobile($slick_slider, settings_slider);

  // Slick on mobile
  function slick_on_mobile(slider, settings) {
    $(window).on("load resize", function () {
      if ($(window).width() > 767) {
        if (slider.hasClass("slick-initialized")) {
          slider.slick("unslick");
        }
        return;
      }
      if (!slider.hasClass("slick-initialized")) {
        return slider.slick(settings);
      }
    });
  }
  // Contact Form
  $("#form").submit(function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();
    var submit = $("#sendMail").val();

    $(".form-message").load("ajax/mail.php", {
      name: name,
      email: email,
      phone: phone,
      message: message,
      submit: submit,
    });
  });
});
