$(function(){
  function buildHTML(message){
    var image = message.image == null
      ? ``
      : `<img src='${message.image}' , width = 250px, height = 150px >`

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
                  <div class="lower-message__content">
                    ${message.content}
                  <div>
                    ${image}
                 </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
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