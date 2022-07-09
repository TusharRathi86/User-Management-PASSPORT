const form = document.getElementById('myform');
const username = document.getElementById('username');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

// Function for setting erros.
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

// Function for setting success.
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Regular expression for username
function isUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

// Regular expression for password
function isPassword(password) {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
}

function checkInputs() {

    // trim to remove the whitespaces
    const usernameValue = document.forms['userform']["username"].value.trim();
    const passwordValue = document.forms['userform']["password"].value.trim();
    const cpasswordValue = document.forms['userform']["cpassword"].value.trim();

    // Username
    if (usernameValue === '') {
        setErrorFor(username, '**Username cannot be null')
    } else if (usernameValue.length < 3) {
        setErrorFor(username, "**Username should be between 3 and 20");
    } else if (usernameValue.length > 20) {
        setErrorFor(username, "**Username should be between 3 and 20");
    } else if (!isUsername(usernameValue)) {
        setErrorFor(username, "**Username should be alphanumeric");
    }
    else {
        setSuccessFor(username);
    }

    // Password
    if (passwordValue === '') {
        setErrorFor(password, '**Password cannot be blank');
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, '**Alphanumeric and one special character');
    }
    else {
        setSuccessFor(password);
    }

    // Confirm Password
    if (cpasswordValue === '') {
        setErrorFor(cpassword, '**Password cannot be blank');
    } else if (passwordValue !== cpasswordValue) {
        setErrorFor(cpassword, '**Passwords do not match');
    } else {
        setSuccessFor(cpassword);
    }
}

// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});