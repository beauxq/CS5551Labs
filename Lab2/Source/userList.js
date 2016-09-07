/**
 * set and retrieve list of users from localStorage
 */

var NAME_OF_USER_LIST_IN_STORAGE = "users";
var users = {};

function createUserListInLocalStorage() {
    var emptyUsers = {};
    localStorage.setItem(NAME_OF_USER_LIST_IN_STORAGE, JSON.stringify(emptyUsers));
    return emptyUsers;
}

// get user list from localStorage
if (localStorage.hasOwnProperty(NAME_OF_USER_LIST_IN_STORAGE)) {
    // validate data in localStorage
    try {
        users = JSON.parse(localStorage.getItem(NAME_OF_USER_LIST_IN_STORAGE));
    } catch (e) {
        users = createUserListInLocalStorage();
    }
} else {
    users = createUserListInLocalStorage();
}

// test - show all users in localStorage
Object.keys(users).forEach(function(property) {
    console.log(property);
    console.log(users[property]);
});

function saveUsers() {
    localStorage.setItem(NAME_OF_USER_LIST_IN_STORAGE, JSON.stringify(users));
}