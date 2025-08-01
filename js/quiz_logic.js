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

// Leaderboard elements
const submitLeaderboardBtn = document.getElementById('submit-leaderboard-btn');
const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
const indexModal = document.getElementById('index-modal');
const indexInput = document.getElementById('index-input');
const submitScoreBtn = document.getElementById('submit-score-btn');
const cancelSubmitBtn = document.getElementById('cancel-submit-btn');

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

// --- GitHub Configuration ---
const GITHUB_CONFIG = {
    owner: 'AngelicGeoove',
    repo: 'TestObjectiveQuizzes',
    token: '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'
};

// --- Leaderboard Functions ---
function showIndexModal() {
    indexModal.style.display = 'block';
    indexInput.value = '';
    indexInput.focus();
}

function hideIndexModal() {
    indexModal.style.display = 'none';
}

async function saveToLeaderboard(indexNumber) {
    const correctAnswers = userAnswers.filter((answer, idx) => 
        answer && answer === quizQuestions[idx].correct
    ).length;
    
    const currentQuizData = window.quizSets[quizSetId];
    const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
    
    const leaderboardEntry = {
        indexNumber: indexNumber,
        category: currentQuizData.title,
        quizSetId: quizSetId,
        questionsAnswered: quizQuestions.length,
        correctAnswers: correctAnswers,
        totalQuestions: quizQuestions.length,
        percentage: percentage,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = document.getElementById('submit-score-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Submitting...';
    submitBtn.disabled = true;
    
    try {
        // Try to submit to GitHub Issues first
        await submitToGitHubIssues(leaderboardEntry);
        
        // Also save to localStorage as backup
        saveToLocalStorage(leaderboardEntry);
        
        alert(`🎉 Successfully submitted to global leaderboard!\n\nScore: ${correctAnswers}/${quizQuestions.length} (${percentage}%)\nIndex: ${indexNumber}\n\nYour score is now visible to everyone!`);
        
    } catch (error) {
        console.error('GitHub submission failed:', error);
        
        // Fallback to localStorage only
        saveToLocalStorage(leaderboardEntry);
        
        alert(`⚠️ Submitted to local leaderboard only.\n\nScore: ${correctAnswers}/${quizQuestions.length} (${percentage}%)\n\nNote: Global leaderboard submission failed. Your score is saved locally.`);
    } finally {
        // Restore button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function submitToGitHubIssues(entry) {
    const issueTitle = `🏆 ${entry.indexNumber} - ${entry.percentage}% (${entry.correctAnswers}/${entry.totalQuestions}) - ${entry.category}`;
    
    const issueBody = `## Quiz Leaderboard Entry

**Index Number:** ${entry.indexNumber}  
**Quiz Category:** ${entry.category}  
**Score:** ${entry.correctAnswers}/${entry.totalQuestions} (${entry.percentage}%)  
**Questions Attempted:** ${entry.questionsAnswered}  
**Date:** ${entry.date}  
**Time:** ${entry.time}  

---
*Automatically generated leaderboard entry*

\`\`\`json
${JSON.stringify(entry, null, 2)}
\`\`\``;

    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_CONFIG.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: issueTitle,
            body: issueBody,
            labels: ['leaderboard', `quiz-${entry.quizSetId}`, `score-${entry.percentage}`]
        })
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GitHub API error: ${response.status} - ${errorData}`);
    }

    return await response.json();
}

function saveToLocalStorage(leaderboardEntry) {
    // Get existing leaderboard data
    const existingData = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    
    // Add new entry
    existingData.push(leaderboardEntry);
    
    // Sort by percentage (highest first), then by total questions (most first)
    existingData.sort((a, b) => {
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
        }
        return b.totalQuestions - a.totalQuestions;
    });
    
    // Save back to localStorage
    localStorage.setItem('quizLeaderboard', JSON.stringify(existingData));
}

async function viewLeaderboard() {
    // Show loading message
    const loadingMsg = alert('📊 Loading global leaderboard...');
    
    try {
        // Try to fetch from GitHub Issues first
        const githubData = await fetchFromGitHubIssues();
        
        if (githubData.length > 0) {
            displayLeaderboard(githubData, 'global');
        } else {
            // Fallback to localStorage if no GitHub data
            const localData = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
            displayLeaderboard(localData, 'local');
        }
        
    } catch (error) {
        console.error('GitHub fetch failed:', error);
        
        // Fallback to localStorage
        const localData = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
        displayLeaderboard(localData, 'local');
    }
}

async function fetchFromGitHubIssues() {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/issues?labels=leaderboard&state=open&per_page=100`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': `token ${GITHUB_CONFIG.token}`
        }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const issues = await response.json();
    const leaderboardData = [];

    for (const issue of issues) {
        try {
            // Extract JSON data from issue body
            const jsonMatch = issue.body.match(/```json\n(.*?)\n```/s);
            if (jsonMatch) {
                const data = JSON.parse(jsonMatch[1]);
                leaderboardData.push(data);
            }
        } catch (error) {
            console.warn('Failed to parse issue data:', error);
        }
    }

    // Sort by percentage (highest first), then by total questions (most first)
    leaderboardData.sort((a, b) => {
        if (b.percentage !== a.percentage) {
            return b.percentage - a.percentage;
        }
        return b.totalQuestions - a.totalQuestions;
    });

    return leaderboardData;
}

