$(document).ready(() => {
  $(".signup-form").on("submit", (event) => {
    // console.log("clicked");
    event.preventDefault();
    const username = $(".username").val();
    const password = $(".password-input").val();
    console.log(username, password);
    $.post("/api/users/signup", { username, password }).then((response) => {
      // console.log(response);
    });
  });
});
