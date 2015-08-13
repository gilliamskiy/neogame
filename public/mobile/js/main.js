//jQuery.noConflict();
//(function($) {

    $().ready(function () {

        // FAQ. Открытие текста при клике на блоке.
        $('.help>.help_section>.help_header').each(function(){
            var me = $(this);
            me.click(function(){


                //me.addClass('open_tabs');
                me.parent().children('div.help_content').slideToggle('slow');
                me.children('.close').toggleClass("open");

                return false;
            });
        });

        $(".help>.help_section>.help_header").click(function(){
            if ( $(this).hasClass('active') ) {
                $(this).removeClass('active');
            } else {
                $(this).removeClass('active');
                $(this).addClass('active');
            }
        });
        $('#header_menu_active').click(function(e){
            e.preventDefault();
            var activeClass  = 'active_menu',
                me = $(this);

            if(me.parent().hasClass(activeClass)) {me.parent().removeClass(activeClass);}
            else {me.parent().addClass(activeClass);}
            console.log('menu active');
        });
         // При загрузке модального окна.
        $('.window').each(function(){
            var me = $(this);
            me.width(me.width());
            me.height(me.height());
            me.addClass('center');
        });
        //var $c = $('.games_page');
        //while($c.children('a:not(.wrap)').length)
        //$c.children('a:not(.wrap):lt(12)').wrapAll('<div class="wrap">');

        $('.games_page .wrap:not(.games_page .wrap:first-child)').hide();
        $('.games_page .wrap:first-child').addClass('nextBlock');

        $('#red-more').click(function() {
            $('.nextBlock').removeClass('nextBlock').next().addClass('nextBlock').show();
            if ($('.games_page .wrap:last-child').hasClass('nextBlock')) {
                $('.red-next').hide();
            }

            return false;
        });
        // Клик топ.
        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });
        $('#toTop').click(function () {
            $('body,html').animate({scrollTop: 0}, 800);
        });


        //$('.modal-show img').click( function(event){
        //        event.preventDefault();
        //
        //        $('.modal-games').css('display', 'none').animate({opacity: 0},0);
        //        $('#overlay').css('display', 'none');
        //
        //
        //        $('#overlay').fadeIn(0);
        //    $(this).parent().next().css('display', 'block').animate({opacity: 1}, 0);
        //    });
            /* Закрытие модального окна, тут делаем то же самое но в обратном порядке */
            //$('.modal-games-close, #overlay').click( function(){
            //    $('.modal-games')
            //        .animate({opacity: 0}, 0,
            //        function(){
            //            $(this).css('display', 'none');
            //            $('#overlay').fadeOut(0);
            //        }
            //    );
            //});

    });
//})(jQuery);


// Окрывает модальные окна с Json.
function loadContentJson (urlToload, container) {
    $.ajax({
        type: 'get',
        url: urlToload,
        async: true,
        dataType: 'json',
        success: function(msg) {
            $(container).html(msg.form.html);
            $('.loadajax').hide();
        }
    });
};


var lang = $("body").attr("data-lang");
function thousandsDollars(float, lang) {
    var temp = "", str = "", cents = 0;
    float = "undefined" != typeof float ? float : "0", str = parseInt(float) + "", lang = "undefined" != typeof lang ? lang : $("body").attr("data-lang");
    for (var i = str.length - 1, j = 0; i >= 0; i--, j++)0 == j % 3 && 0 != j && (temp = ("en" == lang ? "," : " ") + temp), temp = str[i] + temp;
    return cents = Math.round(100 * float) % 100, cents = 0 == cents % 100 ? "00" : 10 > cents ? "0" + cents : cents, temp = temp + ("en" == lang ? "." : ",") + cents, "en" == lang ? "$" + temp : temp + "&nbsp;$"
};

function toolbar_info (me, url, bool) {

    var a = $.ajax({
        type: 'POST',
        url: url,
        async: bool,
        dataType: 'json'
    }).done(function(msg) {
        me.find('#refre').removeClass('gif-refrech');
        if(typeof msg != 'undefined') {
            me.find('.toobar_money').html(thousandsDollars(msg.balance, lang));
            //me.find('.toobar_mail span').text(msg.email);
            me.find('.status span').text(msg.level);
            me.find('.toobar_nav').text(msg.preferred_name);
            //me.find('.balance span').html(thousandsDollars(msg.balance, lang));

        }
    });
}
function likes(id){
    event.preventDefault();
    var lick_id = id;
    if (($.cookie(lick_id) == 1)) {
        $('#'+lick_id).removeClass('active');
        $.cookie(lick_id, 0);
    } else {
        $('#'+lick_id).addClass('active');
        $.cookie(lick_id, 1);
    }
};