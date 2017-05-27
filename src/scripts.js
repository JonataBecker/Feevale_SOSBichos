let ajustouMenu = false;
$(window).on('scroll',function() {
    var scrolltop = $(this).scrollTop();




    if (scrolltop >= 220) {
        if ( !ajustouMenu) {
            $('.menu-bicho').css({'position':'fixed', 'top':0, 'width':$('.menu-bicho').parent().width() + 'px'});
            ajustouMenu = true;
        }   
    } else {
        $('.menu-bicho').css({'position':'initial', 'width':'initial'});
        ajustouMenu = false;

    }

});
