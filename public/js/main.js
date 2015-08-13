

    $().ready(function(){
        // FAQ. Открытие текста при клике на блоке.
        $('.help>.help_section>.help_header').each(function(){
            var me = $(this);
				me.click(function(){
                me.parent().children('div.help_content').slideToggle('slow');
                me.children('.close').toggleClass("open");
                return false;
            }); 
        });

        // Главный BG
        $('body >.bg-main').each(function(){
            $(this).height($('body').height());

            var me = $(this);

            me.find('.column').height(me.height() - me.find('.spires').height());

            function resizeBg () {
                if($(window).width() < me.find('.spires').width())
                    me.children().hide();
                else {
                    me.children().show();
                }
            }

            resizeBg();

            $(window).resize(function(){
                resizeBg();
            });
        });

        // Верхний тулбар для авторизованых пользователей.
//       $('#toolbar').each(function(){
//            var me = $(this);
//
//            // Бонусы. Прогресс бар.
//            percent(bonus_wager_amount, bonus_bet_amount);
//
//            me.find('.list').each(function(){
//                var that = $(this);
//                that.find('figure').css('left', (that.find('span').width() - that.find('figure').width()) / 2);
//            });
//
//            me.find('.money, .msg, .bonuses').click(function(){
//                document.location.href = $(this).find('a').eq(0).attr('href');
//            });
//
//            var intervalID = window.setInterval(function(){
//                var a = $.ajax({
//                    type: 'POST',
//                    url: '/toolbar-api',
//                    async: false,
//                    dataType: 'json'
//                }).done(function(msg) {
//                    percent(msg.bonus_wager_amount, msg.bonus_bet_amount);
//
//                    if(typeof msg != 'undefined') {
//                        me.find('.money b').html(thousandsDollars(msg.balance, lang));
//                        me.find('.bonuses figure > span').html(thousandsDollars(msg.bonus_amount, lang));
//                        me.find('.user > img').attr('src', msg.avatar_url);
//                        me.find('.msg > span > em').text(msg.unread_messages);
//                        me.find('.bonuses > span > em').text(msg.total_bonus_number);
//                    }
//                });
//            }, 20000);
//
//            function percent(one, part) {
//                var percent = (typeof one != 'undefined' &&  typeof part != 'undefined'  ||  0 == part) ? 0 : parseInt(part * 100 / one);
//
//                // var percent = parseInt(part * 100 / one);
//                me.find('.percent > span').text(percent + '%');
//                me.find('.percent > div > div').css('width', percent + '%');
//            }
//        });

        // Выбор аватарок и занесения у форму.
        $('.avatar-content li a').click(function () {
            $('#avt_send').val($(this).attr('href'));
            $('.avatar-content li').removeClass('active');
            $(this).parent().addClass('active');
            return false;
        });

       // Сохранения урл для игры.
        var path = window.location.pathname;
        path = decodeURIComponent(path);
        $('.tabs a[href="'+ path +'"]').addClass('active');
        $('.tabs a').filter(function() {
            return this.href == path;
        }).addClass('better-active');

        // Выборка нужных кнопок для сохранения урл.
        $('.localStore').click(function() {
            localStorage.removeItem('tempUrl');
            var tempUrl = $(this).attr('data-id');
            localStorage.setItem('tempUrl',tempUrl);
        });
        $('#authBtn').click(function() {localStorage.removeItem('tempUrl'); });


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


        $(".open-bonus").click(function () {


            if ($(this).hasClass('closeB')) {
                $(this).addClass('openB').removeClass('closeB');
                //var hid = $(this).next().next().next().find($(".bonus_widget-textH")).show().height();
                hid = $(this).next().show().height();
                var pages = $(this).parents('.bonus_widget-posts').height();
                var news = pages + hid + 20;
                $(this).parents('.bonus_widget-posts').css('height', news + 'px');
            } else {
                if ($(this).hasClass('openB')) {
                    $(this).addClass('closeB').removeClass('openB');
                    $(this).next().hide().height();
                    $(this).parents('.bonus_widget-posts').css('height', '195px');
                }
            }

            return false;
        });
        $("#jackpot").each(function () {
            var me = $(this), jackpot = {
                amount: 0, addAmount: 0, htmlStr: "", start: function (amount, addAmount) {
                    if (amount && addAmount) {
                        this.amount = amount, this.addAmount = addAmount, this.getStr(), this.setHtml();
                        var me = this;
                        setInterval(function () {
                            me.amount += me.addAmount, me.getStr(), me.setHtml()
                        }, 1e3)
                    }
                }, getStr: function () {
                    this.htmlStr = thousandsDollars(this.amount, lang)
                }, setHtml: function () {
                    var that = this;
                    me.find("strong").html(that.htmlStr)
                }
            };
            jackpot.start(jackpotAmount, jackpotAddAmount)
        });
        $('#show_all_participants').click(function(e){
            e.preventDefault();
            // Меняем надписи местами.
            var temp = $(this).attr('data-other');
            $(this).attr('data-other', $(this).text());
            $(this).text(temp);

            if ($('#table_tur').hasClass('showAllParticipants')) {
                $('#table_tur').removeClass('showAllParticipants');
                $(this).addClass('top_Str');

            }else {
                $('#table_tur').addClass('showAllParticipants');
                $(this).removeClass('top_Str');
            }
        });
    });

    function popupLuckyShow(){

        overlay.fadeIn(400,
            function(){
                $('#popupLucky')
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200);
                $('.games_content').css({'marginLeft': '-20000px'});
            });
    };
    // Окрывает модальные окна с аяксом.
    function loadContent(urlToload, container, ajaxBlock) {
        $.ajax({
            url: urlToload,
            cache: false,
            dataType: "html",
            beforeSend: function() { $(container + ' .ajax_open').show();},
            success: function(data) {$(container + ' .ajax_open').hide();$(container).html($(data).find(ajaxBlock).html());}
        });
    };

    function loadContentPay(urlToload, container, ajaxBlock, min_money, max_money, curr_money, cof_money, cof_money_account, data_id) {
        $.ajax({
            url: urlToload,
            cache: false,
            dataType: "html",
            data: {name:'test'},

            beforeSend: function() { $(container + '.ajax_open').show();},
            success: function(data) {
                var d=new Date();
                var munNo = d.getMonth();
                var mun = parseInt(munNo, 10) + 1;
                var dateFormat =  d.getDate()+'.'+mun+'.'+d.getFullYear();

                $(container + '.ajax_open').hide();
                $(container).html($(data).find(ajaxBlock).html());
                $("form").attr('action',urlToload);

                var radio1 = 20;
                var radio2 = 50;
                var radio3 = 100;
                var radio4 = 300;
                var radio5 = 500;

                if ((data_id == 1)||(data_id == 5)) {
                    radio1 = 500;
                    radio2 = 1000;
                    radio3 = 5000;
                    radio4 = 10000;
                    radio5 = 30000;
                }
                if (data_id == 4) {
                    radio1 = 1000;
                    radio2 = 5000;
                    radio3 = 10000;
                    radio4 = 30000;
                    radio5 = 60000;
                }
                if (data_id == 6) {
                    radio1 = 1000;
                    radio2 = 3000;
                    radio3 = 5000;
                    radio4 = 10000;
                    radio5 = 15000;
                }
                if (data_id == 17) {
                    radio1 = 100;
                    radio2 = 500;
                    radio3 = 1000;
                    radio4 = 3000;
                    radio5 = 5000;
                }
                if (data_id == 12) {
                    radio1 = 20;
                    radio2 = 50;
                    radio3 = 100;
                    radio4 = 200;
                    radio5 = 300;
                }
                $("#play_system .all_Form form").prepend('<div class="play_system_money"><div class="section_input"><label class="radio">' +
                '<input type="radio" class="css-radio" name="optionsRadios" id="optionsRadios1" value="'+radio1+'" checked>' +
                '<label for="optionsRadios1" class="css-label css-label-radio">'+radio1+'</label></label><label class="radio">' +
                '<input type="radio" class="css-radio" name="optionsRadios" id="optionsRadios2" value="'+radio2+'">' +
                '<label for="optionsRadios2" class="css-label css-label-radio">'+radio2+'</label></label><label class="radio">' +
                '<input type="radio" class="css-radio" name="optionsRadios" id="optionsRadios3" value="'+radio3+'">' +
                '<label for="optionsRadios3" class="css-label css-label-radio">'+radio3+'</label></label><label class="radio">' +
                '<input type="radio" class="css-radio" name="optionsRadios" id="optionsRadios4" value="'+radio4+'">' +
                '<label for="optionsRadios4" class="css-label css-label-radio">'+radio4+'</label></label><label class="radio">' +
                '<input type="radio" class="css-radio" name="optionsRadios" id="optionsRadios5" value="'+radio5+'">' +
                '<label for="optionsRadios5" class="css-label css-label-radio">'+radio5+'</label></label>' +
                '<div class="play_system_val currency_money">USD</div></div></div>');
                $("#simple_payment_amount").val($("input:checked").val());
                $("#qiwi_payment_amount").val($("input:checked").val());
                $("#ukash_payment_amount").val($("input:checked").val());
                $("#neteller_payment_amount").val($("input:checked").val());
                $("input.css-radio").on("click", function () {
                    $("#simple_payment_amount").val($("input:checked").val());
                    $("#qiwi_payment_amount").val($("input:checked").val());
                    $("#ukash_payment_amount").val($("input:checked").val());
                    $("#neteller_payment_amount").val($("input:checked").val());
                });

                $(".min_money").text(min_money+" "+curr_money);
                $(".max_money").text(max_money+" "+curr_money);
                $(".currency_money").text(curr_money);
                if (min_money < 1) {
                    $("#simple_payment_amount").attr({'type':'number','step': min_money,'max': max_money }).css({'width': '298px'});
                }else {
                    $("#simple_payment_amount").attr({'type':'number','min': min_money,'max': max_money }).css({'width': '298px'});
                }

                $("#credit_card_payment_amount").attr({'type':'number','min': min_money,'max': max_money }).css({'width': '298px'});
                $("#qiwi_payment_amount").attr({'type':'number','min': min_money,'max': max_money }).css({'width': '298px'});
                $("#neteller_payment_amount").attr({'type':'number','min': min_money,'max': max_money }).css({'width': '298px'});
                $("#ukash_payment_amount").attr({'type':'number','min': min_money,'max': max_money }).css({'width': '298px'});
                //$("#play_system .all_Form form").prepend("<div class='control-group min_margin'><label class='control-label'></label>" +
                //"<div class='controls'><div class='play_curs'>"+cof_money+" USD. по курсу ЦБ РФ на сегодня</div></div></div>");


                if ((data_id == 1)||(data_id == 4)||(data_id == 5)||(data_id == 6)) {



                    $("<div class='control-group min_margin'><label  class='control-label'></label>" +
                    "<div class='controls'><div class='play_curs'>"+cof_money+" USD. "+cof_money_account+" "+dateFormat+"</div></div></div>").insertAfter('#play_system .play_system_money');
                }

            }

        });
    };

    // Окрывает модальные окна с Json.
    function loadContentJson (urlToload, container) {
        $.ajax({
            type: 'get',
            url: urlToload,
            async: true,
            dataType: 'json',
            success: function(msg) {
                $(container).html(msg.form.html);
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

    function toolbar_info (avatar_img, me, url) {
//        me = $(this);
        var allBonus = 0,tulBar1 = 0, tulBar2 = 0;
        var a = $.ajax({
            type: 'POST',
            url: url,
            async: false,
            dataType: 'json'
        }).done(function(msg) {
            if(typeof msg != 'undefined') {
                me.find('.money b').html(thousandsDollars(msg.balance, lang));
                me.find('.personalMail').text(msg.email);
                me.find('.status span').text(msg.level);
                if (msg.bonuses == '' || msg.bonuses == null)
                {
                }
                else
                {
                    me.find('.bonuses > span > em').text(msg.bonuses.length);
                    for(var i = 0; i < msg.bonuses.length; i++) {
                        if (msg.bonuses[i].wagering.status == 1 )  {
                            allBonus = msg.bonuses[i].amount;
                            tulBar1 = msg.bonuses[i].wagering.bet_amount;
                            tulBar2 = msg.bonuses[i].wagering.wager_amount;

                        }
                    }
                    me.find('.bonuses figure > span').html(thousandsDollars(allBonus, lang));
                    percent(tulBar1, tulBar2);
                    function percent(one, part) {

                        if( one != 'undefined' &&  part != 'undefined'  ||  0 == part) {
                            if (isNaN(parseInt(one * 100 / part))) {
                              var percent = 0;
                            } else {
                              var  percent = parseInt(one * 100 / part);
                            }
                        }else {
                            percent = 0;

                        }
                        me.find('.percent > span').text(percent + '%');
                        me.find('.percent > div > div').css('width', percent + '%');
                    }


                }
                if (msg.avatar_url == ''){
                    me.find('.user > img').attr('src', avatar_img);
                    me.find('.avatar_live').attr('src', avatar_img);
                }else{
                    me.find('.user > img').attr('src', msg.avatar_url);
                    me.find('.avatar_live').attr('src', msg.avatar_url);
                }
                me.find('#usr_nic').text(msg.preferred_name);
                me.find('.balance span').html(thousandsDollars(msg.balance, lang));

                //                                me.find('.msg > span > em').text(msg.unread_messages);
                //                                me.find('.bonuses > span > em').text(msg.total_bonus_number);
            }
        });
    }

    // Уведобмление о пополнении щета в игре

    function money_refresh_init (url) {
        var a = $.ajax({
            type: 'POST',
            url: url,
            async: true,
            dataType: 'json'
        }).done(function(msg) {
            if(typeof msg != 'undefined') {
                var balance =msg.balance;

                if (balance <= 0.01) {
                    $('.games_content').css({'marginLeft': '-20000px'});
                    $("#show_money").show();
                    $("#show_money-backdrop").show();
                }
            }
        });
    }
    // Загрука данных для Игор.
    function toolbar_games (avatar_img, me, url) {
//        me = $(this);
        var allBonus = 0,tulBar1 = 0, tulBar2 = 0;
        var a = $.ajax({
            type: 'POST',
            url: url,
            async: false,
            dataType: 'json'
        }).done(function(msg) {
            if(typeof msg != 'undefined') {
                me.find('.money .dollar').html(thousandsDollars(msg.balance, lang));
                if (msg.bonuses == '' || msg.bonuses == null)
                {
                }
                else
                {
                    me.find('#len_bonus').text(msg.bonuses.length);
                    for(var i = 0; i < msg.bonuses.length; i++) {
                        if (msg.bonuses[i].wagering.status == 1 )  {
                            allBonus = msg.bonuses[i].amount;
                            tulBar1 = msg.bonuses[i].wagering.bet_amount;
                            tulBar2 = msg.bonuses[i].wagering.wager_amount;
                        }
                    }
                    me.find('.bonus > .dollar').html(thousandsDollars(allBonus, lang));
                    percent(tulBar1, tulBar2);
                    function percent(one, part) {

                        if( one != 'undefined' &&  part != 'undefined'  ||  0 == part) {
                            if (isNaN(parseInt(one * 100 / part))) {
                                var percent = 0;
                            } else {
                                var  percent = parseInt(one * 100 / part);
                            }
                        }else {
                            percent = 0;
                        }
                        me.find('.percent > span').text(percent + '%');
                        me.find('.percent > div > div').css('width', percent + '%');
                    }


                }
                if (msg.avatar_url == ''){
                    me.find('.avatar_block >.avatar > img').attr('src', avatar_img);
                }else{
                    me.find('.avatar_block >.avatar > img').attr('src', msg.avatar_url);
                }
                me.find('.avatar_block > span').text(msg.preferred_name);

                //                                me.find('.msg > span > em').text(msg.unread_messages);
                //                                me.find('.bonuses > span > em').text(msg.total_bonus_number);
            }
        });
    }

    // Загрука данных для персонального меню.
    //function toolbar_personal (avatar_img, me, url) {
    //    var allBonus = 0;
    //    var a = $.ajax({
    //        type: 'POST',
    //        url: url,
    //        async: false,
    //        dataType: 'json'
    //    }).done(function(msg) {
    //        if(typeof msg != 'undefined') {
    //            me.find('.personalMail').text(msg.email);
    //            me.find('.status span').text(msg.level);
    //            if (msg.avatar_url == ''){
    //                me.find('.avatar_live').attr('src', avatar_img);
    //            }else{
    //                me.find('.avatar_live').attr('src', msg.avatar_url);
    //            }
    //            me.find('.balance span').html(thousandsDollars(msg.balance, lang));
    //        }
    //    });
    //}

    // Загрука категорий для Игор.
    function getGamesAllOrType(url, games_real, games_demo, red) {
        $.ajax({
            url: url,
            method: "POST",
            cache: false,
            dataType: 'json',
            beforeSend: function () {
                $('.games_json .ajax_open').show();
                $('.loadajax').show();

            },
            success: function (msg) {
                var gamesHtml = '', numberGameOnPage = 18;
                $('.loadajax').hide();
                for (var i = 0; i < msg.length; i++) {
                        gamesHtml += '<div>';
                        gamesHtml += '<em><img src="/media/cache/thumbnail/' + msg[i].logo_url + '" alt="' + msg[i].name + '"></em>';
                        gamesHtml +='<figure><article><a class="playNow login_right_now" href="'+msg[i].play_url+'">'+games_real+'</a><a class="demo login_right_now" href="'+ msg[i].demo_url +'">'+games_demo+'</a><a class="details" href="'+ msg[i].game_url +'">'+red+'</a></article></figure>';
                        gamesHtml += '<span>' + msg[i].name + '</span>';
                        gamesHtml += '</div>';

                    }
                $('.games_json').html(gamesHtml);

                $('.games_json div').each(function ($i) {
                    if ($i >= numberGameOnPage) {
                        $(this).hide();
                    }
                });
                if ($('.games_json div').length > numberGameOnPage) {
                    var numbPage = $('.games_json div').length / numberGameOnPage;
                    numbPage = (0 == $('.games_json div').length % numberGameOnPage) ? $('.games_json div').length / numberGameOnPage : parseInt($('.games_json div').length / numberGameOnPage) + 1;

                    var pagingHtml = '';
                    var classHtml = '';

                    for (var i = 0; i < numbPage; i++) {
                        classHtml = '';
                        if (0 == i) classHtml = 'class="active"';
                        pagingHtml += '<li ' + classHtml + '><a href="">' + (i + 1) + '</a></li>';
                    }
                    $('.paginator').show();
                    $('.pagination').html(pagingHtml).show();

                    $('.pagination li a').click(function (e) {
                        e.preventDefault();
                        $('.pagination li').removeClass('active');
                        $(this).parent().addClass('active');

                        $('.pagination li').each(function ($i) {
                            if ($(this).hasClass('active')) {
                                $(this).parents('.main-games').find('.games_json div').hide();

                                for (var i = 0; i < numberGameOnPage; i++) {
                                    $(this).parents('.main-games').find('.games_json div').eq(i + numberGameOnPage * $i).show();
                                }
                            }
                        });
                    });
                } else {
                    $('.paginator').hide();
                }
            }

        });

    }




