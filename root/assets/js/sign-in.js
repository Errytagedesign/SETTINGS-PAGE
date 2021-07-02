// DECLARATIONS
let eye = document.querySelector('.toggle-pass');
let submitBtn = document.querySelector('#submitBtn');
let email_input = document.querySelector('#email');
let password_input = document.querySelector('#password');
let invalidMsg1 = document.querySelector('.wrong-mail');
let invalidMsg2 = document.querySelector('.wrong-pass');

let check1 = false;
let check2 = false;

submitBtn.disabled = true;

// EVENT LISTENERS
eye.addEventListener('click', () => {
  if (eye.classList.contains('bi-eye-slash')) {
    eye.classList.remove('bi-eye-slash');
    eye.classList.add('bi-eye');
    password_input.type = 'text';
  } else if (eye.classList.contains('bi-eye')) {
    password_input.type = 'password';
    eye.classList.remove('bi-eye');
    eye.classList.add('bi-eye-slash');
  }
});

email_input.addEventListener('input', () => {
  validateMail(email_input.value);
  disableBtn();
});

password_input.addEventListener('input', () => {
  validatePassword(password_input.value);
  disableBtn();
});

// FORM VALIDATION
let validateMail = emailValue => {
  if (emailValue.length == 0) {
    invalidMsg1.classList.remove('visible');
    check1 = false;
  } else {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        emailValue
      )
    ) {
      invalidMsg1.classList.add('visible');
      invalidMsg1.classList.remove('bi-x-circle');
      invalidMsg1.classList.add('bi-check-circle');
      invalidMsg1.classList.add('green');

      check1 = true;
      return true;
    }
    invalidMsg1.classList.add('visible');
    invalidMsg1.classList.remove('bi-check-circle');
    invalidMsg1.classList.add('bi-x-circle');
    invalidMsg1.classList.remove('green');
    check1 = false;

    return false;
  }
};

let validatePassword = passwordValue => {
  if (passwordValue.length == 0) {
    invalidMsg2.classList.remove('visible');
    check2 = false;
  } else if (passwordValue.length >= 8) {
    invalidMsg2.classList.add('visible');
    invalidMsg2.classList.remove('bi-x-circle');
    invalidMsg2.classList.add('bi-check-circle');
    invalidMsg2.classList.add('green');

    check2 = true;
  } else {
    invalidMsg2.classList.add('visible');
    invalidMsg2.classList.remove('bi-check-circle');
    invalidMsg2.classList.add('bi-x-circle');
    invalidMsg2.classList.remove('green');
    check2 = false;
  }
};

let disableBtn = () => {
  submitBtn.disabled = true;

  if (check1 && check2) {
    submitBtn.disabled = false;
  }
};

// FORM SUBMISSION
const submit = async (req, res) => {
  const query = 'https://stocka-demo.herokuapp.com/api/v1/auth/login';

  const userLoginData = {};
  userLoginData.email = document.querySelector('#email').value;
  userLoginData.password = document.querySelector('#password').value;

  // console.log(userLoginData);

  await axios
    .post(query, userLoginData)
    .then(response => {
      // console.log('list webhook', response.data);

      Swal.fire('Congratulations', 'Log in successful', 'success')
      setTimeout((window.location.replace("dashboard.html")), 7000)
    })
    .catch(error => {
      // console.log(error);
      Swal.fire('Uh oh!', error.message, 'error')
      res.status(500).json({
        error: error.message,
      });
    });
};

submitBtn.addEventListener('click', e => {
  submit();
  e.preventDefault();
});
