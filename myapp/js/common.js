$(function() {







    //select-number form
    if(jQuery('.phone-mask').length) {
        jQuery(function($){
            $(".phone-mask").mask("+38(999) 999-9999");
        });
    }
   
    //kviz
    if(jQuery('.kviz').length) {
        $('.qa-next').click(function(e){
            e.preventDefault();
            if($(this).parent().prev().find('input:checked').length) {
                $('.kviz-progress').find('.kviz-progress__item.active').removeClass('active').next().addClass('active'); 
                $(this).parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
            } else {
                $(this).parent().find('.kviz__error').text('Выберите вариант ответа!');
            }

            
        });
        // for radiobuttons
        
            $('input[type="radio"]+.pick-item__label').click(function(){
                delayRadio($(this));
            });
            function delayRadio(item) {
                setTimeout( function () {
                    item.parent().parent().parent('.step-slide').removeClass('step-slide--active').next().addClass('step-slide--active');
                    $('.kviz-progress').find('.kviz-progress__item.active').removeClass('active').next().addClass('active'); 
                    var position = $('.kviz-progress__dot--active').css('left');
                    if(position=='0px') {
                        positionNew = '0%';
                        count = 0;
                    } 
                    if (positionNew == '83.3%') {
                        positionNew = '82.34%';
                        // console.log(position);
                    }
                    console.log(position);
                    console.log(positionNew);
                    positionNew = (+(positionNew.substring(0, positionNew.length - 1)) + 16.66) + '%';
                    
                    console.log(positionNew);
                    $('.kviz-progress__dot--active').css('left', positionNew);
                    $('.kviz-progress__line--active').css('width', positionNew);
                    console.log(count);
                    $('.kviz-progress__dot').eq(count).addClass('kviz-progress__dot--full');
                    count = count+1;
                    $('.kviz-progress__line-text span').removeClass('active').eq(count).addClass('active');
                    console.log(count);
                    if (count == 6) {
                        $('.kviz-progress__pic img').attr('src', 'img/preesent-persent-open.png').css('margin', '-35px -20px -46px 0');
                    }
                    if (count == 7) {
                        $('.kviz-progress__item').css('display', 'none');
                    }
                }, 500 );
            };

        $(".qa-prev").click(function(e) {
            e.preventDefault();
            $(this).parent().parent('.step-slide').removeClass('step-slide--active').prev().addClass('step-slide--active');
            $('.kviz-progress').find('.kviz-progress__item.active').removeClass('active').prev().addClass('active'); 
        });
    }

    //popup
    if(jQuery('.modal__wrap').length) {
        let modalWrap = $('.modal__wrap');
        
        //popup
        $(".modal-open").click(function (e){
          e.preventDefault();
          var btn = $(this);
            $($(this).parent().parent()).each(function () {
                var form = $(this);
                form.find('.rfield').addClass('empty_field');

                   // Функция проверки полей формы

                    form.find('.rfield').each(function(){
                    if($(this).val() != ''){
                        // Если поле не пустое удаляем класс-указание
                    $(this).removeClass('empty_field');

                    if (!form.find('.empty_field').length) {
                        var numModal = btn.attr('href');
                        var modal =  $(numModal);
                        modalWrap.removeClass('fadeOutUp');
                        modalWrap.addClass('fadeInDown');
                        modal.removeClass('disabled');
                        modal.addClass('flex');
                        $('body').addClass('body-modal-open');
                        // body.addClass('body-modal');
                        }
                    } else {
                        // Если поле пустое добавляем класс-указание
                    $(this).addClass('empty_field');
                    }
                    });

                


            })
            
          
        });
      
        $('.modal-close').click(function (){
          modalWrap.removeClass('fadeInDown');
          modalWrap.addClass('fadeOutUp');
          setTimeout(function() {
              $('.modal').addClass('disabled');
            }, 700);
          setTimeout(function() {
              $('.modal').removeClass('flex');
              $('body').removeClass('body-modal-open');
            }, 800);  
      
        });
        $('.modal').mouseup(function (e){ // событие клика по веб-документу
          var div = $(".modal__body"); // тут указываем ID элемента
          var close = $('.modal-close');
          if (close.is(e.target)) {
      
          } else if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
              var modalWrap = $('.modal__wrap');
              modalWrap.removeClass('fadeInDown');
              modalWrap.addClass('fadeOutUp');
              setTimeout(function() {
                  $('.modal').addClass('disabled');
              }, 700);
              setTimeout(function() {
                  $('.modal').removeClass('flex');
                  $('body').removeClass('body-modal-open');
              }, 800); 
            
          }
        });
    }
    //scrollto
    
    if(jQuery('.scroll-to').length) {
        var $page = $('html, body');
        $('.scroll-to[href*="#"]').click(function() {
            $page.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 400);
            return false;
        });
    }
    //mob slider
    if ( window.innerWidth < 821 || window.screen.width < 821) {
        $('.stations__arrow').on('click', function(){
            $(this).parent().parent().parent().parent().toggleClass('active');
            // .siblings().children().removeClass('active');
            $(this).next().toggleClass('active');
        });
    }

    //click on form submit button - AMO
    $('.kviz__btn').on('click', function(){
        $($(this).parent().parent()).each(function () {
            var form = $(this);
            form.find('.rfield').addClass('empty_field');

                // Функция проверки полей формы

                form.find('.rfield').each(function(){
                if($(this).val() != ''){
                    // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');

                if (!form.find('.empty_field').length) {
                console.log('form');
                form = $('.quizForm');
                jQuery.ajax({
                    method: "POST",
                    data: form.serialize(),
                    // url: quizAjax.url,
                    url: '../sendamo.php',
                    dataType: "json",
                    success: function (json) {
                        // if (json.success) {
                            // jQuery(".wizard-section").fadeOut(100);
                            window.location.href = "/quiz-thanks/";
                        // }
                    }
                });
                // fbq('track', 'Lead');
                $('.btn-finish a').attr('href', "#").removeClass('modal-open').removeClass('kviz__btn').css('pointer-events', 'none');
                $('.btn-finish').css('opacity', '0.5').css('pointer-events', 'none');
                }

                } else {}
                });
        })
    });
    $('.phone').on('click', function(){
        fbq('track', 'Contact');
    });

});