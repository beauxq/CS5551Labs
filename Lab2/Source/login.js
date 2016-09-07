/**
 * js for login.html
 */

// listener for login button
function loginClick() {
    var username = $("#username").val();
    if (users.hasOwnProperty(username)) {
        sessionStorage.setItem("lab2currentUser", username);
        window.location.href = "home.html";
    } else {
        // TODO: invalid username message
        window.location.href = "register.html";
    }
}
$("#loginButton").click(loginClick);

// listener for register button
function registerClick() {
    window.location.href = "register.html";
}
$("#registerButton").click(registerClick);
