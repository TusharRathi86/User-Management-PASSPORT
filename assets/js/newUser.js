// Clearing error messages 
function clearErrors() {
    errors = document.getElementsByClassName('formError');
    for (let item of errors) {
        item.innerHTML = "";
    }
}

// Setting error messages 
function setError(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formError')[0].innerHTML = error;
}

// Validation function for the user form 
function validation() {
    var returnVal = true;
    clearErrors();

    // **Name**
    var name = document.forms['userForm']["name"].value.trim();

    // Regular Expression for name
    function nameCheck(str) {
        var nameConts;
        var reN = /^[a-zA-Z ]*$/;
        if (reN.test(str)) {
            nameConts = true;
        }
        else {
            nameConts = false;
        }
        return nameConts;
    }

    // Conditions on name field
    if (name.length < 3) {
        setError("name", "**Length of name is too short");
        returnVal = false;
    }
    if (name.length == 0) {
        setError("name", "**Length of name cannot be zero");
        returnVal = false;
    }
    if (name.length > 50) {
        setError("name", "**Length of name is too long");
        returnVal = false;
    }
    if ((name.length > 0)) {
        if (nameCheck(name) == false) {
            setError("name", "**Invalid input. Please enter your name in alphabets only.");
            returnVal = false;
        }
    }

    // **Email**
    var email = document.forms['userForm']["email"].value.trim();

    //Regular Expression For E-mail.
    function emailCheck(str) {
        var emailConts;
        var reN = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9]+).([a-zA-Z]{2,8})(.[a-z]{2,3})$/;
        // var reN = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (reN.test(str)) {
            emailConts = true;
        }
        else {
            emailConts = false;
        }
        return emailConts;
    }
    // Conditions on email field
    if (email.length > 50) {
        setError("email", "**Email length is too long");
        returnVal = false;
    }
    if (email.length == 0) {
        setError("email", "**Length of email cannot be zero");
        returnVal = false;
    }
    if ((email.length > 0)) {
        if (emailCheck(email) != true) {
            setError("email", "**Please enter a valid email. Format should be abc@example.com");
            returnVal = false;
        }
    }

    // **Phone Number**
    var phone = document.forms['userForm']["phoneNumber"].value.trim(); // name=>

    // Regular expression for phone number 
    function phoneCheck(str) {
        var phoneConts;
        var reN = /^[0-9]*$/;
        if (reN.test(str)) {
            phoneConts = true;
        }
        else {
            phoneConts = false;
        }
        return phoneConts;
    }

    // Conditions on phone number field
    if (phone.length != 10) {
        setError("phone", "**Enter a valid phone number"); // id=>
        returnVal = false;
    }
    if ((phone.length > 0)) {
        if (phoneCheck(phone) == false) {
            setError("phone", "**Invalid input. Please enter your phone number in numeric only.");
            returnVal = false;
        }
    }

    // **Address**
    var address = document.forms['userForm']["address"].value.trim();

    // Conditions on address field
    if (address.length < 10) {
        setError("address", "**Enter a valid address");
        returnVal = false;
    }
    if (address.length > 60) {
        setError("address", "**Entered address is too long");
        returnVal = false;
    }

    return returnVal;
}