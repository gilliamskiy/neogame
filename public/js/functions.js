function j(attr) {
    return jQuery(attr);
}

/*
 function console_a (val) {
 console.log (val);

 j('body').css('background', 'green');
 }
 /**/
jQuery.noConflict(), function ($) {
    function thousandsDollars(float, lang) {
        var temp = "", str = "", cents = 0;
        float = "undefined" != typeof float ? float : "0", str = parseInt(float) + "", lang = "undefined" != typeof lang ? lang : $("body").attr("data-lang");
        for (var i = str.length - 1, j = 0; i >= 0; i--, j++)0 == j % 3 && 0 != j && (temp = ("en" == lang ? "," : " ") + temp), temp = str[i] + temp;
        return cents = Math.round(100 * float) % 100, cents = 0 == cents % 100 ? "00" : 10 > cents ? "0" + cents : cents, temp = temp + ("en" == lang ? "." : ",") + cents, "en" == lang ? "$" + temp : temp + "&nbsp;$"
    }

    function modalAuth(html, reg) {
        $(".windows").html(html);
        var classModalWindow = $(".windows").children().eq(0).attr("class");
        ModalWindows.start($(".windows > ." + classModalWindow)), "undefined" != typeof reg ? $(".windows > ." + classModalWindow).each(function () {
            var me = $(this);
            me.find("[type=checkbox]").parent().addClass("checkbox"), me.find("[type=submit]").parent().addClass("submit").html(me.find("[type=submit]").text() + me.find("[type=submit]").parent().html())
        }) : $("#regBtn2").click(function (e) {
            e.preventDefault(), ModalWindows.hideModal(), $("#regBtn").trigger("click")
        });
        var form = $(".windows").find("form");
        form.submit(function () {
            {
                var ajax_data = {type: form.attr("method"), url: form.attr("action"), data: form.serialize(), async: !1, dataType: "json"};
                $.ajax(ajax_data).done(function (msg) {
                    "undefined" != typeof msg.html ? (ModalWindows.hideModal(), "undefined" != typeof reg ? modalAuth(msg.html, !0) : modalAuth(msg.html)) : "undefined" != typeof msg.redirectUrl && (window.location = msg.redirectUrl)
                })
            }
            return!1
        })
    }

    function checkRadio($obj, $numbActive) {
        $obj.children(".radio").removeClass("check").children("[type=radio]").removeAttr("checked"), $obj.children(".radio").eq($numbActive).addClass("check").children("[type=radio]").attr("checked", "checked")
    }

    function setWidth($obj) {
        var minWidth = 1e3;
        $obj.width() > $(window).width() ? ($obj.width($(window).width() > minWidth ? $(window).width() : minWidth), $obj.css("left", (minWidth - $obj.width()) / 2)) : $obj.attr("style") && ($obj.removeAttr("style"), setWidth($obj))
    }

    function setHeightForMainContent() {
        $(".mainContent").each(function () {
            var contentBlock = $(this), sidebarBlock = $(".mainSidebar");
            contentBlock.children().hasClass("help") || (contentBlock.height() < sidebarBlock.height() && 1 == contentBlock.children().length ? contentBlock.children().height(sidebarBlock.height() - (contentBlock.children().outerHeight() - contentBlock.children().height())) : contentBlock.children().css("height", "auto"))
        })
    }

    function mainGlow() {
        $(".mainGlow").height($(document).height() - 500)
    }

    function isMobile() {
        return this.Android = function () {
            return navigator.userAgent.match(/Android/i)
        }, this.BlackBerry = function () {
            return navigator.userAgent.match(/BlackBerry/i)
        }, this.iOS = function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        }, this.Opera = function () {
            return navigator.userAgent.match(/Opera Mini/i)
        }, this.Windows = function () {
            return navigator.userAgent.match(/IEMobile/i)
        }, this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()
    }

    $().ready(function () {
        var lang = $("body").attr("data-lang");
        isMobile() && $("body").attr("data-mobile", 1), $("#smsFormDialog").hide(), $(".statistics div.players aside a,.tegs").click(function (e) {
            e.preventDefault()
        }), $("body header > .topMenuNLang").each(function () {
            $(this).find("li.list").each(function () {
                var me = $(this);
                $(this).find("ul").css("left", (me.width() - me.find("ul").width()) / 2)
            })
        }), $("#toolbar").each(function () {
            function percent(one, part) {
                var percent = "undefined" != typeof one && "undefined" != typeof part || 0 == part ? 0 : parseInt(100 * part / one);
                me.find(".percent > span").text(percent + "%"), me.find(".percent > div > div").css("width", percent + "%")
            }

            var me = $(this);
            percent(bonus_wager_amount, bonus_bet_amount), me.find(".list").each(function () {
                var that = $(this);
                that.find("figure").css("left", (that.find("span").width() - that.find("figure").width()) / 2)
            }), me.find(".money, .msg, .bonuses").click(function () {
                document.location.href = $(this).find("a").eq(0).attr("href")
            });
            window.setInterval(function () {
                $.ajax({type: "POST", url: "/toolbar-api", async: !1, dataType: "json"}).done(function (msg) {
                    percent(msg.bonus_wager_amount, msg.bonus_bet_amount), "undefined" != typeof msg && (me.find(".money b").html(thousandsDollars(msg.balance, lang)), me.find(".bonuses figure > span").html(thousandsDollars(msg.bonus_amount, lang)), me.find(".user > img").attr("src", msg.avatar_url), me.find(".msg > span > em").text(msg.unread_messages), me.find(".bonuses > span > em").text(msg.total_bonus_number))
                })
            }, 2e4)
        }), $("#msg-block").each(function () {
            function msg(msg) {
                count_msg++;
                var html_block = '<aside data-count="' + (count_msg - 1) + '"><figure class="close">x</figure><div><p>' + msg + "</p></div></aside>";
                msg_block.find(".container-block-msg").html(msg_block.find(".container-block-msg").html() + html_block), msg_block.find(".close").click(function () {
                    var me = $(this);
                    me.parents("aside").hide()
                }), close_old_msg("[data-count=" + (count_msg - 1) + "]")
            }

            function close_old_msg(attr_msg) {
                setTimeout(function () {
                    $(attr_msg).hide()
                }, 3e4)
            }

            var msg_block = $(this), count_msg = 0, session_id_for_msg = msg_block.attr("data-session-id"), socket = io.connect("//" + document.location.host + ":8111");
            socket.on("connect", function () {
                socket.emit("subscribe_for_private_messages", session_id_for_msg)
            }), socket.on("broadcast", function (message) {
                msg(message)
            }), socket.on("private_message", function (message) {
                msg(message)
            })
        }), $("body.technical").each(function () {
            $("body > section.technical article").height() < 250 && $("body > section.technical article").height(250), $("body > section.technical").each(function () {
                var me = $(this), that_height = 0;
                me.children().each(function () {
                    that_height += $(this).height()
                }), me.height(that_height)
            })
        }), $(".calendarTournaments").css("left", ($(window).width() - $("body > .main").width()) / 2 - 25), setWidth($(".bgMain")), $(window).resize(function () {
            $(".calendarTournaments").css("left", ($(window).width() - $("body > .main").width()) / 2 - 25), setWidth($(".bgMain"))
        }), $(".help").each(function () {
            var me = $(this);
            me.children(".container").children("div").click(function () {
                var that_me = $(this), timeAnimate = 200;
                that_me.hasClass("expand") ? that_me.children("figure").hide(timeAnimate).parent().removeClass("expand") : that_me.children("figure").show(timeAnimate).parent().addClass("expand")
            })
        }), $(".radioGroup").each(function () {
            var me = $(this);
            me.children(".radio").each(function ($i) {
                $(this).attr("date-numb", $i)
            }), checkRadio(me, 0), me.children(".radio").click(function () {
                var numb = $(this).attr("date-numb");
                checkRadio(me, numb)
            })
        }), $('#userProfile [data-click="select_avatar"]').click(function (e) {
            e.preventDefault();
            var headText = $(this).text(), imgs = $("#casino_core_user_avatar_preset").find(".radio"), arr_images = [], submitText = $('#formAvatarChange [type="submit"]').text();
            imgs.each(function () {
                var temp_str = $(this).text().replace(/[\r\n ]/g, "");
                if ("None" != temp_str) {
                    var count_arr = arr_images.length;
                    arr_images[count_arr] = {}, arr_images[count_arr].img = temp_str;
                    var attr = $(this).find('[type="radio"]').attr("checked");
                    $(this).find('[type="radio"]').attr("data-url", temp_str), arr_images[count_arr].active = "undefined" != typeof attr && attr ? !0 : !1
                }
            });
            for (var that_html = "", i = 0, that_class = ""; i < arr_images.length; i++)that_class = "", arr_images[i].active && (that_class = ' class="active"'), that_html += "<div" + that_class + '><img src="' + arr_images[i].img + '"></div>';
            var modaleWindowClass = "selectAvatar";
            that_html = '<div class="container">' + that_html + "</div>";
            var header = "<header><h3>" + headText + '</h3><em class="closeModalWindow">x</em></header>', that_btn = '<aside style="text-align: center;"><a href="" class="btn btn-success btn-large">' + submitText + "</a></aside>";
            $(".windows").html('<div class="' + modaleWindowClass + '">' + header + that_html + that_btn + "</div>"), ModalWindows.start($(".windows > ." + modaleWindowClass));
            var divs = $("." + modaleWindowClass).find(".container div");
            divs.click(function () {
                divs.removeClass("active"), $(this).addClass("active"), imgs.find('[type="radio"]').removeAttr("checked"), $('[data-url="' + $(this).find("img").attr("src") + '"]').attr("checked", "checked")
            }), $(".windows").find(".btn").click(function (ev) {
                ev.preventDefault(), $("#formAvatarChange").trigger("submit")
            })
        }), $('[data-toggle="modal1"]').click(function (e) {
            e.preventDefault();
            {
                var url = $(this).attr("href"), headText = $(this).text(), thatBtn = $(this);
                $.ajax({type: "GET", url: url, async: !1, dataType: thatBtn.hasClass("phone") ? "" : "json"}).done(function (msg) {
                    function getModalWindows4Widrals(html, headText) {
                        "undefined" == typeof headText && (headText = "");
                        var header = "<header><h3>" + headText + '</h3><em class="closeModalWindow">x</em></header>', msgError = '<aside id="sms_form_errors"></aside>';
                        $(".windows").html('<div class="tempModalWindow">' + header + msgError + html + "</div>");
                        var classModalWindow = $(".windows").children().eq(0).attr("class");
                        ModalWindows.start($(".windows > ." + classModalWindow)), $(".tempModalWindow form").addClass("form-horizontal")
                    }

                    thatBtn.hasClass("phone") ? getModalWindows4Widrals(msg, headText) : getModalWindows4Widrals(msg.html, headText), $(".windows .submit").each(function () {
                        "BUTTON" == $(this).children().eq(0).prop("tagName") ? $(this).html($(this).children().eq(0).text() + $(this).html()) : "INPUT" == $(this).children().eq(0).prop("tagName") && $(this).html($(this).children().eq(0).attr("value") + $(this).html())
                    });
                    var form = $(".windows form");
                    form.on("submit", function (e) {
                        e.preventDefault();
                        var me = $(this);
                        $.ajax({type: me.attr("method"), url: me.attr("action"), data: me.serialize(), dataType: "json", success: function (resp) {
                            var thatHeader = "";
                            "undefined" != typeof resp.redirectUrl && resp.redirectUrl && (document.location.href = resp.redirectUrl), "undefined" != typeof resp.status && "error" == resp.status && (thatHeader = "Ошибка!"), "undefined" != typeof resp.html && getModalWindows4Widrals(resp.html, thatHeader)
                        }})
                    })
                })
            }
        }), $(".tournament").each(function () {
            var container = $(this), that_height = container.find("table").height(), maxHeight = 0, parentClass = "otherClass";
            $(".participants").addClass(parentClass), $("#show_all_participants").click(function (e) {
                e.preventDefault();
                var me = $(this), temp = me.attr("data-other");
                me.attr("data-other", me.text()), me.text(temp), me.parents(".participants").hasClass(parentClass) ? (container.find(".table").height(that_height), me.parents(".participants").removeClass(parentClass).removeClass("showAllParticipants"), maxHeight = container.find("table").height(), container.find(".table").animate({height: maxHeight}, 500)) : container.find(".table").animate({height: that_height}, 500, function () {
                    me.parents(".participants").addClass(parentClass)
                })
            })
        }), $(".calendarTournaments a").click(function (e) {
            e.preventDefault();
            var me = $(this), href = me.attr("href");
            $.ajax({url: href, dataType: "json", success: function (resp) {
                var thatCount = 0;
                for (var key in resp[0].calendar)key && thatCount++;
                for (var days = "", i = 0; thatCount > i; i++)days += "<th>" + (i + 1) + "</th>";
                for (var tournaments = "", j = 0; j < resp.length; j++) {
                    var temp = "";
                    for (var key in resp[j].calendar)key && (temp += '<td data-value="' + (0 == resp[j].calendar[key] ? "0" : "1") + '"></td>');
                    tournaments += "<tr><th><em>" + j + '.</em><a href="' + resp[j].url + '">' + resp[j].name + "</a></th>" + temp + "</tr>"
                }
                var html = '<div class="tournamentCalendar"><header><h3>Календарь турниров</h3><em class="closeModalWindow">x</em></header><table><tr><th><span>Название турнира</span></th>' + days + "</tr>" + tournaments + "</table></div>";
                $(".windows").html(html);
                var classModalWindow = $(".windows").children().eq(0).attr("class");
                ModalWindows.start($(".windows > ." + classModalWindow)), $(".tournamentCalendar").each(function () {
                    var me = $(this), tr = me.find("tr"), td = tr.children("td"), td_w = 21, today = (new Date).getDate(), VALUETrue = "1";
                    me.width(950);
                    for (var i = 1; i < tr.length; i++) {
                        td = tr.eq(i).children("td");
                        for (var j = 0; j < td.length; j++) {
                            if (VALUETrue == td.eq(j).attr("data-value") && (0 == j || VALUETrue !== td.eq(j - 1).attr("data-value"))) {
                                for (var k = 1, k_inside = 0, divClass = "", z = j + 1; z < td.length; z++)if (VALUETrue == td.eq(z).attr("data-value") && (z >= today - 1 && k_inside++, k++), VALUETrue != td.eq(z).attr("data-value") || z == td.length - 1) {
                                    z >= today && today - 1 > z - k ? divClass = "now" : today > z && (divClass = "old");
                                    break
                                }
                                var div_inside = "", that_width = 0;
                                k_inside && (that_width = k_inside * td_w + k_inside - 2, div_inside = '<div style="width: ' + that_width + 'px"></div>');
                                var that_w = td_w * k + k - 3, div = '<nav><div class="' + divClass + '" style="width: ' + that_w + 'px">' + div_inside + "</div></nav>";
                                td.eq(j).html(div)
                            }
                            j + 1 == today && (td.eq(j).children("nav").length || td.eq(j).html("<nav></nav>"), td.eq(j).children("nav").addClass("today"))
                        }
                    }
                })
            }})
        }), $("#authBtn, body > .no_member .login_right_now").click(function (e) {
            e.preventDefault();
            var link = $(this).attr("href"), ajaxData = {type: "GET", url: backLoginPath, async: !1, dataType: "json"};
            link && (ajaxData.data = "target=" + link);
            $.ajax(ajaxData).done(function (msg) {
                modalAuth(msg.html)
            })
        }), $("#regBtn").click(function (e) {
            e.preventDefault();
            $.ajax({type: "GET", url: backRegPath, async: !1, dataType: "json"}).done(function (msg) {
                $(".windows").html(msg.html), modalAuth(msg.html, !0)
            })
        }), $(".mainContent >.game .likes,.mainContent >.tournament .likes").each(function () {
            function likesUpdate() {
                var a = $.ajax({type: "GET", url: urlJson, async: !1, dataType: "json"}).done(function (msg) {
                    var percentage = 0;
                    msg.active_button || (1 == msg.user_vote ? me.find(".buttons .like").addClass("disabled") : me.find(".buttons .dislike").addClass("disabled")), percentage = 0 == msg.likes && 0 == msg.dislikes ? 50 : 0 == msg.likes && 0 != msg.dislikes ? 0 : 0 != msg.likes && 0 == msg.dislikes ? 100 : msg.likes / (msg.likes + msg.dislikes) * 100, me.find(".textSparkbars .count-likes").text(msg.likes), me.find(".textSparkbars .count-dislikes").text(msg.dislikes), me.find(".sparkbars > aside").css("width", percentage + "%")
                });
                return JSON.parse(a.responseText)
            }

            var me = $(this), thatId = me.attr("data-id"), urlJson = me.attr("data-url"), urlJsonVote = me.attr("data-urlVote"), msg = likesUpdate();
            me.find(".buttons > a").click(function (e) {
                if (e.preventDefault(), null === msg.user_vote) {
                    var thatBtn = $(this), dataStr = {};
                    dataStr.id = thatId, thatBtn.hasClass("like") && (dataStr.vote = 1), thatBtn.hasClass("dislike") && (dataStr.vote = -1);
                    {
                        $.ajax({url: urlJsonVote, method: "POST", data: dataStr, success: function (msg) {
                            thatBtn.addClass("disabled"), msg = likesUpdate()
                        }})
                    }
                }
            })
        }), $(".gameSlider").each(function () {
            var me = $(this), sliderContainer = me.find(".thatSlider").children(), slide = sliderContainer.children();
            sliderContainer.css("left", 0).attr("data-left", 0), me.find(".toLeft").addClass("end"), sliderContainer.attr("data-length", slide.length), sliderContainer.width(slide.outerWidth(!0) * slide.length), sliderContainer.attr("data-width", sliderContainer.width()), sliderContainer.attr("data-oneSlideWidth", slide.outerWidth(!0)), sliderContainer.children("div").children("a").click(function (e) {
                e.preventDefault();
                var thatA = $(this), activeClass = "active", disabledClass = "disabled", numb = 0;
                $(".gameSlider").parent().hasClass(disabledClass) || (sliderContainer.children("div").children("a").removeClass(activeClass), thatA.addClass(activeClass), $(".gameSlider").parent().addClass(disabledClass), sliderContainer.children("div").children("a").each(function ($i) {
                    $(this).hasClass(activeClass) && (numb = $i)
                }), $(".gameSlider").parent().children("img").hide(), $(".gameSlider").parent().children("img").eq(numb).fadeTo(0, 0).show().fadeTo(200, 1, function () {
                    $(".gameSlider").parent().removeClass(disabledClass)
                }))
            }), me.find(".toLeft, .toRight").click(function () {
                var btn = $(this), leftData = sliderContainer.attr("data-left"), widthOneSlide = sliderContainer.attr("data-oneSlideWidth"), widthSlider = sliderContainer.attr("data-width"), move = 0, disabledClass = "disabled";
                if (sliderContainer.hasClass(disabledClass) || (btn.hasClass("toLeft") && !btn.hasClass("end") ? move = 1 : btn.hasClass("toRight") && !btn.hasClass("end") && (move = -1)), 0 != move) {
                    var move = 1 * leftData + move * widthOneSlide * 2;
                    sliderContainer.addClass(disabledClass).animate({left: move}, 500, function () {
                        $(this).removeClass(disabledClass), sliderContainer.attr("data-left", move), me.find(".toLeft, .toRight").removeClass("end"), move >= 0 ? me.find(".toLeft").addClass("end") : 2 * widthOneSlide >= 1 * widthSlider + move && me.find(".toRight").addClass("end")
                    })
                }
            })
        }), $("#sliderMainPage").each(function () {
            function setData(id) {
                function getIntToStr(val) {
                    return val >= 10 ? val : "0" + val
                }

                me.find(".nav em").removeClass(navActiveClass), me.find(".nav em").eq(id).addClass(navActiveClass), me.attr("data-numbSlide", id), me.find(".container img").attr("src", MainPageSlider[id].image);
                var tournamentClass = "tournament";
                if ("undefined" != typeof MainPageSlider[id].tournament_name) {
                    me.addClass(tournamentClass), me.find(".tornament-data header a").html(MainPageSlider[id].tournament_name).attr("href", MainPageSlider[id].button_url), me.find(".tornament-data footer div:eq(0) span").html(thousandsDollars(MainPageSlider[id].tournament_funds)), me.find(".participant").children("div").html(MainPageSlider[id].participant), me.find(".participant").children("div").find("s").each(function () {
                        var that = $(this), tempWidth = that.width() - that.find("em").outerWidth(!0) - (that.find("span").outerWidth(!0) - that.find("span").width()) - 5;
                        that.find("span").width(tempWidth)
                    });
                    var passedTime = parseInt(((new Date).getTime() - timePageLoad.getTime()) / 1e3), myTime = {oneDay: 86400, oneHour: 3600, oneMin: 60}, tempTime = MainPageSlider[id].total_date_secs - passedTime, days = parseInt(tempTime / myTime.oneDay), tempStr = getIntToStr(parseInt(tempTime % myTime.oneDay / myTime.oneHour));
                    tempStr += ":" + getIntToStr(parseInt(tempTime % myTime.oneHour / myTime.oneMin)), tempStr += ":" + getIntToStr(parseInt(tempTime % myTime.oneMin)), me.find(".tornament-data footer div+div span").text(tempStr), days > 0 ? me.find(".tornament-data").addClass("days").find("footer .with-days span:eq(0)").text(days) : me.find(".tornament-data").removeClass("days")
                } else me.removeClass(tournamentClass), MainPageSlider[id].details_url.length ? (me.find(".details a").attr("href", MainPageSlider[id].details_url), me.find(".details a").show()) : me.find(".details a").hide(), me.find(".playThisGame a").attr("href", MainPageSlider[id].button_url)
            }

            function animateSlide(numb) {
                image.fadeOut("slow", function () {
                    setData(numb), image.fadeIn("slow")
                })
            }

            for (var me = $(this), navActiveClass = "active", image = me.find(".container img"), tournamArr = [], timePageLoad = new Date, i = 0; i < MainPageSlider.length; i++)if ("undefined" != typeof MainPageSlider[i].tournament_name) {
                tournamArr[i] = MainPageSlider[i].total_date_secs, me.find(".participant").find("s").each(function () {
                    var that = $(this);
                    that.find("span").html("&nbsp;").attr("title", "").removeAttr("style"), that.find("em").text("")
                });
                for (var tempArr = MainPageSlider[i].participant, j = 0; j < tempArr.length && me.find(".participant").find("s").length - 1 != j; j++) {
                    me.find(".participant").find("s").length - 2 == j && me.find(".link").attr("href", MainPageSlider[i].button_url).css({display: "block"});
                    var that = me.find(".participant").find("s").eq(j);
                    that.find("span").text(tempArr[j].place + ". " + tempArr[j].user), "-" == tempArr[j].prize ? that.find("em").text("-") : that.find("em").html(thousandsDollars(tempArr[j].prize)), that.find("span").attr("title", that.find("span").text())
                }
                MainPageSlider[i].participant = me.find(".participant").children("div").html()
            }
            me.find(".nav").each(function () {
                for (var temp = "", i = 0; "undefined" != typeof MainPageSlider[i]; i++)temp += '<em data-numb="' + i + '"></em>';
                $(this).html(temp)
            }), setData(0);
            var counter = 0, intervalID = window.setInterval(function () {
                counter = counter == MainPageSlider.length - 1 ? 0 : counter + 1, animateSlide(counter)
            }, 4e3);
            me.find(".btnRight, .btnLeft").click(function () {
                window.clearInterval(intervalID);
                var btn = $(this), numb = 1 * me.attr("data-numbSlide");
                btn.hasClass("btnRight") ? numb = numb == MainPageSlider.length - 1 ? 0 : numb + 1 : btn.hasClass("btnLeft") && (numb = 0 == numb ? MainPageSlider.length - 1 : numb - 1), animateSlide(numb)
            }), me.find(".nav em").click(function () {
                window.clearInterval(intervalID), animateSlide($(this).attr("data-numb"))
            })
        }), $("#jackpot").each(function () {
            var me = $(this), jackpot = {amount: 0, addAmount: 0, htmlStr: "", start: function (amount, addAmount) {
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
                me.find("span").html(that.htmlStr)
            }};
            jackpot.start(jackpotAmount, jackpotAddAmount)
        }), $("#gameMainPage").each(function () {
            function showGames() {
                me.children().length < numbGamesOneStep * steps || (preloader.show(), setTimeout(function () {
                    steps++;
                    for (var i = 0; numbGamesOneStep * steps > i; i++)me.children().eq(i).show();
                    preloader.hide()
                }, 2e3))
            }

            $("body").children().eq(0).after('<section class="preloader"></section>');
            var preloader = $("body").children(".preloader");
            preloader.hide();
            var numbGamesOneStep = 16, steps = 0, me = $(this);
            $(this).children().hide(), showGames(), $(window).scroll(function () {
                var scroll_top = $(document).scrollTop(), page_height = $(document).height(), wind_height = $(window).height();
                2 * wind_height + 400 > page_height - scroll_top && showGames()
            })
        }), $(".events.list > article > div").each(function () {
            var me = $(this), src = me.find("figure img").attr("src");
            me.find("figure img").hide(), me.children("img").attr("src", src)
        }), $(".events .onlyOne").each(function () {
            var me = $(this);
            me.find("img").eq(1).hide(), me.find("img").eq(0).attr("src", me.find("img").eq(1).attr("src"))
        }), $("#user_document").each(function () {
            $(this).find("[type=file]").on("change", function () {
                $(this).parents("aside").find("label").text($(this).val())
            })
        })
    }), $(window).load(function () {
        "#!authentication" == document.location.hash && $("#authBtn").trigger("click"), mainGlow(), $(document).scroll(function () {
            mainGlow()
        }), setHeightForMainContent()
    });
    var ModalWindows = {obj: "", t_window: "", start: function (windowForWork) {
        var me = this;
        me.t_window = windowForWork, me.obj = windowForWork.parents(".windows"), me.showModal(), me.setPositionWindow(), $(window).resize(function () {
            me.setPositionWindow()
        }), this.obj.find(".closeModalWindow").click(function (e) {
            e.preventDefault(), me.hideModal()
        }), me.obj.click(function (e) {
            "windows" == e.target.className && me.hideModal()
        }), $(window).keydown(function (e) {
            27 == e.keyCode && me.hideModal()
        })
    }, setPositionWindow: function () {
        var me = this, w_h = $(window).height(), mw_h = me.t_window.height();
        me.t_window.css("top", (w_h - mw_h) / 2)
    }, showModal: function () {
        this.obj.show(), this.obj.children().hide(), this.t_window.show(), $(".mainContent .slider").addClass("ie8_hidden")
    }, hideModal: function () {
        this.t_window.hide().remove(), this.obj.hide(), $(".mainContent .slider").removeClass("ie8_hidden")
    }}
}(jQuery);