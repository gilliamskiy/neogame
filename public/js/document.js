;(function( $ ) {


    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );
    $.fn.customFile = function() {
        return this.each(function() {
            var $file = $(this).addClass('customfile'),
                $wrap = $('<div class="customfile-wrap">'),
                $input = $('<input type="text" class="customfile-filename input" />'),
                $button = $('<button type="button" class="customfile-upload setting_btn btn_blue">Open</button>'),
                $label = $('<label class="customfile-upload" for="'+ $file[0].id +'">Open</label>');
            $file.css({
                position: 'absolute',
                left: '-9999px'
            });
            $wrap.insertAfter( $file )
                .append( $file, $input, ( isIE ? $label : $button ) );
            $file.attr('tabIndex', -1);
            $button.attr('tabIndex', -1);
            $button.click(function () {
                $file.focus().click();
            });
            $file.change(function() {
                var files = [], fileArr, filename;
                if ( multipleSupport ) {
                    fileArr = $file[0].files;
                    for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                        files.push( fileArr[i].name );
                    }
                    filename = files.join(', ');
                } else {
                    filename = $file.val().split('\\').pop();
                }
                $input.val( filename )
                    .attr('title', filename)
                    .focus();

            });
            $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                    if ( e.which === 13 ) {
                        if ( !isIE ) { $file.trigger('click'); }
                    } else if ( e.which === 8 || e.which === 46 ) {
                        $file.replaceWith( $file = $file.clone( true ) );
                        $file.trigger('change');
                        $input.val('');
                    } else if ( e.which === 9 ){ // TAB
                        return;
                    } else {
                        return false;
                    }
                }
            });

        });

    };
    if ( !multipleSupport ) {
        $( document ).on('change', 'input.customfile', function() {

            var $this = $(this),
                uniqId = 'customfile_'+ (new Date()).getTime(),
                $wrap = $this.parent(),
                $inputs = $wrap.siblings().find('.customfile-filename')
                    .filter(function(){ return !this.value }),
                $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');
            setTimeout(function() {
                if ( $this.val() ) {
                    if ( !$inputs.length ) {
                        $wrap.after( $file );
                        $file.customFile();
                    }
                } else {
                    $inputs.parent().remove();
                    $wrap.appendTo( $wrap.parent() );
                    $wrap.find('input').focus();
                }
            }, 1);

        });
    }
}( jQuery ));