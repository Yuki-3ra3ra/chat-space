$(function() {
    var buildSearchedUserHTML = function(user) {
    var html = '<div class="chat-group-user clearfix">' +
      '<p class="chat-group-user__name">' +
      user.name +
      '</p>' +
      '<a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id="' + user.id + '" data-user-name="' + user.name + '">追加' +
      '</a>' +
      '</div>';
    return html;
  };

  $(".js-user-search-field").on("keyup", function() {
    var name = $(".js-user-search-field").val();
    console.log(name);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { key: name },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users);
       var insertHTML = '';
       users.forEach(function(user){
         insertHTML += buildSearchedUserHTML(user);
       });
       $('.js-user-seaerch-result').empty();
       $('.js-user-seaerch-result').append(insertHTML);
    })

    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    });
  });
});