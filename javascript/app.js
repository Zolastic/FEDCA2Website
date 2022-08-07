
const form = document.getElementsByTagName('form')[0];      // declaration of variables
const letters = /^[A-Za-z]+$/;

const nameOfPerson = document.getElementById('nameOfPerson');
const nameOfPersonError = document.querySelector('#nameOfPerson + span.error');

const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');


const slider = document.getElementById("websiteRatingSlider");
const sliderValue = document.getElementById("ratingValue");
sliderValue.innerHTML = slider.value;

const feedbackTextArea = document.getElementsByTagName("textarea")[0];
const textAreaCharCounter = document.getElementById("textAreaCharCounter");
const charMaxLength = feedbackTextArea.getAttribute("maxlength");
const feedbackTextAreaError = document.querySelector('#feedbackTextArea + span.error');

nameOfPerson.addEventListener('input', function (event) {
  if (nameOfPerson.value.match(letters)) {
    nameOfPersonError.textContent = '';
    nameOfPersonError.className = '';
  } else {
    showErrorName();
    event.preventDefault();
  }
});


email.addEventListener('input', function (event) {        // 'input' is the event
  // Each time the user types something, check if the form fields are valid.
  if (email.validity.valid) {
    // In case there is an error message visible, if the field is valid, remove the error message.
    emailError.textContent = ''; // Resets the content of the message
    emailError.className = ''; // Resets the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showErrorEmail();
  }
});

form.addEventListener('submit', function (event) {
  // if the email field is valid, the form can be submitted

  if (!email.validity.valid) {
    //displays error message
    showErrorEmail();
    //Prevents the form from being sent by canceling the event
    event.preventDefault();
  }
});

slider.oninput = function () {        // to get and display the value of the slider
  sliderValue.innerHTML = this.value;
}


feedbackTextArea.addEventListener('input', function (event) {
  const target = event.target;  // target is a read-only property of the Event interface. It references to the object onto which the vent was dispatched
  const currentLength = target.value.length;
  textAreaCharCounter.innerHTML = `${currentLength} / 200`;

  if (currentLength <= 200) {
    feedbackTextAreaError.textContent = '';
    feedbackTextAreaError.className = '';
    feedbackTextArea.setCustomValidity('');
  } else {
    showErrorFeedbackTextArea();
  }
});


function showErrorName() {  // error message for user's name
  if (nameOfPerson.validity.valueMissing) {
    nameOfPersonError.textContent = 'Please enter a name.'
  } else if (!nameOfPerson.value.match(letters)) {
    nameOfPersonError.textContent = 'Alphabets only please!'
  }

  nameOfPersonError.className = 'error active';
}


function showErrorEmail() {   //error message for user's email
  if (email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an e-mail address.';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an e-mail address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters! You entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.className = 'error active';
}

function showErrorFeedbackTextArea() {    // error message for user's feedback
  feedbackTextArea.setCustomValidity('Feedback cannot be more than 200 characters!');
  feedbackTextAreaError.textContent = 'Feedback cannot be more than 200 characters!';
  feedbackTextAreaError.className = 'error active';
}