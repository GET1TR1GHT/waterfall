/**
 * Created by liujiabin on 2017/10/12.
 */
$( window ).on( "load", function(){
    waterfall();
    var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};
    $(window).on('scroll',function () {
      if(scrollchange()){
          var $parent=$('#main');
          $.each(dataInt.data,function (index,value) {
              var $obox=$('<div>').addClass('box').appendTo($parent);
              var $opic=$('<div>').addClass('pic').appendTo($obox);
              var $img=$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($opic);
          });
          waterfall();
      }
    })
});
function waterfall() {
    var $boxs = $( ".box" );
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/ w);

    $("#main").width(w * cols).css('margin', '0 auto');

    var hArr = [];
    $boxs.each(function (index, value) {
            var h = $boxs.eq(index).outerHeight();
            if (index < cols) {
                hArr[index] = h;
            }
            else {
                var minH = Math.min.apply(null, hArr);
                var minIndex = $.inArray(minH, hArr);
                $(value).css(
                    {
                        'position':'absolute',
                        'top':minH+'px',
                        'left':minIndex*w+'px',
                    }
                );
                hArr[minIndex]+=$boxs.eq(index).outerHeight();
            }
        })
}
function scrollchange() {
    var $boxs = $( ".box" );
    var $boxlas=$boxs.last();

    var $boxt=$boxlas.offset().top+Math.floor($boxlas.height()/2);
    var $scrollT=$(window).scrollTop();
    var $sceen=$(document).height();
    return ($boxt<$scrollT+$sceen)?true:false;
}