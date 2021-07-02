// Declare all variables
// const form = document.getElementById("form")
let eye = document.querySelector(".toggle-pass");
let eyeCon = document.querySelector(".toggle-pass-confirm");
let submitBtn = document.querySelector("#submitbtn");
let email_input = document.querySelector("#email");
let password_input = document.querySelector("#password");
let firstname_input = document.querySelector("#firstname");
let lastname_input = document.querySelector("#lastname");
let phone_input = document.querySelector("#phone");
let passwordConfirm_input = document.querySelector("#passwordConfirm");

let checkMail = false;
let checkPwd = false;

submitBtn.disabled = true;

// EVENT LISTENERS
eye.addEventListener("click", () => {
  if (eye.classList.contains("bi-eye-slash")) {
    eye.classList.remove("bi-eye-slash");
    eye.classList.add("bi-eye");
    password_input.type = "text";
  } else if (eye.classList.contains("bi-eye")) {
    password_input.type = "password";
    eye.classList.remove("bi-eye");
    eye.classList.add("bi-eye-slash");
  }
});

eyeCon.addEventListener("click", () => {
  if (eyeCon.classList.contains("bi-eye-slash")) {
    eyeCon.classList.remove("bi-eye-slash");
    eyeCon.classList.add("bi-eye");
    passwordConfirm_input.type = "text";
  } else if (eyeCon.classList.contains("bi-eye")) {
    passwordConfirm_input.type = "password";
    eyeCon.classList.remove("bi-eye");
    eyeCon.classList.add("bi-eye-slash");
  }
});

email_input.addEventListener("input", () => {
  validateMail(email_input.value);
  disableBtn();
});

password_input.addEventListener("input", () => {
  validatePassword(password_input.value);
  disableBtn();
});

firstname_input.addEventListener("input", () => {
    validateFirstname(firstname_input.value);
    disableBtn();
});

lastname_input.addEventListener("input", () => {
    validateLastname(lastname_input.value);
    disableBtn();
});

phone_input.addEventListener("input", () => {
    validatePhone(phone_input.value);
    disableBtn();
});

passwordConfirm_input.addEventListener("input", () => {
    validateConfirmPassword(password_input.value, passwordConfirm_input.value);
    disableBtn();
});

// FORM VALIDATION
let validateMail = (emailValue) => {
  if (emailValue === '') {
    setErrorFor(email, "Email cannot be blank");
    checkMail = false;
  } else {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        emailValue
      )
    ) {
        setSuccessFor(email);

      return checkMail = true;
    }
    setErrorFor(email, "Email is not correctly formatted eg example@company.com");

    return checkMail = false;
  }
};

let validatePassword = (passwordValue) => {
  if (passwordValue === '') {
    setErrorFor(password, "Password cannot be blank");
    checkPwd = false;
  } else if (passwordValue.length >= 8) {
    setSuccessFor(password);

    return (checkPwd = true);
  } else {
    setErrorFor(password, "Password cannot be less than 8 characters");
    return (checkPwd = false);
  }
};

let validateFirstname = (firstnameValue) => {
  if (firstnameValue === '') {
    setErrorFor(firstname, "Firstname cannot be blank");
    checkPwd = false;
  } else if (firstnameValue.length >= 2) {
    setSuccessFor(firstname);

    return (checkPwd = true);
  } else {
    setErrorFor(firstname, "Firstname cannot be less than 2 characters");
    return (checkPwd = false);
  }
};

let validateLastname = (lastnameValue) => {
  if (lastnameValue === '') {
    setErrorFor(lastname, "lastname cannot be blank");
    checkPwd = false;
  } else if (lastnameValue.length >= 2) {
    setSuccessFor(lastname);

    return (checkPwd = true);
  } else {
    setErrorFor(lastname, "lastname cannot be less than 2 characters");
    return (checkPwd = false);
  }
};

let validatePhone = (phoneValue) => {
  if (phoneValue === '') {
    setErrorFor(phone, "phone cannot be blank");
    checkPwd = false;
  } else if (phoneValue.length >= 10) {
    setSuccessFor(phone);

    return (checkPwd = true);
  } else if (isNaN(phoneValue)) {
    setErrorFor(phone, "phone must be numbers");

    return (checkPwd = true);
  } else {
    setErrorFor(phone, "phone cannot be less than 10 characters");
    return (checkPwd = false);
  }
};

let validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === '') {
    setErrorFor(passwordConfirm, "passowrd cannot be blank");
    checkPwd = false;
  } else if (password === confirmPassword) {
    setSuccessFor(passwordConfirm);

    return (checkPwd = true);
  } else {
    setErrorFor(passwordConfirm, "password does not match");
    return (checkPwd = false);
  }
};

let disableBtn = () => {
  submitBtn.disabled = true;

  if (checkMail && checkPwd) {
    submitBtn.disabled = false;
  }
};

submitBtn.addEventListener("click", (e) => {
  submit();
  e.preventDefault();
});

// declaring input and sucess or error message function

function setErrorFor(input, message) {
  const formContainer = input.parentElement;
  const small = formContainer.querySelector("small");

  // add error message
  formContainer.className = "form-container error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formContainer = input.parentElement;
  formContainer.className = "form-container success";
}

// create a function to submit a form

// FORM SUBMISSION
const submit = async (req, res) => {
  const query = "https://stocka-demo.herokuapp.com/api/v1/auth/register";

  const userData = {};
  userData.email = document.querySelector("#email").value;
  userData.password = document.querySelector("#password").value;
  userData.firstname = document.querySelector("#firstname").value;
  userData.lastname = document.querySelector("#lastname").value;
  userData.phone = document.querySelector("#phone").value;

  submitBtn.disabled = true;

  // console.log(userData);

  await axios
    .post(query, userData)
    .then((response) => {
      // console.log("list webhook", response.data);

      Swal.fire('Congratulations', 'Registration successful', 'success')
      setTimeout((window.location.replace("dashboard.html")), 7000)
    })
    .catch((error) => {
      // console.log(error);
      Swal.fire('Uh oh!', error.message, 'error')
      res.status(500).json({
        error: error.message,
      });
    });
};
