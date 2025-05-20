document.addEventListener('DOMContentLoaded', function() {
    // Quiz Questions and Options
    const quizData = [
        {
            question: "When faced with a difficult challenge, what is your first instinct?",
            options: [
                "Analyze the problem carefully before making a move",
                "Trust your intuition and act quickly",
                "Seek advice from others who've faced similar challenges",
                "Break it down into smaller, manageable tasks"
            ]
        },
        {
            question: "Which environment makes you feel most at peace?",
            options: [
                "A quiet library filled with ancient knowledge",
                "A mountaintop with a panoramic view of the stars",
                "A cozy gathering with close friends",
                "A bustling city full of energy and possibilities"
            ]
        },
        {
            question: "How do you typically respond to change?",
            options: [
                "Embrace it as an opportunity for growth",
                "Feel anxious but adapt gradually",
                "Plan extensively to minimize disruption",
                "Go with the flow and see where it leads"
            ]
        }
    ];

    // Results mapping based on answers
    const results = {
        "Cosmic Explorer": {
            description: "You are a natural adventurer with an insatiable curiosity about the universe. Your forward-thinking mindset and adaptability allow you to navigate life's challenges with grace and enthusiasm. Like a comet streaking through the night sky, you leave a brilliant impression wherever you go.",
            traits: ["Adventurous", "Curious", "Adaptable", "Visionary"],
            constellation: drawConstellation('explorer')
        },
        "Celestial Guardian": {
            description: "You possess a protective and nurturing spirit that watches over others like the stars watch over Earth. Your steady presence provides comfort and guidance during turbulent times. Your wisdom runs deep, and your loyalty is unwavering, making you a trusted confidant and mentor.",
            traits: ["Protective", "Wise", "Dependable", "Compassionate"],
            constellation: drawConstellation('guardian')
        },
        "Cosmic Harmonizer": {
            description: "You have a natural ability to bring balance and harmony to chaotic situations. Like the perfect alignment of planets, you understand how various elements work together to create something beautiful. Your diplomatic nature and emotional intelligence help bridge divides and foster understanding.",
            traits: ["Balanced", "Diplomatic", "Intuitive", "Harmonious"],
            constellation: drawConstellation('harmonizer')
        },
        "Stellar Creator": {
            description: "You possess a brilliant creative spark that illuminates new possibilities. Like a nebula birthing stars, you transform raw potential into dazzling realities. Your innovative thinking and passionate approach to life inspire others to reach for the stars alongside you.",
            traits: ["Creative", "Passionate", "Inspiring", "Resourceful"],
            constellation: drawConstellation('creator')
        }
    };

    // Quiz state variables
    let currentQuestion = 0;
    let selectedAnswers = [];
    
    // DOM Elements
    const quizContent = document.getElementById('quiz-content');
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const nextPageArrow = document.getElementById('next-page-arrow');
    
    // Templates
    const questionTemplate = document.getElementById('question-template');
    const optionTemplate = document.getElementById('option-template');
    const resultsTemplate = document.getElementById('results-template');
    const traitTemplate = document.getElementById('trait-template');
    
    // Initialize Quiz
    function initQuiz() {
        loadQuestion(currentQuestion);
        updateProgress();
        
        // Event Listeners
        prevBtn.addEventListener('click', goToPrevQuestion);
        nextBtn.addEventListener('click', goToNextQuestion);
        nextPageArrow.addEventListener('click', goToNextQuestion);
    }
    
    // Load Question
    function loadQuestion(index) {
        // Clear previous content
        quizContent.innerHTML = '';
        
        if (index >= quizData.length) {
            showResults();
            return;
        }
        
        // Clone the question template
        const questionClone = document.importNode(questionTemplate.content, true);
        
        // Set question text
        questionClone.querySelector('.question-text').textContent = quizData[index].question;
        
        // Create options
        const optionsContainer = questionClone.querySelector('.options-container');
        
        quizData[index].options.forEach((optionText, optionIndex) => {
            const optionClone = document.importNode(optionTemplate.content, true);
            
            optionClone.querySelector('.option-text').textContent = optionText;
            
            const optionElement = optionClone.querySelector('.option');
            optionElement.dataset.index = optionIndex;
            
            // Check if this option was previously selected
            if (selectedAnswers[index] === optionIndex) {
                optionElement.classList.add('selected');
            }
            
            // Add click event listener
            optionElement.addEventListener('click', () => selectOption(optionElement, optionIndex));
            
            optionsContainer.appendChild(optionClone);
        });
        
        quizContent.appendChild(questionClone);
        updateNavButtons();
    }
    
    // Select Option
    function selectOption(optionElement, optionIndex) {
        // Remove selected class from all options
        const allOptions = document.querySelectorAll('.option');
        allOptions.forEach(option => option.classList.remove('selected'));
        
        // Add selected class to the clicked option
        optionElement.classList.add('selected');
        
        // Update selected answers
        selectedAnswers[currentQuestion] = optionIndex;
        
        // Enable next button if disabled
        nextBtn.classList.remove('disabled');
        nextPageArrow.style.visibility = 'visible';
    }
    
    // Go to Previous Question
    function goToPrevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion(currentQuestion);
            updateProgress();
        }
    }
    
    // Go to Next Question
    function goToNextQuestion() {
        if (currentQuestion < quizData.length && selectedAnswers[currentQuestion] !== undefined) {
            currentQuestion++;
            loadQuestion(currentQuestion);
            updateProgress();
        } else if (currentQuestion === quizData.length) {
            showResults();
        }
    }
    
    // Update Progress
    function updateProgress() {
        const progress = ((currentQuestion + 1) / (quizData.length + 1)) * 100;
        progressBar.style.width = `${progress}%`;
        
        if (currentQuestion < quizData.length) {
            progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
        } else {
            progressText.textContent = `Results`;
        }
    }
    
    // Update Navigation Buttons
    function updateNavButtons() {
        // Previous button visibility
        if (currentQuestion === 0) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }
        
        // Next button text and visibility
        if (currentQuestion === quizData.length - 1) {
            nextBtn.innerHTML = 'See Results <i class="fas fa-star"></i>';
            nextPageArrow.style.visibility = selectedAnswers[currentQuestion] !== undefined ? 'visible' : 'hidden';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextPageArrow.style.visibility = selectedAnswers[currentQuestion] !== undefined ? 'visible' : 'hidden';
        }
    }
    
    // Calculate Result
    function calculateResult() {
        // Simple algorithm to determine result based on selected answers
        let explorerPoints = 0;
        let guardianPoints = 0;
        let harmonizerPoints = 0;
        let creatorPoints = 0;
        
        selectedAnswers.forEach((answer, questionIndex) => {
            switch (questionIndex) {
                case 0: // First question
                    if (answer === 0) guardianPoints++;
                    if (answer === 1) explorerPoints++;
                    if (answer === 2) harmonizerPoints++;
                    if (answer === 3) creatorPoints++;
                    break;
                case 1: // Second question
                    if (answer === 0) guardianPoints++;
                    if (answer === 1) explorerPoints++;
                    if (answer === 2) harmonizerPoints++;
                    if (answer === 3) creatorPoints++;
                    break;
                case 2: // Third question
                    if (answer === 0) explorerPoints++;
                    if (answer === 1) harmonizerPoints++;
                    if (answer === 2) guardianPoints++;
                    if (answer === 3) creatorPoints++;
                    break;
            }
        });
        
        const scores = {
            "Cosmic Explorer": explorerPoints,
            "Celestial Guardian": guardianPoints,
            "Cosmic Harmonizer": harmonizerPoints,
            "Stellar Creator": creatorPoints
        };
        
        // Find the highest score
        let highestScore = 0;
        let result = "";
        
        Object.entries(scores).forEach(([key, value]) => {
            if (value > highestScore) {
                highestScore = value;
                result = key;
            }
        });
        
        return result;
    }
    
    // Show Results
    function showResults() {
        // Clear quiz content
        quizContent.innerHTML = '';
        
        // Calculate result
        const result = calculateResult();
        const resultData = results[result];
        
        // Clone results template
        const resultsClone = document.importNode(resultsTemplate.content, true);
        
        // Set result data
        resultsClone.querySelector('.personality-type').textContent = result;
        resultsClone.querySelector('.personality-description').textContent = resultData.description;
        
        // Add constellation
        const constellationContainer = resultsClone.querySelector('#constellation-svg');
        constellationContainer.innerHTML = resultData.constellation;
        
        // Add traits
        const traitsContainer = resultsClone.querySelector('.traits-container');
        resultData.traits.forEach(trait => {
            const traitClone = document.importNode(traitTemplate.content, true);
            traitClone.querySelector('.trait-badge').textContent = trait;
            traitsContainer.appendChild(traitClone);
        });
        
        // Add restart button event listener
        resultsClone.querySelector('.restart-btn').addEventListener('click', restartQuiz);
        
        // Add social share buttons event listeners
        const shareButtons = resultsClone.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', shareResult);
        });
        
        // Append results to quiz content
        quizContent.appendChild(resultsClone);
        
        // Update progress
        progressBar.style.width = '100%';
        progressText.textContent = 'Results';
        
        // Hide navigation buttons
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        nextPageArrow.style.visibility = 'hidden';
    }
    
    // Restart Quiz
    function restartQuiz() {
        currentQuestion = 0;
        selectedAnswers = [];
        loadQuestion(currentQuestion);
        updateProgress();
    }
    
    // Share Result (placeholder function)
    function shareResult(event) {
        const platform = event.currentTarget.classList.contains('facebook') ? 'Facebook' :
                        event.currentTarget.classList.contains('twitter') ? 'Twitter' :
                        'Instagram';
        
        // This would normally use the Web Share API or platform-specific share mechanisms
        alert(`Sharing your Cosmic Personality to ${platform}! (This is a demo - sharing functionality would be implemented in a production environment)`);
    }
    
    // Draw Constellation SVG (based on personality type)
    function drawConstellation(type) {
        let svg = '';
        
        switch(type) {
            case 'explorer':
                svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="100" cy="30" r="4" fill="#F8E16C" class="star-point" />
                    <circle cx="150" cy="70" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="120" cy="120" r="4.5" fill="#F8E16C" class="star-point" />
                    <circle cx="70" cy="140" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="40" cy="100" r="3" fill="#F8E16C" class="star-point" />
                    <path d="M50,50 L100,30 L150,70 L120,120 L70,140 L40,100 Z" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M50,50 L150,70" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,30 L70,140" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M40,100 L120,120" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <style>
                        .star-point {
                            filter: drop-shadow(0 0 3px #F8E16C);
                            animation: twinkle 3s infinite alternate;
                        }
                        @keyframes twinkle {
                            0% { opacity: 0.3; }
                            100% { opacity: 1; }
                        }
                    </style>
                </svg>`;
                break;
            case 'guardian':
                svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="40" r="4" fill="#F8E16C" class="star-point" />
                    <circle cx="40" cy="80" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="160" cy="80" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="60" cy="140" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="140" cy="140" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="100" cy="100" r="5" fill="#F8E16C" class="star-point" />
                    <path d="M100,40 L40,80 L60,140 L140,140 L160,80 Z" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,40 L100,100 L40,80" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,100 L160,80" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,100 L60,140" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,100 L140,140" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <style>
                        .star-point {
                            filter: drop-shadow(0 0 3px #F8E16C);
                            animation: twinkle 4s infinite alternate;
                        }
                        @keyframes twinkle {
                            0% { opacity: 0.4; }
                            100% { opacity: 1; }
                        }
                    </style>
                </svg>`;
                break;
            case 'harmonizer':
                svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="30" r="4" fill="#F8E16C" class="star-point" />
                    <circle cx="170" cy="100" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="100" cy="170" r="4" fill="#F8E16C" class="star-point" />
                    <circle cx="30" cy="100" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="65" cy="65" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="135" cy="65" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="135" cy="135" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="65" cy="135" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="100" cy="100" r="5" fill="#F8E16C" class="star-point" />
                    <path d="M100,30 L170,100 L100,170 L30,100 Z" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M65,65 L135,135" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M135,65 L65,135" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,30 L100,170" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M30,100 L170,100" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <style>
                        .star-point {
                            filter: drop-shadow(0 0 3px #F8E16C);
                            animation: twinkle 5s infinite alternate;
                        }
                        @keyframes twinkle {
                            0% { opacity: 0.3; }
                            50% { opacity: 0.7; }
                            100% { opacity: 1; }
                        }
                    </style>
                </svg>`;
                break;
            case 'creator':
                svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="30" r="4" fill="#F8E16C" class="star-point" />
                    <circle cx="147" cy="50" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="160" cy="100" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="147" cy="150" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="100" cy="170" r="4" fill="#F8E16C" class="star-point" />
                    <circle cx="53" cy="150" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="40" cy="100" r="3.5" fill="#F8E16C" class="star-point" />
                    <circle cx="53" cy="50" r="3" fill="#F8E16C" class="star-point" />
                    <circle cx="80" cy="80" r="2" fill="#F8E16C" class="star-point" />
                    <circle cx="120" cy="80" r="2" fill="#F8E16C" class="star-point" />
                    <circle cx="120" cy="120" r="2" fill="#F8E16C" class="star-point" />
                    <circle cx="80" cy="120" r="2" fill="#F8E16C" class="star-point" />
                    <circle cx="100" cy="100" r="5" fill="#F8E16C" class="star-point" />
                    <path d="M100,30 L147,50 L160,100 L147,150 L100,170 L53,150 L40,100 L53,50 Z" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M80,80 L120,80 L120,120 L80,120 Z" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M100,30 L100,170" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <path d="M40,100 L160,100" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <style>
                        .star-point {
                            filter: drop-shadow(0 0 3px #F8E16C);
                            animation: twinkle 4s infinite alternate-reverse;
                        }
                        @keyframes twinkle {
                            0% { opacity: 0.2; }
                            30% { opacity: 0.5; }
                            60% { opacity: 0.8; }
                            100% { opacity: 1; }
                        }
                    </style>
                </svg>`;
                break;
            default:
                svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="50" fill="none" stroke="#bf80ff" stroke-width="1" />
                    <circle cx="100" cy="100" r="5" fill="#F8E16C" class="star-point" />
                </svg>`;
        }
        
        return svg;
    }
    
    // Start the quiz
    initQuiz();


// ===== NEXT PAGE ARROW =====
  const createNextPageArrow = () => {
    const nextPageArrow = document.createElement('div');
    nextPageArrow.className = 'next-page-arrow';
    nextPageArrow.innerHTML = `
      <a href="Services.html" title="Go to Servicespage">
        <span style="margin-right: 10px;">Services</span>
        <span style="font-size: 1.8rem;">⟶</span>
      </a>
    `;
    nextPageArrow.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: rgba(20, 10, 40, 0.7);
      padding: 15px 20px;
      border-radius: 50px;
      box-shadow: 0 0 15px #a280ff77, inset 0 0 20px #bf80ff55;
      cursor: pointer;
      z-index: 100;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const arrowLink = nextPageArrow.querySelector('a');
    arrowLink.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #cda9ff;
      font-weight: 600;
      font-size: 1.1rem;
    `;

    const arrowIcon = nextPageArrow.querySelector('span:last-child');
    arrowIcon.style.cssText = `
      font-size: 1.8rem;
      color: #bf80ff;
      text-shadow: 0 0 10px #bf80ff;
      transition: transform 0.3s ease;
    `;

    nextPageArrow.addEventListener('mouseover', () => {
      nextPageArrow.style.boxShadow = '0 0 25px #bf80ffaa, inset 0 0 30px #bf80ff77';
      arrowIcon.style.transform = 'translateX(5px)';
    });

    nextPageArrow.addEventListener('mouseout', () => {
      nextPageArrow.style.boxShadow = '0 0 15px #a280ff77, inset 0 0 20px #bf80ff55';
      arrowIcon.style.transform = 'translateX(0)';
    });

    document.body.appendChild(nextPageArrow);
  };

  createNextPageArrow();
});