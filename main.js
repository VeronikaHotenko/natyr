$(document).ready(function () {
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        arrows: false,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    $('.single-items').slick({
        dots: true,
        infinite: true,
        speed: 300,
        arrows: true,
        slidesToShow: 1,
        adaptiveHeight: true
    });
});





// Фиксированное меню

$(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 400) {
        $(".wrap").removeClass("header_fixed");
    } else {
        $(".wrap").addClass("header_fixed");
    }
});

// Активная ссылка

$(function() {
    $('.main-menu [href]').each(function(){
        if(this.href == window.location.href) {
            $(this).addClass('active');
        }
    });
});

/* TABS */

$('.everything-btn').on('click', function (event) {
  event.preventDefault();
  var currTab = $(this).index();

  $('.everything-btn').removeClass('active');
  $(this).addClass('active');

  $('.tab__content').removeClass('active');
  $('.tab__content').eq(currTab).addClass('active');

});

$('.square').on('click', function (event) {
  event.preventDefault();
  var currTab = $(this).index();

  $('.square').removeClass('active');
  $(this).addClass('active');

});

$('.choice').on('click', function (event) {
  event.preventDefault();
  var currTab = $(this).index();

  $('.choice').removeClass('active');
  $(this).addClass('active');

});


/* Валидация */


/* Validate */

$.validator.addMethod("regex", function(value, element, regexp) {
  var regExsp = new RegExp(regexp);
  return regExsp.test(value);
},"Please check your input."
);

$(".form-book").validate({
rules: {
  name: {
      required: true,
      regex : "[A-Za-z]{1,32}"   
  },
  email:{
    required: true,
    email: true
  },
  tel: {
      digits : true,
      required: true,
      minlength: 10,
      maxlength: 11,
      regex: "[0-9]+"
  }
},
messages: {
  name: "Please enter your name correctly",
  email: "Please enter your email correctly",
  tel: "Enter your phone number correctly"
}
});

$("#wrapper-modal_2").validate({
  rules: {
    firstName: {
        required: true,
        regex : "[A-Za-z]{1,32}"   
    },
    email:{
      required: true,
      email: true
    },
    phoneNumber: {
        digits : true,
        required: true,
        minlength: 10,
        maxlength: 11,
        regex: "[0-9]+"
    }
  },
  messages: {
    name: "Please enter your name correctly",
    email: "Please enter your email correctly",
    tel: "Enter your phone number correctly"
  }
  });




//Валидация и отправка формы

$(document).ready(function() {
  $('[data-submit]').on('click', function(e) {
      e.preventDefault();
      $(this).parent('form').submit();
  })
  $.validator.addMethod(
      "regex",
      function(value, element, regexp) {
          var re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
      },
      "Please check your input."
  );
  
  // Функция валидации и вывода сообщений
  function valEl(el) {
      el.validate({
          rules: {
              tel: {
                  required: true,
                  regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
              },
              name: {
                  required: true
              },
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
              tel: {
                  required: 'Поле обязательно для заполнения',
                  regex: 'Телефон может содержать символы + - ()'
              },
              name: {
                  required: 'Поле обязательно для заполнения',
              },
              email: {
                  required: 'Поле обязательно для заполнения',
                  email: 'Неверный формат E-mail'
              }
          },

          // Начинаем проверку id="" формы
          submitHandler: function(form) {
              $('#preloader-active').fadeIn();
              var $form = $(form);
              var $formId = $(form).attr('id');
              switch ($formId) {
                  case 'form-modal':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize()
                          })
                          .done(function() {
                              console.log('Success');
                          })
                          .fail(function() {
                              console.log('Fail');
                          })
                          .always(function() {
                              console.log('Always');
                              setTimeout(function() {
                                  $form.trigger('reset');
                              }, 1100);
                              setTimeout(function() {
                                $('#wrapper-modal_2').fadeOut();
                            }, 1300);
                          });
                      break;
              }
              return false;
          }
      })
  }
  $('.js-form').each(function() {
      valEl($(this));
  });
  
});

