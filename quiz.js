// ======== quiz.html (used by quiz.html)==========================
const option1 = document.querySelector("#option-1");
const option2 = document.querySelector("#option-2");
const option3 = document.querySelector("#option-3");
const submitBtn = document.querySelector("#submit-btn");

let choice = null; // Choice / answer selected by user
const questionText = document.querySelector("#question");
let currentQuestion = 0; // Keeps track of which question 

// ======== ARRAY OF QUESTIONS ====================================
// Additional questions can be added
const questions = [
  {
    question: "Where do snowy owls live?",
    options: ["A. The Arctic", "B. Tropical forests", "C. Deserts"],
    correct: 1
  },
  {
    question: "What color are snowy owls’ eyes?",
    options: ["A. Blue", "B. Yellow", "C. Brown"],
    correct: 2
  },
  {
    question: "Do male or female Snowy Owls have more dark spots?",
    options: ["A. Males", "B. Females", "C. Both the same?"],
    correct: 2
  },
  {
  question: "How do Snowy Owls sense objects that are close to them?",
  options: [
    "A. They use their sharp claws",
    "B. They use the bristles around their beaks",
    "C. They use their hearing"
  ],
  correct: 2
  },
  {
    question: "Are Snowy Owls diurnal or nocturnal?",
    options: ["A. Diurnal", "B. Nocturnal", "C. Both equally"],
    correct: 1
  },
  {
    question: "Ok... So what does diurnal mean?",
    options: ["A. Sleep all day...", "B. Active during the day ", "C. Active during the night"],
    correct: 2
  }
];

// ------- Event listeners on click for each option. ---------
// Update the to be highlighted by calling highlightSelection()
option1.addEventListener("click", () => { // OPTION 1
  choice = 1;
  highlightSelection(option1);
});
option2.addEventListener("click", () => { // OPTION 2
  choice = 2;
  highlightSelection(option2);
});
option3.addEventListener("click", () => { // OPTION 3
  choice = 3;
  highlightSelection(option3);
});

// ======== FUNCTIONS ====================================
// Name: highlightSelection
// Desscription: Clears previously highlighted option and updates
//    to highlight selectedOption
// Parameters: selectedOption
// Returns: None
function highlightSelection(selectedOption) {
  // Clear highlight for each option
  [option1, option2, option3].forEach(option => {
    option.style.color = ""; // Clear previous highlights
  });
  selectedOption.style.color = "#d1c588"; // Highlight the new choice
}

// Name: loadQuestion
// Desscription: Updates the question on the html along with the
//    options that are shown. 
// Parameters: None
// Returns: None
function loadQuestion() {
  // Update the question shown on HTML
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  // Update the options shown on HTML
  option1.textContent = q.options[0];
  option2.textContent = q.options[1];
  option3.textContent = q.options[2];
  choice = null; // Reset selected choice
  // Reset highlighted options
  [option1, option2, option3].forEach(opt => {
    opt.style.color = "";
  });
}

loadQuestion();

// ------- Event listeners for submit button --------------------------------------------------
// ------- Handles different selected option scenarios ----------------------------------------
submitBtn.addEventListener("click", () => {
  // Do nothing when no option was selected before submit
  if (choice === null) {
    return;
  }
  // Correct option selected
  if (choice === questions[currentQuestion].correct) {
      document.querySelector('#correct-dialog').show(); // Show correct dialog as feedback
      currentQuestion++;  // Increment the current question to update
  }
  // Incorrect option selected
  else {
      document.querySelector('#wrong-dialog').show();  // Show Incorrect dialog as feedback
  }

  if (currentQuestion < questions.length) { // Load question so long as there are questions left
      loadQuestion();
  } 
  else { // If there are no more questions remaing; the quiz has ended
      document.querySelector('#finish-dialog').show(); // Show finish quiz dialog as feedback
  }
});

