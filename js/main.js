// Questions Array
const questions = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  { question: "Enter Your Email", pattern: /\S+@\S+\.\S+/ },
  { question: "Create A Password", type: "password" }
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

// Events
// Get question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);

// Next button click
nextBtn.addEventListener("click", validate);

// Input field enter click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13) {
    validate();
  }
});

// Prev button click
prevBtn.addEventListener("click", () => {
  position--;
  getQuestion();
});

// Functions
// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;

  // Get Current Type
  inputField.type = questions[position].type || "text"; // If it doesn't have a type, we want it to be text
  
  inputField.value = questions[position].answer || "";
  // console.log(questions[position].answer);

  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + "%";

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user"; // Change icon whether it's 0th question or not

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  // inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// Hide Question From User
function hideQuestion() {

  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    console.log(inputField.value);
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = "error";
  // Repeat Shake Motion - Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0); // Returning the input field into the (0,0) position after the last transform
    inputField.focus();
  }
}

// Field Input Passed
function inputPass() {
  formBox.className = ""; // If it passes remove the error class
  
  // Have the effect of input form move down 10 px in 100 ms
  setTimeout(transform, shakeTime * 0, 0, 10); 
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store answer in array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If new qeustion, hide current and get next
  if(questions[position]) {
    hideQuestion();
    getQuestion();
  } else {  // Close the box if there's no more questions left
    hideQuestion();
    
    prevBtn.style.color = '#fff';
    nextBtn.style.color = '#fff';
    progress.style.width = '100%';
    setTimeout(() => {
      formBox.className = 'close';
    }, 500); 

    // Form complete
    formComplete();
  }
}

// All fields complete - show h1 end
function formComplete() {
  console.log(questions);
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly`));
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1,
      h1.style.color = '#fff'
    }, 50);
  }, 1000);
}
