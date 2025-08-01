// js/cse_quiz_set.js

// Sample questions for CSE Course Material
window.quizSets = window.quizSets || {};

window.quizSets.cse = {
    title: "CSE Course Material",
    questions: [
        {
            question: "Q1. What does UNIX stand for?",
            options: ["Uniplexed Information and Computing Service", "Universal Interactive eXecutive", "Unics", "None of the above"],
            correct: "A"
        },
        {
            question: "Q2. Which command is used to list files in UNIX?",
            options: ["list", "ls", "dir", "show"],
            correct: "B"
        },
        {
            question: "Q3. In Perl, which symbol is used to declare a scalar variable?",
            options: ["@", "%", "$", "&"],
            correct: "C"
        },
        {
            question: "Q4. What does CGI stand for?",
            options: ["Computer Generated Images", "Common Gateway Interface", "Central Graphics Interface", "Custom Gateway Integration"],
            correct: "B"
        },
        {
            question: "Q5. Which UNIX command is used to change file permissions?",
            options: ["chmod", "chown", "chgrp", "change"],
            correct: "A"
        },
        {
            question: "Q6. In Perl, how do you declare an array?",
            options: ["$array", "@array", "%array", "array[]"],
            correct: "B"
        },
        {
            question: "Q7. What is the default port for HTTP?",
            options: ["21", "23", "80", "443"],
            correct: "C"
        },
        {
            question: "Q8. Which symbol represents the home directory in UNIX?",
            options: ["/", "~", "*", "."],
            correct: "B"
        },
        {
            question: "Q9. In CGI programming, which environment variable contains the request method?",
            options: ["REQUEST_METHOD", "HTTP_METHOD", "CGI_METHOD", "SERVER_METHOD"],
            correct: "A"
        },
        {
            question: "Q10. What does the 'grep' command do in UNIX?",
            options: ["Creates files", "Searches for patterns in text", "Changes permissions", "Lists directories"],
            correct: "B"
        }
    ]
};