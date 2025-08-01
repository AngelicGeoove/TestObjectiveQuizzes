// --- Global State ---
let allQuestions = []; // This will be populated by the loaded quiz set
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizSetId = ''; // To identify the current quiz set

// --- Element References ---
const screens = {
    start: document.getElementById('start-screen'),
    quiz: document.getElementById('quiz-container'),
    results: document.getElementById('results-container')
};
const numQuestionsInput = document.getElementById('num-questions-input');
const startQuizBtn = document.getElementById('start-quiz-btn');
const errorMessage = document.getElementById('error-message');
const quizTitleStart = document.getElementById('quiz-title-start');
const quizTitleResults = document.getElementById('quiz-title-results');
const questionHeaderEl = document.getElementById('question-header');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const finishEarlyBtn = document.getElementById('finish-early-btn');
const scoreEl = document.getElementById('score');
const resultsDetailsEl = document.getElementById('results-details');
const restartBtn = document.getElementById('restart-btn');
const retryIncorrectBtn = document.getElementById('retry-incorrect-btn');

// --- Functions ---
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.style.display = 'none');
    screens[screenName].style.display = 'block';
}

function handleStartQuiz() {
    const num = parseInt(numQuestionsInput.value);
    if (isNaN(num) || num <= 0) {
        errorMessage.textContent = 'Please enter a valid number greater than 0.';
        return;
    }
    if (num > allQuestions.length) {
        errorMessage.textContent = `Only ${allQuestions.length} questions are available. Please choose a smaller number.`;
        return;
    }
    errorMessage.textContent = '';

    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    quizQuestions = shuffled.slice(0, num);
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    showScreen('quiz');
    displayQuestion();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionHeaderEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    questionTextEl.innerHTML = question.question.replace(/\n/g, '<br>');
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        const optionLetter = String.fromCharCode(65 + index);
        button.innerHTML = `${optionLetter}. ${option}`;
        button.dataset.option = optionLetter;
        button.addEventListener('click', () => handleSelectAnswer(optionLetter));
        optionsContainer.appendChild(button);
    });
    updateNavigation();
    restoreAnswerState();
}

function handleSelectAnswer(selectedOptionLetter) {
    userAnswers[currentQuestionIndex] = selectedOptionLetter;
    restoreAnswerState();
    setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            showResults();
        }
    }, 1200);
}

function restoreAnswerState() {
    if (userAnswers[currentQuestionIndex] !== null) {
        const question = quizQuestions[currentQuestionIndex];
        const selectedOptionLetter = userAnswers[currentQuestionIndex];
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            button.disabled = true;
            const optionLetter = button.dataset.option;
            if (optionLetter === question.correct) {
                button.classList.add('correct');
            } else if (optionLetter === selectedOptionLetter) {
                button.classList.add('incorrect');
            }
        });
    }
}

function updateNavigation() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next';
}

function showResults() {
    let correctAnswersCount = 0;
    let answeredCount = 0;
    const incorrectQuestionsForRetry = [];
    resultsDetailsEl.innerHTML = '';

    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        let rowClass = 'result-row-unanswered';
        let resultIcon = '➖';

        if (userAnswer !== null) {
            answeredCount++;
            if (isCorrect) {
                correctAnswersCount++;
                rowClass = 'result-row-correct';
                resultIcon = '✔️';
            } else {
                rowClass = 'result-row-incorrect';
                resultIcon = '❌';
                incorrectQuestionsForRetry.push(question);
            }
        }

        const correctOptionText = question.options[question.correct.charCodeAt(0) - 65];
        const userOptionText = userAnswer ? question.options[userAnswer.charCodeAt(0) - 65] : "Not Answered";
        const row = document.createElement('tr');
        row.className = rowClass;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.question}</td>
            <td>${userAnswer ? userAnswer + ". " + userOptionText : 'Not Answered'}</td>
            <td>${question.correct + ". " + correctOptionText}</td>
            <td><span class="result-icon">${resultIcon}</span></td>
        `;
        resultsDetailsEl.appendChild(row);
    });

    const percentage = answeredCount > 0 ? ((correctAnswersCount / answeredCount) * 100).toFixed(2) : 0;
    scoreEl.textContent = `You scored ${correctAnswersCount} out of ${answeredCount} answered questions (${percentage}%)`;

    if (incorrectQuestionsForRetry.length > 0) {
        retryIncorrectBtn.style.display = 'inline-block';
        retryIncorrectBtn.textContent = `Retry ${incorrectQuestionsForRetry.length} Incorrect Questions`;
        retryIncorrectBtn.onclick = () => {
            quizQuestions = incorrectQuestionsForRetry;
            currentQuestionIndex = 0;
            userAnswers = new Array(quizQuestions.length).fill(null);
            showScreen('quiz');
            displayQuestion();
        };
    } else {
        retryIncorrectBtn.style.display = 'none';
    }

    showScreen('results');
}

function initializeQuiz() {
    const currentQuizData = window.quizSets[quizSetId];
    if (!currentQuizData) {
        document.body.innerHTML = `<h1>Error: Quiz set '${quizSetId}' not found.</h1><a href="index.html">Back to Quiz List</a>`;
        return;
    }

    allQuestions = currentQuizData.questions;
    document.title = currentQuizData.title;
    quizTitleStart.textContent = currentQuizData.title;
    quizTitleResults.textContent = `${currentQuizData.title} Results`;

    numQuestionsInput.max = allQuestions.length;
    numQuestionsInput.value = Math.min(20, allQuestions.length);

    showScreen('start');
    
    // Attach Event Listeners
    startQuizBtn.addEventListener('click', handleStartQuiz);
    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            showResults();
        }
    });
    finishEarlyBtn.addEventListener('click', showResults);
    restartBtn.addEventListener('click', () => showScreen('start'));
}

// --- Initial Setup on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the quiz set ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    quizSetId = urlParams.get('set');

    if (quizSetId) {
        // 2. Dynamically load the correct question set script
        const script = document.createElement('script');
        script.src = `js/${quizSetId}_quiz_set.js`;

        // 3. Once the script is loaded, initialize the quiz
        script.onload = initializeQuiz;
        
        script.onerror = () => {
             document.body.innerHTML = `<h1>Error: Could not load the quiz file for '${quizSetId}'.</h1><p>Please ensure the file <code>js/${quizSetId}_quiz_set.js</code> exists.</p><a href="index.html">Back to Quiz List</a>`;
        };
        document.head.appendChild(script);
    } else {
        // Handle case where no set is provided
        document.body.innerHTML = '<h1>No quiz set selected.</h1><a href="index.html">Please select a quiz from the main page.</a>';
    }
});