$(function() {
  $(".js-user-search-field").on("keyup", function() {
    var input = $(".js-user-search-field").val();
    console.log(input);
  });
});