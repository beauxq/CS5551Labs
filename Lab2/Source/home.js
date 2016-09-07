/**
 * js for home.html
 */

var currentUser = sessionStorage.getItem("lab2currentUser");
if (! currentUser) {
    // if no one is logged in, go to login page
    window.location.href = "login.html";
}
var name = users[currentUser].name;
$("#welcomeMessage").text("Welcome " + name + "!");
