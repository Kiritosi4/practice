
(function($) {

    jQuery(window).on('load', function() {
        jQuery("#status").fadeOut();
        jQuery("#preloader").delay(100).fadeOut("slow");
    });


    var $winW = function() {
        return $(window).width();
    };
    var $winH = function() {
        return $(window).height();
    };
    var $screensize = function(element) {
        $(element).width($winW()).height($winH());
    };
    var screencheck = function(mediasize) {
        if (typeof window.matchMedia !== "undefined") {
            var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
            if (screensize.matches) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($winW() <= mediasize) {
                return true;
            } else {
                return false;
            }
        }
    };
    $('.animated-row').each(function() {
        var $this = $(this);
        $this.find('.animate').each(function(i) {
            var $item = $(this);
            var animation = $item.data('animate');
            $item.on('inview', function(event, isInView) {
                if (isInView) {
                    setTimeout(function() {
                        $item.addClass('animated ' + animation).removeClass('animate');
                    }, i * 50);
                } else if (!screencheck(767)) {
                    $item.removeClass('animated ' + animation).addClass('animate');
                }
            });
        });
    });

    jQuery(document).ready(function($) {

        $(window).on('scroll', function() {
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 50) {
                $('.header').addClass('menu_fixed animated fadeInDown');
            } else {
                $('.header').removeClass('menu_fixed animated fadeInDown');
            }
        });

        $(window).on('scroll', function() {
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 50) {
                $('.const_header').addClass('const_menu_fixed animated fadeInDown');
            } else {
                $('.const_header').removeClass('const_menu_fixed animated fadeInDown');
            }
        });

        //----------------------- construction_02 MENU FIXED JS -----------------------//
        $(window).on('scroll', function() {
            var window_top = $(window).scrollTop() + 1;
            if (window_top > 50) {
                $('.const2_header').addClass('const2_menu_fixed animated fadeInDown');
            } else {
                $('.const2_header').removeClass('const2_menu_fixed animated fadeInDown');
            }
        });

        $('.menu_scroll ul li a').on('click', function(e) {
            $('.menu_scroll ul li').removeClass('active');
            $(this).parent().addClass('active');
            var target = $('[data-scroll=' + $(this).attr('href') + ']');
            e.preventDefault();
            var targetHeight = target.offset().top - parseInt('94');
            $('html, body').animate({
                scrollTop: targetHeight
            }, 1000);
        });

        $(window).on('scroll', function() {
            var windscroll = $(window).scrollTop();
            var target = $('.menu_scroll ul li');
            if (windscroll >= 0) {
                $('[data-scroll]').each(function(i) {
                    if ($(this).position().top <= windscroll + 94) {
                        target.removeClass('active');
                        target.eq(i).addClass('active');
                    }
                });
            } else {
                target.removeClass('active');
                $('.menu_scroll ul li:first').addClass('active');
            }

        });

        $('.const_home_banner_scroll a').on('click', function(e) {
            $('.const_home_banner_scroll').removeClass('active');
            $(this).parent().addClass('active');
            var target = $('[data-scroll=' + $(this).attr('href') + ']');
            e.preventDefault();
            var targetHeight = target.offset().top - parseInt('94');
            $('html, body').animate({
                scrollTop: targetHeight
            }, 1000);
        });

        $(window).on('scroll', function() {
            var windscroll = $(window).scrollTop();
            var target = $('.const_home_banner_scroll');
            if (windscroll >= 0) {
                $('[data-scroll]').each(function(i) {
                    if ($(this).position().top <= windscroll + 94) {
                        target.removeClass('active');
                        target.eq(i).addClass('active');
                    }
                });
            } else {
                target.removeClass('active');
                $('.const_home_banner_scroll').addClass('active');
            }

        });

        $("#toggle").on("click", function() {
            var w = $('#sidebar').width();
            var pos = $('#sidebar').offset().left;

            if (pos == 0) {
                $("#sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });

        $("#toggle_close").on("click", function() {
            var w = $('#sidebar').width();
            var pos = $('#sidebar').offset().left;

            if (pos == 0) {
                $("#sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });


        (function($) {
            $(window).on('load', function() {
                $('#cssmenu li.active').addClass('open').children('ul').show();
                $('#cssmenu li.has-sub>a').on('click', function() {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(200);
                    } else {
                        element.addClass('open');
                        element.children('ul').slideDown(200);
                        element.siblings('li').children('ul').slideUp(200);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(200);
                    }
                });

            });
        })(jQuery);

        $("#const_toggle").on("click", function() {
            var w = $('#const_sidebar').width();
            var pos = $('#const_sidebar').offset().left;

            if (pos == 0) {
                $("#const_sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#const_sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });

        $("#const_toggle_close").on("click", function() {
            var w = $('#const_sidebar').width();
            var pos = $('#const_sidebar').offset().left;

            if (pos == 0) {
                $("#const_sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#const_sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });


        (function($) {
            $(window).on('load', function() {

                $('#const_cssmenur li.active').addClass('open').children('ul').show();
                $('#const_cssmenur li.has-sub>a').on('click', function() {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(200);
                    } else {
                        element.addClass('open');
                        element.children('ul').slideDown(200);
                        element.siblings('li').children('ul').slideUp(200);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(200);
                    }
                });

            });
        })(jQuery);

        $("#const2_toggle").on("click", function() {
            var w = $('#const2_sidebar').width();
            var pos = $('#const2_sidebar').offset().left;

            if (pos == 0) {
                $("#const2_sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#const2_sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });

        $("#const2_toggle_close").on("click", function() {
            var w = $('#const2_sidebar').width();
            var pos = $('#const2_sidebar').offset().left;

            if (pos == 0) {
                $("#const2_sidebar").animate({
                    "left": -500
                }, "slow");
            } else {
                $("#const2_sidebar").animate({
                    "left": "0"
                }, "slow");
            }

        });


        (function($) {
            $(window).on('load', function() {

                $('#const2_cssmenu li.active').addClass('open').children('ul').show();
                $('#const2_cssmenu li.has-sub>a').on('click', function() {
                    $(this).removeAttr('href');
                    var element = $(this).parent('li');
                    if (element.hasClass('open')) {
                        element.removeClass('open');
                        element.find('li').removeClass('open');
                        element.find('ul').slideUp(200);
                    } else {
                        element.addClass('open');
                        element.children('ul').slideDown(200);
                        element.siblings('li').children('ul').slideUp(200);
                        element.siblings('li').removeClass('open');
                        element.siblings('li').find('li').removeClass('open');
                        element.siblings('li').find('ul').slideUp(200);
                    }
                });

            });
        })(jQuery);

        (function($) {

            function doAnimations(elems) {
                var animEndEv = 'webkitAnimationEnd animationend';

                elems.each(function() {
                    var $this = $(this),
                        $animationType = $this.data('animation');
                    $this.addClass($animationType).one(animEndEv, function() {
                        $this.removeClass($animationType);
                    });
                });
            }

            var $myCarousel = $('#carousel-example-generic'),
                $firstAnimatingElems = $myCarousel.find('.carousel-item:first').find("[data-animation ^= 'animated']");

            $myCarousel.carousel();

            doAnimations($firstAnimatingElems);

            $myCarousel.carousel('pause');

            $myCarousel.on('click slide.bs.carousel', function(e) {
                var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
                doAnimations($animatingElems);
            });


        })(jQuery);

        $('.counter-section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.timer').each(function() {
                    var $this = $(this);
                    $({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                $(this).off('inview');
            }
        });

        $('.const_counter_section').on('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.timer').each(function() {
                    var $this = $(this);
                    $({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                $(this).unbind('inview');
            }
        });
 
        $(window).on('scroll', function() {
            if ($(this).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').on('click', function(e) {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        });


    });

})(jQuery);