function displayLeaderboard(leaderboardData, source) {
    if (leaderboardData.length === 0) {
        alert('📭 No leaderboard entries yet. Be the first to submit your score!');
        return;
    }
    
    const sourceText = source === 'global' ? '🌍 Global Leaderboard (GitHub)' : '💾 Local Leaderboard';
    
    // Create leaderboard window content
    let leaderboardHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Quiz Leaderboard</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    color: #333;
                    padding: 20px;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    padding: 40px;
                    animation: fadeInUp 0.8s ease-out;
                }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                h1 {
                    text-align: center;
                    font-size: 2.5em;
                    font-weight: 700;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 20px;
                }
                .source-badge {
                    text-align: center;
                    margin-bottom: 30px;
                    padding: 10px 20px;
                    background: ${source === 'global' ? 'linear-gradient(135deg, #48bb78, #38a169)' : 'linear-gradient(135deg, #ed8936, #dd6b20)'};
                    color: white;
                    border-radius: 25px;
                    display: inline-block;
                    font-weight: 600;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                }
                th, td {
                    padding: 15px 12px;
                    text-align: left;
                    font-weight: 500;
                }
                th {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    font-weight: 700;
                    font-size: 1.1em;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                tbody tr {
                    transition: all 0.3s ease;
                    border-bottom: 1px solid rgba(102, 126, 234, 0.1);
                }
                tbody tr:hover {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
                    transform: scale(1.01);
                }
                .rank-1 { 
                    background: linear-gradient(135deg, #f6e05e, #ecc94b) !important; 
                    color: #2d3748 !important; 
                    font-weight: 700 !important;
                    box-shadow: 0 5px 15px rgba(246, 224, 94, 0.3);
                }
                .rank-2 { 
                    background: linear-gradient(135deg, #e2e8f0, #cbd5e0) !important; 
                    color: #2d3748 !important; 
                    font-weight: 700 !important;
                    box-shadow: 0 5px 15px rgba(203, 213, 224, 0.3);
                }
                .rank-3 { 
                    background: linear-gradient(135deg, #fed7cc, #fbb6a0) !important; 
                    color: #2d3748 !important; 
                    font-weight: 700 !important;
                    box-shadow: 0 5px 15px rgba(254, 215, 204, 0.3);
                }
                .percentage {
                    font-weight: 700;
                    color: #48bb78;
                    font-size: 1.1em;
                }
                .btn {
                    display: inline-block;
                    margin: 10px 8px;
                    padding: 15px 30px;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 1.1em;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }
                .btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
                }
                .btn-primary { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
                .btn-success { background: linear-gradient(135deg, #48bb78, #38a169); }
                .btn-danger { background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
                .button-container { text-align: center; margin-top: 30px; }
                @media (max-width: 768px) {
                    .container { padding: 20px; margin: 10px; }
                    h1 { font-size: 2em; }
                    table { font-size: 0.9em; }
                    th, td { padding: 10px 8px; }
                    .btn { margin: 5px; padding: 12px 20px; font-size: 1em; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Quiz Leaderboard</h1>
                <div style="text-align: center;">
                    <span class="source-badge">${sourceText}</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>🏆 Rank</th>
                            <th>📝 Index</th>
                            <th>📚 Category</th>
                            <th>📊 Score</th>
                            <th>💯 Percentage</th>
                            <th>📅 Date</th>
                            <th>⏰ Time</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    leaderboardData.forEach((entry, index) => {
        const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : '';
        const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : (index + 1);
        
        leaderboardHTML += `
            <tr class="${rankClass}">
                <td>${rankEmoji}</td>
                <td><strong>${entry.indexNumber}</strong></td>
                <td>${entry.category}</td>
                <td>${entry.correctAnswers}/${entry.totalQuestions}</td>
                <td class="percentage">${entry.percentage}%</td>
                <td>${entry.date}</td>
                <td>${entry.time}</td>
            </tr>
        `;
    });
    
    leaderboardHTML += `
                    </tbody>
                </table>
                <div class="button-container">
                    <button class="btn btn-success" onclick="window.location.reload()">🔄 Refresh</button>
                    ${source === 'local' ? '<button class="btn btn-danger" onclick="if(confirm(\'Clear local data?\')) { localStorage.removeItem(\'quizLeaderboard\'); alert(\'Cleared!\'); window.close(); }">🗑️ Clear Local Data</button>' : ''}
                    <button class="btn btn-primary" onclick="window.close()">❌ Close</button>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #666; font-size: 0.9em;">
                    <p>${source === 'global' ? '🌍 This leaderboard is synced globally via GitHub Issues' : '💾 This is your local leaderboard data'}</p>
                    <p>Total entries: ${leaderboardData.length}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Open in new window
    const leaderboardWindow = window.open('', '_blank', 'width=1200,height=700,scrollbars=yes');
    leaderboardWindow.document.write(leaderboardHTML);
    leaderboardWindow.document.close();
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
    
    // Leaderboard event listeners
    submitLeaderboardBtn.addEventListener('click', showIndexModal);
    viewLeaderboardBtn.addEventListener('click', viewLeaderboard);
    cancelSubmitBtn.addEventListener('click', hideIndexModal);
    
    submitScoreBtn.addEventListener('click', () => {
        const indexNumber = indexInput.value.trim();
        if (!indexNumber) {
            alert('Please enter your index number.');
            return;
        }
        if (indexNumber.length < 3) {
            alert('Please enter a valid index number (at least 3 characters).');
            return;
        }
        saveToLeaderboard(indexNumber);
        hideIndexModal();
    });
    
    // Allow Enter key to submit in modal
    indexInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitScoreBtn.click();
        }
    });
    
    // Close modal when clicking outside
    indexModal.addEventListener('click', (e) => {
        if (e.target === indexModal) {
            hideIndexModal();
        }
    });
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