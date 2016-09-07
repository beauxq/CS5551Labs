/**
 * js for register.html
 */

// listener for registerButton
function registerClick() {
    var username = $("#username").val();
    var name = $("#name").val();
    var email = $("#email").val();
    if (!username || !name || !email) {
        // form is not filled
        // TODO: message about misssing data
        return;
    }
    // TODO: check for already registered username
    users[username] = {
        "name": name,
        "email": email
    };
    saveUsers();
    window.location.href = "login.html";
}
$("#registerButton").click(registerClick);
