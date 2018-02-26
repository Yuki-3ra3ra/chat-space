$(function(){
  function buildHTML(message){
  if (message.content && message.image.url) {
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
                    <img src = "${message.image}" class = "lower-message__image" width = "250" height = "150">
                  </div>
                </div>`
  } else if (message.content){
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
                  </div>
                </div>`
  } else if (message.image){
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
                    <img src = "${message.image}" class = "lower-message__image" width = "250" height = "150">
                  </div>
                </div>`
  }
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
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},500);
    })
    .fail(function() {
     alert('エラーのためメッセージの送信ができませんでした。');
    })
  })
});