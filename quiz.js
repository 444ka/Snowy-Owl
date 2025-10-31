// ------- Quiz -----------------------------
const option1 = document.querySelector("#option-1");
const option2 = document.querySelector("#option-2");
const option3 = document.querySelector("#option-3");
const submitBtn = document.querySelector("#submit-btn");

let choice = null;

option1.addEventListener("click", () => {
  choice = 1;
  highlightSelection(option1);
});

option2.addEventListener("click", () => {
  choice = 2;
  highlightSelection(option2);
});

option3.addEventListener("click", () => {
  choice = 3;
  highlightSelection(option3);
});

function highlightSelection(selectedOption) {
  // Clear previous highlights
  [option1, option2, option3].forEach(option => {
    option.style.color = "";
  });
  // Highlight the new choice
  selectedOption.style.color = "#d1c588";
}

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

const questionText = document.querySelector("#question");
let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  option1.textContent = q.options[0];
  option2.textContent = q.options[1];
  option3.textContent = q.options[2];
  choice = null;
  [option1, option2, option3].forEach(opt => {
    opt.style.backgroundColor = "";
    opt.style.color = "";
  });
}

loadQuestion();

submitBtn.addEventListener("click", () => {
    if (choice === null) {
      return;
    }

    if (choice === questions[currentQuestion].correct) {
        document.querySelector('#correct-dialog').show();
        currentQuestion++;
    }
    else {
        document.querySelector('#wrong-dialog').show();
    }

    if (currentQuestion < questions.length) {
        loadQuestion();
    } 
    else {
        document.querySelector('#finish-dialog').show();
    }
});
