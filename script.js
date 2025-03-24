const heartsContainer = document.querySelector('.hearts-container');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const cakeQuarters = document.querySelectorAll('.cake-quarter');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const birthdayMessage = document.getElementById('birthday-message');

const questions = [
    { 
        type: "image-choice",
        question: "Who is Prinsu's favourite child?",
        options: [
            { name: "madigo", img: "picrew/madigo.png", correct: false, info: "Madigo loves to nap all day!" },
            { name: "star", img: "picrew/star.png", correct: false, info: "Star is a little mischievous but very cuddly." },
            { name: "puffy", img: "picrew/puffy.png", correct: true, info: "Puffy is the favorite! Loves being spoiled." }
        ]
    },
    { 
        type: "text-input",
        question: "Name one of Prinsu's cats",
        answers: ["walter", "arthur", "sophie", "luna", "shiro", "chopper"]
    },
    { 
        type: "text-choice",
        question: "How much does Prinsu love Heaven Official's Blessing?",
        options: ["ALOT", "YES"]
    },
    { 
        type: "scramble",
        question: "Unscramble: ANDREW",
        answer: "ANDREW"
    }
];

let currentQuestionIndex = 0;
let completedQuarters = 0;

function shuffleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

const childStatsBox = document.getElementById("child-stats-box");
const statsName = document.getElementById("stats-name");
const statsFood = document.getElementById("stats-food");
const statsPokemon = document.getElementById("stats-pokemon");
const statsStrength = document.getElementById("stats-strength");
const statsCuteness = document.getElementById("stats-cuteness");

// Dummy stats for each child
const childStats = {
    "madigo": { name: "Madigo", pokemon: "Jigglypuff" , food: "Yangchow", strength: "Adorable", weakness: "College Professors" },
    "star": { name: "Star", pokemon: "Greninja" , food: "Pizza", strength: "Main Character", weakness: "Lack of Sleep" },
    "puffy": { name: "Puffy", pokemon: "Squirtle" , food: "Chicken", strength: "I try..", weakness: "Obesity" }
};

// Function to show stats box
function showChildStats(event, childName) {
    if (childStats[childName]) {
        const stats = childStats[childName];
        statsName.textContent = stats.name;
        statsFood.textContent = stats.food;
        statsPokemon.textContent = stats.pokemon;
        statsStrength.textContent = stats.strength;
        statsCuteness.textContent = stats.weakness;
        
        childStatsBox.style.display = "block";
        childStatsBox.style.left = `${event.pageX + 20}px`;
        childStatsBox.style.top = `${event.pageY}px`;
    }
}

// Function to hide stats box
function hideChildStats() {
    childStatsBox.style.display = "none";
}

// Modify displayQuestion to add hover event listeners
function displayQuestion() {
    optionsContainer.innerHTML = "";
    answerInput.style.display = "none";
    submitButton.style.display = "none";
    feedback.textContent = "";

    childStatsBox.style.display = "none"; // Hide stats when moving to next question

    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    if (currentQuestion.type === "image-choice") {
        currentQuestion.options.forEach(option => {
            const container = document.createElement('div');
            container.style.textAlign = "center";

            const img = document.createElement('img');
            img.src = option.img;
            img.classList.add('option-img');

            // Show stats on hover
            img.addEventListener('mouseenter', (event) => showChildStats(event, option.name));
            img.addEventListener('mouseleave', hideChildStats);

            img.addEventListener('click', () => checkAnswer(option.correct));

            const name = document.createElement('p');
            name.textContent = option.name;
            name.style.margin = "5px 0 0";
            name.style.fontWeight = "bold";

            container.appendChild(img);
            container.appendChild(name);
            optionsContainer.appendChild(container);
        });
    } else if (currentQuestion.type === "text-input") {
        answerInput.style.display = "block";
        submitButton.style.display = "block";

        // Ensure the correct styles are applied
        answerInput.classList.add("styled-input");
        submitButton.classList.add("styled-button");
    } else if (currentQuestion.type === "text-choice") {
        currentQuestion.options.forEach(option => {
            const btn = document.createElement('button');
            btn.textContent = option;
            btn.classList.add('text-choice-button');  // Add new styling
            btn.addEventListener('click', () => checkAnswer(option === "ALOT" || option === "YES"));
            optionsContainer.appendChild(btn);
        });
    } else if (currentQuestion.type === "scramble") {
        const scrambledWord = shuffleWord(currentQuestion.answer);
        questionText.textContent = `Unscramble: ${scrambledWord}`;

        answerInput.style.display = "block";
        submitButton.style.display = "block";

        // Ensure the correct styles are applied
        answerInput.classList.add("styled-input");
        submitButton.classList.add("styled-button");
    }
}



function showErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 1500);
}

