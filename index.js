 // Quiz Data
 var quiz = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Argentina"],
      answer: "France"
    }
  ];

  var currentQuestion = 0;
  var score = 0;
  var timeLeft = 60; // Time limit in seconds

  var questionElement = document.getElementById("question");
  var optionsElement = document.getElementById("options");
  var submitButton = document.getElementById("submit");
  var resultContainer = document.getElementById("result-container");
  var scoreElement = document.getElementById("score");
  var timerElement = document.createElement("div");
  timerElement.textContent = "Time left: " + timeLeft + "s";
  document.body.insertBefore(timerElement, document.getElementById("quiz-container"));

  var timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = "Time left: " + timeLeft + "s";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResult();
    }
  }, 1000);

  // Function to load the current question
  function loadQuestion() {
    var currentQuiz = quiz[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = "";

    for (var i = 0; i < currentQuiz.options.length; i++) {
      var option = document.createElement("button");
      option.textContent = currentQuiz.options[i];
      option.addEventListener("click", selectOption);
      optionsElement.appendChild(option);
    }
  }

  // Function to handle option selection
  function selectOption() {
    var selectedOption = this.textContent;
    if (selectedOption === quiz[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;

    if (currentQuestion < quiz.length) {
      loadQuestion();
    } else {
      clearInterval(timerInterval);
      showResult();
    }
  }

  // Function to show the quiz result
  function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitButton.style.display = "none";
    timerElement.style.display = "none";

    resultContainer.style.display = "block";
    scoreElement.textContent = "You scored " + score + " out of " + quiz.length + "!";
  }

  // Event listener for the submit button
  submitButton.addEventListener("click", selectOption);

  // Load the first question
  loadQuestion();