$(function () {
  var valid = {
    footer: false,
    modal: false
  }
  $('.modal').modal({
    endingTop: '30%'
  });
  $('.owl-carousel').slick({
    infinite: true,
    variableWidth: true,
    arrows: true,
    centerMode: true,
    LazyLoad: 'ondemand'
  });
  $('[data-mobile]').mask("+7 (000) 000-0000", {
    onComplete: function(el, e) {
      valid[$(e.target).parent().parent().children('button').attr('id').split('_')[0]] = true;
      $(e.target).parent().children('.alarm').css({'visibility':'hidden'})
    },
    onChange: (el,e)=>{
      valid[$(e.target).parent().parent().children('button').attr('id').split('_')[0]] = false;
    },
    onKeyPress: function(cep, e, field, options) {
      console.log(cep);
      console.log(field);
      console.log(e);
      console.log(options);
    } 
  })
  $('[type=checkbox]').change(function () {
    if (!$(this).prop('checked')) {
      $('#modal button').prop('disabled', 'disabled').css({ 'opacity': '.5' })
    } else {
      $('#modal button').prop('disabled', false).css({ 'opacity': '1' })
    }
  })
  $('.send').click(function (e) {
    let validate = valid[($(this).attr("id").split('_')[0])]
    if (validate) {
      $.post("send.php", 'Номер_телефона='+$(this).parent().children('.inp-wrap').children('input').val(),
        function (data) {
          if (data) {
            window.location.href=('http://volna-vladimir.ru/spasibo.html');
          }
        }
      );
      return
    }
    $(this).parent().children('.inp-wrap').children('.alarm').css({'visibility':'visible'})
  });
});
$('[data-mobile]').focus(function(){$(this).val('+7 (')})