function checkAnswer(userInput) {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === "scramble") {
        const answer = answerInput.value.trim().toLowerCase();
        if (answer === currentQuestion.answer.toLowerCase()) {
            proceedToNext();
        } else {
            showErrorMessage();
        }
    } else if (currentQuestion.type === "text-input") {
        if (currentQuestion.answers.includes(answerInput.value.trim().toLowerCase())) {
            proceedToNext();
        } else {
            showErrorMessage();
        }
    } else if (typeof userInput === "boolean") {
        if (userInput) {
            proceedToNext();
        } else {
            showErrorMessage();
        }
    }
}


function proceedToNext() {
    answerInput.value = ""; // Clears input after submission
    cakeQuarters[completedQuarters].style.opacity = 1;
    completedQuarters++;
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        setTimeout(() => {
            birthdayMessage.style.width = "100vw";
            birthdayMessage.style.height = "100vh";
            birthdayMessage.style.zIndex = 1000;
            birthdayMessage.style.opacity = "1";
            answerInput.disabled = true; // Disable input box
            submitButton.disabled = true; // Disable submit button
        }, 500);
    }
}



submitButton.addEventListener('click', () => checkAnswer());

displayQuestion();


// Function to check if two icons overlap
// Function to check if two elements overlap
function checkCollision(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Function to check if the new icon collides with any existing ones
function isColliding(newIcon) {
    return icons.some(icon => checkCollision(newIcon, icon));
}

// Array to store all placed icons for collision detection
const icons = [];

// Function to create a heart
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    let xPos, yPos;
    let attempts = 0;

    do {
        xPos = Math.random() * (window.innerWidth - 50); // Adjust for heart size
        yPos = Math.random() * (window.innerHeight - 50);
        heart.style.left = `${xPos}px`;
        heart.style.top = `${yPos}px`;
        attempts++;
    } while (isColliding(heart) && attempts < 100);

    if (attempts < 100) {
        heartsContainer.appendChild(heart);
        icons.push(heart);
    }
}

// Function to create a gift box
function createGiftBox() {
    const giftBox = document.createElement('div');
    giftBox.classList.add('gift-box');

    let xPos, yPos;
    let attempts = 0;

    do {
        xPos = Math.random() * (window.innerWidth - 50);
        yPos = Math.random() * (window.innerHeight - 50);
        giftBox.style.left = `${xPos}px`;
        giftBox.style.top = `${yPos}px`;
        attempts++;
    } while (isColliding(giftBox) && attempts < 100);

    if (attempts < 100) {
        heartsContainer.appendChild(giftBox);
        icons.push(giftBox);
    }
}

// Function to handle screen resizing
function adjustIconPositions() {
    icons.forEach(icon => {
        let newX = Math.random() * (window.innerWidth - 50);
        let newY = Math.random() * (window.innerHeight - 50);
        icon.style.left = `${newX}px`;
        icon.style.top = `${newY}px`;
    });
}

// Create a bunch of hearts and gift boxes
for (let i = 0; i < 25; i++) {
    createHeart();
    createGiftBox();
}

// Adjust positions whenever the window resizes
window.addEventListener('resize', adjustIconPositions);

// Function to move icons left and right
function animateIcons() {
    icons.forEach(icon => {
        let speed = Math.random() * 2 + 1; // Random speed between 1 and 3
        let direction = Math.random() > 0.5 ? 1 : -1; // Random initial direction

        setInterval(() => {
            let currentX = parseFloat(icon.style.left);
            let newX = currentX + direction * speed;

            // If it moves out of bounds, change direction
            if (newX <= 0 || newX >= window.innerWidth - 50) {
                direction *= -1;
            }

            icon.style.left = `${newX}px`;
        }, 30); // Updates position every 30ms
    });
}

// Call the function after creating the hearts and gifts
setTimeout(animateIcons, 500);

// Function to disperse an icon on click
function snapDisappear(element) {
    const numPieces = 10; // Number of fragments
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        piece.classList.add('vanish');
        piece.style.backgroundImage = window.getComputedStyle(element).backgroundImage;
        
        // Random offsets for dispersion effect
        const xOffset = (Math.random() - 0.5) * 100 + "px";
        const yOffset = (Math.random() - 0.5) * 100 + "px";
        
        piece.style.setProperty('--x-offset', xOffset);
        piece.style.setProperty('--y-offset', yOffset);
        
        piece.style.left = `${rect.left + rect.width / 2}px`;
        piece.style.top = `${rect.top + rect.height / 2}px`;

        document.body.appendChild(piece);
        
        // Remove after animation ends
        setTimeout(() => piece.remove(), 1000);
    }

    element.remove(); // Remove the original element
}

// Apply effect on click for hearts and gift boxes
document.querySelectorAll('.heart, .gift-box').forEach(icon => {
    icon.addEventListener('click', () => snapDisappear(icon));
});


// Listen for Enter key inside the answer input
answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer(); // Call the same function as the submit button
    }
});


