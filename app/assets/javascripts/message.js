$(function(){
  function buildHTML(message){
    if(message.image){
      image = `<img src=${message.image} width="250" height="150">`;
      }else{
       image = "";
    }
    var html = `<div class = "message">
                 <div class = "upper-message">
                  <div class = "upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class = "upper-message__date">
                    ${message.created_at}
                  </div>
                 </div>
                 <div class ="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${image}
                 </div>
                </div>`
    return html;
  }
  $('.js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('.form__mask__image').val('')
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},500);
    })
    .fail(function() {
     alert('エラーのためメッセージの送信ができませんでした。');
    })
    .always(function() {
      $('.form__submit').prop('disabled', false);
    });
  })
});