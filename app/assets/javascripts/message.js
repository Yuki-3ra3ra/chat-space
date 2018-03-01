$(function(){
  function buildHTML(message){
    var image = message.image == null
      ? ``
      : `<img src='${message.image}' , width = 250px, height = 150px >`

    var html = `<div class = "message" data-id=${message.id}>
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
  };
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
      $('.hidden').val('')
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight},500);
    })
    .fail(function() {
     alert('エラーのためメッセージの送信ができませんでした。');
    })
    .always(function() {
      $('.form__submit').prop('disabled', false);
    });
  })

  $(function(){
    setInterval(update, 2000);
  });
  function update(){
    var message_id = $(".message").last().data("id");
    var url = location.href;
    if (!(url.includes('groups' && "messages"))){
      return
    };
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {id: message_id },
      dataType: 'json'
    })
    .done(function(data){
      console.log(data);
      data.forEach(function(datum) {
        var html = buildHTML(datum);
        $(".messages").append(html)
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      })
    })
    .fail(function() {
     alert('エラーのためメッセージの送信ができませんでした。');
    })
    .always(function() {
      $('.form__submit').prop('disabled', false);
    });
  }
});