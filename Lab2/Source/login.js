/**
 * js for login.html
 */

var NAME_OF_USER_LIST_IN_STORAGE = "users";
var users;

function createUserListInLocalStorage() {
    var emptyUsers = {};
    localStorage.setItem(NAME_OF_USER_LIST_IN_STORAGE, JSON.stringify(emptyUsers));
    return emptyUsers;
}

// get user list from localStorage
if (localStorage.hasOwnProperty("users")) {
    // validate data in localStorage
    try {
        users = JSON.parse(localStorage.getItem("lab2"));
    } catch (e) {
        users = createUserListInLocalStorage();
    }
} else {
    users = createUserListInLocalStorage();
}

// test - show all users in localStorage
users.keys.forEach(function(property) {
    console.log(property);
    console.log(users[property]);
});

// listener for login button
function loginClick() {
    var username = $("#username").val();
    if (users.hasOwnProperty(username)) {
        sessionStorage.setItem("lab2currentUser", username);
        window.location.href = "home.html";
    } else {
        window.location.href = "register.html";
    }
}
$("#loginButton").click(loginClick);

// listener for register button
function registerClick() {
    window.location.href = "register.html";
}
$("#registerButton").click(registerClick);
