// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "Which of the following is the correct HTML element for inserting a line break?",
      answers: [
        { text: "<break>", correct: false },
        { text: "<lb>", correct: false },
        { text: "<br>", correct: true },
        { text: "<line>", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // Within each HTML element there is a attribute called id which you can define to later reference (i.e. <div id="question">) in JS. Each ID should be unique so you can reference the specific one you need. 
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  //Got the element and assigned it to a variable with the id. 
  const hintButton = document.getElementById("hint-btn");
  let usedHint = false;
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
    hintButton.style.display = "block";

  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // Since our questions are dynamic meaning we can add more or get rid of some within the JS file, it is best to generate the HTML elements dynamically to save time and code. It avoids repetition and allows the quiz to be flexible. 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // It adds the created button to the answerButtonsElement container as a child which allows the button to be displayed as one of the selectable answer choices on the page. This is repeated for all answer choices. 
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // After a question is answered, this line of code makes sure that the 'Next' button is visible to the user so they can move on to the next question. If we did not have this line the user would not be able to move onto the next question. Our quiz would not be functional. 
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
    hintButton.style.display = "none";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

//handles the hint button
  function handleHint(){
    const wrongs = [];
    for (let i = 0; i < answerButtonsElement.children.length; i++) {
      if (answerButtonsElement.children[i].dataset.correct) {
        continue;
      } else {
        wrongs.push(answerButtonsElement.children[i]);
      }
    }
    wrongs[Math.floor(Math.random() * wrongs.length)].classList.add("wrong");
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // It adds a event listener to the 'Next' button meaning that everytime that the button is clicked it will run the below code. The code will either move onto the next question if the current question displayed is less than the total number of questions. Otherwise, it will restart the quiz so the user can take it again. 
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      usedHint = false;
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  // Added a event listener to the hint button so it can give the hint to the user
  hintButton.addEventListener("click", () => {
    if (!usedHint){
      handleHint();
      usedHint = true;
    }
  });
  
  
  startQuiz();
  



