// Wait for the DOM to fully load before executing any code
// This ensures all HTML elements are available for JavaScript manipulation
document.addEventListener('DOMContentLoaded', () => {
  // =====================================================================
  // DATA INITIALIZATION
  // =====================================================================
  
  // Define all zodiac signs with their properties
  // This includes name, element type, date ranges, and unicode symbols
  const zodiacSigns = [
    { name: 'Aries', element: 'fire', dates: 'Mar 21 - Apr 19', symbol: '♈️' },
    { name: 'Taurus', element: 'earth', dates: 'Apr 20 - May 20', symbol: '♉️' },
    { name: 'Gemini', element: 'air', dates: 'May 21 - Jun 20', symbol: '♊️' },
    { name: 'Cancer', element: 'water', dates: 'Jun 21 - Jul 22', symbol: '♋️' },
    { name: 'Leo', element: 'fire', dates: 'Jul 23 - Aug 22', symbol: '♌️' },
    { name: 'Virgo', element: 'earth', dates: 'Aug 23 - Sep 22', symbol: '♍️' },
    { name: 'Libra', element: 'air', dates: 'Sep 23 - Oct 22', symbol: '♎️' },
    { name: 'Scorpio', element: 'water', dates: 'Oct 23 - Nov 21', symbol: '♏️' },
    { name: 'Sagittarius', element: 'fire', dates: 'Nov 22 - Dec 21', symbol: '♐️' },
    { name: 'Capricorn', element: 'earth', dates: 'Dec 22 - Jan 19', symbol: '♑️' },
    { name: 'Aquarius', element: 'air', dates: 'Jan 20 - Feb 18', symbol: '♒️' },
    { name: 'Pisces', element: 'water', dates: 'Feb 19 - Mar 20', symbol: '♓️' }
  ];

  // Variables to track which zodiac signs the user has selected
  // These will be updated as the user interacts with the wheel
  let selectedSignOne = null;
  let selectedSignTwo = null;

  // Compatibility data between all zodiac sign combinations
  // Each combination is rated as high, medium, or low compatibility
  // This comprehensive matrix covers all possible sign pairings
  const compatibilityData = {
    // Fire signs compatibility (Aries, Leo, Sagittarius)
    'Aries': {
      'Aries': 'medium', 'Leo': 'high', 'Sagittarius': 'high',
      'Taurus': 'low', 'Virgo': 'medium', 'Capricorn': 'medium',
      'Gemini': 'high', 'Libra': 'medium', 'Aquarius': 'high',
      'Cancer': 'low', 'Scorpio': 'medium', 'Pisces': 'medium'
    },
    'Leo': {
      'Aries': 'high', 'Leo': 'medium', 'Sagittarius': 'high',
      'Taurus': 'medium', 'Virgo': 'low', 'Capricorn': 'low',
      'Gemini': 'high', 'Libra': 'high', 'Aquarius': 'medium',
      'Cancer': 'medium', 'Scorpio': 'low', 'Pisces': 'medium'
    },
    'Sagittarius': {
      'Aries': 'high', 'Leo': 'high', 'Sagittarius': 'medium',
      'Taurus': 'low', 'Virgo': 'medium', 'Capricorn': 'medium',
      'Gemini': 'high', 'Libra': 'high', 'Aquarius': 'high',
      'Cancer': 'low', 'Scorpio': 'medium', 'Pisces': 'medium'
    },
    
    // Earth signs compatibility (Taurus, Virgo, Capricorn)
    'Taurus': {
      'Aries': 'low', 'Leo': 'medium', 'Sagittarius': 'low',
      'Taurus': 'medium', 'Virgo': 'high', 'Capricorn': 'high',
      'Gemini': 'low', 'Libra': 'medium', 'Aquarius': 'low',
      'Cancer': 'high', 'Scorpio': 'high', 'Pisces': 'high'
    },
    'Virgo': {
      'Aries': 'medium', 'Leo': 'low', 'Sagittarius': 'medium',
      'Taurus': 'high', 'Virgo': 'medium', 'Capricorn': 'high',
      'Gemini': 'medium', 'Libra': 'medium', 'Aquarius': 'medium',
      'Cancer': 'high', 'Scorpio': 'high', 'Pisces': 'medium'
    },
    'Capricorn': {
      'Aries': 'medium', 'Leo': 'low', 'Sagittarius': 'medium',
      'Taurus': 'high', 'Virgo': 'high', 'Capricorn': 'medium',
      'Gemini': 'low', 'Libra': 'medium', 'Aquarius': 'medium',
      'Cancer': 'high', 'Scorpio': 'high', 'Pisces': 'high'
    },
    
    // Air signs compatibility (Gemini, Libra, Aquarius)
    'Gemini': {
      'Aries': 'high', 'Leo': 'high', 'Sagittarius': 'high',
      'Taurus': 'low', 'Virgo': 'medium', 'Capricorn': 'low',
      'Gemini': 'medium', 'Libra': 'high', 'Aquarius': 'high',
      'Cancer': 'low', 'Scorpio': 'low', 'Pisces': 'medium'
    },
    'Libra': {
      'Aries': 'medium', 'Leo': 'high', 'Sagittarius': 'high',
      'Taurus': 'medium', 'Virgo': 'medium', 'Capricorn': 'medium',
      'Gemini': 'high', 'Libra': 'medium', 'Aquarius': 'high',
      'Cancer': 'medium', 'Scorpio': 'medium', 'Pisces': 'medium'
    },
    'Aquarius': {
      'Aries': 'high', 'Leo': 'medium', 'Sagittarius': 'high',
      'Taurus': 'low', 'Virgo': 'medium', 'Capricorn': 'medium',
      'Gemini': 'high', 'Libra': 'high', 'Aquarius': 'medium',
      'Cancer': 'low', 'Scorpio': 'medium', 'Pisces': 'medium'
    },
    
    // Water signs compatibility (Cancer, Scorpio, Pisces)
    'Cancer': {
      'Aries': 'low', 'Leo': 'medium', 'Sagittarius': 'low',
      'Taurus': 'high', 'Virgo': 'high', 'Capricorn': 'high',
      'Gemini': 'low', 'Libra': 'medium', 'Aquarius': 'low',
      'Cancer': 'medium', 'Scorpio': 'high', 'Pisces': 'high'
    },
    'Scorpio': {
      'Aries': 'medium', 'Leo': 'low', 'Sagittarius': 'medium',
      'Taurus': 'high', 'Virgo': 'high', 'Capricorn': 'high',
      'Gemini': 'low', 'Libra': 'medium', 'Aquarius': 'medium',
      'Cancer': 'high', 'Scorpio': 'medium', 'Pisces': 'high'
    },
    'Pisces': {
      'Aries': 'medium', 'Leo': 'medium', 'Sagittarius': 'medium',
      'Taurus': 'high', 'Virgo': 'medium', 'Capricorn': 'high',
      'Gemini': 'medium', 'Libra': 'medium', 'Aquarius': 'medium',
      'Cancer': 'high', 'Scorpio': 'high', 'Pisces': 'high'
    }
  };

  // Relationship dynamics content - detailed descriptions for different relationship aspects
  // Organized by categories (communication, emotions, romance, trust, growth)
  // Contains specific content for certain sign pairs and default fallback content
  const dynamicsContent = {
    // Communication patterns between different zodiac signs
    communication: {
      'Aries-Taurus': "Aries and Taurus may struggle with communication styles. Aries is direct and impulsive, while Taurus is methodical and patient. Finding a middle ground requires mutual respect for different approaches.",
      'Aries-Gemini': "Aries and Gemini enjoy vibrant, fast-paced conversations. Both signs are quick-thinking, though Gemini prefers exploring multiple perspectives while Aries focuses on action-oriented discussion.",
      'Aries-Aries': "Two Aries create passionate, direct communication patterns. They understand each other's straightforward approach, though conversations can become heated competitions if both aren't careful to listen.",
      'default': "Communication between these signs requires understanding each other's natural tendencies. With awareness and respect, any communication challenges can be overcome."
    },
    
    // Emotional connection between different zodiac signs
    emotions: {
      'Cancer-Pisces': "Cancer and Pisces share deep emotional understanding. Both water signs are intuitive and empathetic, creating a connection where feelings are validated and nurtured.",
      'Scorpio-Taurus': "Scorpio and Taurus form an intense emotional bond. Both are deeply loyal and value emotional security, though Scorpio dives into emotional depths while Taurus prefers emotional stability.",
      'Leo-Aquarius': "Leo and Aquarius connect through a blend of warmth and intellectual understanding. Leo brings heartfelt expression while Aquarius offers emotional objectivity.",
      'default': "Emotional connection between these signs depends on honoring each other's unique emotional needs and expression styles."
    },
    
    // Romantic aspects between different zodiac signs
    romance: {
      'Leo-Libra': "Leo and Libra create a romantic fairytale. Both value beauty and pleasure, with Leo bringing passionate courtship and Libra offering thoughtful romantic gestures.",
      'Scorpio-Cancer': "Scorpio and Cancer share an intensely passionate and deeply loyal romantic bond. Their connection feels fated, with both valuing emotional intimacy.",
      'Taurus-Pisces': "Taurus and Pisces enjoy a sensual, dreamy romance. Taurus provides stability and physical affection while Pisces brings magic and spiritual connection.",
      'default': "Romance between these signs blossoms when each partner honors what makes the other feel cherished and desired."
    },
    
    // Trust dynamics between different zodiac signs
    trust: {
      'Capricorn-Taurus': "Capricorn and Taurus build unshakeable trust. Both earth signs value reliability and consistency, creating a secure foundation based on mutual dependability.",
      'Scorpio-Cancer': "Scorpio and Cancer develop profound trust through emotional vulnerability. Though the journey may include challenges, the bond formed is intensely loyal.",
      'Libra-Gemini': "Libra and Gemini establish trust through open communication. Their air sign connection values honesty and intellectual integrity.",
      'default': "Trust between these signs develops through consistently honoring commitments and respecting boundaries."
    },
    
    // Growth and evolution between different zodiac signs
    growth: {
      'Sagittarius-Aries': "Sagittarius and Aries inspire tremendous growth in each other. Both fire signs encourage adventure and expansion, pushing each other toward new horizons.",
      'Pisces-Scorpio': "Pisces and Scorpio facilitate profound spiritual and emotional growth. Their water sign connection allows for transformation through emotional understanding.",
      'Aquarius-Gemini': "Aquarius and Gemini stimulate intellectual growth. They constantly share ideas and perspectives, expanding each other's mental horizons.",
      'default': "Growth potential between these signs comes from embracing the lessons each brings to the relationship."
    }
  };

  // =====================================================================
  // COMPATIBILITY WHEEL FUNCTIONS
  // =====================================================================

  // Creates the visual zodiac wheel with all 12 signs positioned in a circle
  function generateCompatibilityWheel() {
    const wheel = document.getElementById('compatibilityWheel');
    if (!wheel) return; // Safety check if element doesn't exist
    
    wheel.innerHTML = ''; // Clear any previous content
    
    // Create the main wheel container
    const wheelContainer = document.createElement('div');
    wheelContainer.className = 'zodiac-wheel';
    
    // Add each zodiac sign to the wheel, positioned in a circle
    zodiacSigns.forEach((sign, index) => {
      // Create the individual sign element
      const signElement = document.createElement('div');
      signElement.className = `zodiac-sign ${sign.element}`;
      signElement.setAttribute('data-sign', sign.name);
      
      // Calculate the position around the circle using trigonometry
      // 30 degrees between each sign (12 signs * 30° = 360°)
      const angle = (index * 30) * (Math.PI / 180); // Convert to radians
      const radius = 180; // Wheel radius in pixels
      // Adjust starting position by -90° (Math.PI/2) to start from the top
      const left = 200 + radius * Math.cos(angle - Math.PI/2);
      const top = 200 + radius * Math.sin(angle - Math.PI/2);
      
      // Set the position using CSS
      signElement.style.left = `${left}px`;
      signElement.style.top = `${top}px`;
      
      // Create the content inside each sign node
      signElement.innerHTML = `
        <div class="sign-content">
          <div class="sign-symbol">${sign.symbol}</div>
          <div class="sign-name">${sign.name}</div>
          <div class="sign-dates">${sign.dates}</div>
        </div>
      `;
      
      // Add click handler for selecting signs
      signElement.addEventListener('click', () => {
        // Logic for first selection or replacing first selection
        if (!selectedSignOne || signElement.classList.contains('selected-first')) {
          // Remove previous first selection highlight
          document.querySelectorAll('.selected-first').forEach(el => el.classList.remove('selected-first'));
          // Set new selection
          signElement.classList.add('selected-first');
          selectedSignOne = sign.name;
        } 
        // Logic for second selection or replacing second selection
        else if (!selectedSignTwo || signElement.classList.contains('selected-second')) {
          // Remove previous second selection highlight
          document.querySelectorAll('.selected-second').forEach(el => el.classList.remove('selected-second'));
          // Set new selection
          signElement.classList.add('selected-second');
          selectedSignTwo = sign.name;
        } 
        // Logic for when both selections exist - replace first and shift second to first
        else {
          // Remove previous first selection
          document.querySelectorAll('.selected-first').forEach(el => el.classList.remove('selected-first'));
          // Move second selection to first position
          document.querySelectorAll('.selected-second').forEach(el => {
            el.classList.remove('selected-second');
            el.classList.add('selected-first');
          });
          // Set new second selection
          signElement.classList.add('selected-second');
          selectedSignOne = selectedSignTwo;
          selectedSignTwo = sign.name;
        }
        
        // Update the compatibility lines and content whenever selections change
        updateCompatibilityLines();
        
        // Only update dynamics content if both signs are selected
        if (selectedSignOne && selectedSignTwo) {
          // Get the currently active category and update content accordingly
          updateDynamicsContent(document.querySelector('.category-btn.active').dataset.category);
        }
      });
      
      // Add the sign to the wheel
      wheelContainer.appendChild(signElement);
    });
    
    // Create a container for compatibility lines that will be drawn between signs
    const linesContainer = document.createElement('div');
    linesContainer.className = 'compatibility-lines';
    linesContainer.id = 'compatibilityLines';
    
    // Add the lines container to the wheel
    wheelContainer.appendChild(linesContainer);
    wheel.appendChild(wheelContainer);
    
    // Add CSS styles for the zodiac wheel and its elements
    const style = document.createElement('style');
    style.textContent = `
      .zodiac-wheel {
        position: relative;
        width: 400px;
        height: 400px;
        margin: 0 auto;
      }
      
      .zodiac-sign {
        position: absolute;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        background: rgba(25, 15, 40, 0.8);
        border: 2px solid #a280ff;
        box-shadow: 0 0 10px #a280ff77;
      }
      
      .zodiac-sign:hover {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 0 15px #bf80ff;
      }
      
      .zodiac-sign.fire {
        background: rgba(40, 10, 10, 0.8);
        border-color: #ff8080;
      }
      
      .zodiac-sign.earth {
        background: rgba(10, 30, 10, 0.8);
        border-color: #80ff80;
      }
      
      .zodiac-sign.air {
        background: rgba(10, 10, 40, 0.8);
        border-color: #8080ff;
      }
      
      .zodiac-sign.water {
        background: rgba(10, 20, 30, 0.8);
        border-color: #80c0ff;
      }
      
      .sign-content {
        text-align: center;
        line-height: 1.2;
      }
      
      .sign-symbol {
        font-size: 1.6rem;
      }
      
      .sign-name {
        font-size: 0.8rem;
        font-weight: bold;
      }
      
      .sign-dates {
        font-size: 0.6rem;
        opacity: 0.8;
      }
      
      .compatibility-lines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .compatibility-line {
        position: absolute;
        height: 3px;
        transform-origin: 0 0;
        z-index: -1;
      }
      
      .compatibility-line.high {
        background: linear-gradient(to right, #80ff80, #80ff80cc);
        box-shadow: 0 0 8px #80ff80;
      }
      
      .compatibility-line.medium {
        background: linear-gradient(to right, #ffff80, #ffff80cc);
        box-shadow: 0 0 8px #ffff80;
      }
      
      .compatibility-line.low {
        background: linear-gradient(to right, #ff8080, #ff8080cc);
        box-shadow: 0 0 8px #ff8080;
      }
      
      .zodiac-sign.selected-first {
        transform: translate(-50%, -50%) scale(1.15);
        box-shadow: 0 0 20px #ff80ff;
        border: 3px solid #ff80ff;
        z-index: 5;
      }
      
      .zodiac-sign.selected-second {
        transform: translate(-50%, -50%) scale(1.15);
        box-shadow: 0 0 20px #80ffff;
        border: 3px solid #80ffff;
        z-index: 5;
      }
    `;
    document.head.appendChild(style);
  }

  // Draws compatibility lines between the selected sign and all other signs
  // Line colors indicate compatibility level (high, medium, low)
  function updateCompatibilityLines() {
    const linesContainer = document.getElementById('compatibilityLines');
    if (!linesContainer) return; // Safety check
    
    // Clear any previously drawn lines
    linesContainer.innerHTML = '';
    
    // Only draw lines if at least one sign is selected
    if (selectedSignOne) {
      // Get the DOM element of the first selected sign
      const firstSignElement = document.querySelector(`.zodiac-sign[data-sign="${selectedSignOne}"]`);
      if (firstSignElement) {
        // Get positioning information for drawing lines
        const firstRect = firstSignElement.getBoundingClientRect();
        const containerRect = document.querySelector('.zodiac-wheel').getBoundingClientRect();
        
        // Calculate the starting point of all lines (center of first selected sign)
        const startX = firstRect.left + firstRect.width/2 - containerRect.left;
        const startY = firstRect.top + firstRect.height/2 - containerRect.top;
        
        // Draw lines from the selected sign to all other signs
        zodiacSigns.forEach(sign => {
          // Don't draw a line to itself
          if (sign.name !== selectedSignOne) {
            const signElement = document.querySelector(`.zodiac-sign[data-sign="${sign.name}"]`);
            if (signElement) {
              // Get the ending point for the line (center of target sign)
              const signRect = signElement.getBoundingClientRect();
              const endX = signRect.left + signRect.width/2 - containerRect.left;
              const endY = signRect.top + signRect.height/2 - containerRect.top;
              
              // Calculate the length and angle of the line using trigonometry
              const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
              const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
              
              // Get compatibility level between the two signs
              const compatLevel = compatibilityData[selectedSignOne][sign.name];
              
              // Create the line element with appropriate styling
              const line = document.createElement('div');
              line.className = `compatibility-line ${compatLevel}`;
              line.style.width = `${length}px`;
              line.style.left = `${startX}px`;
              line.style.top = `${startY}px`;
              line.style.transform = `rotate(${angle}deg)`;
              
              // Add the line to the container
              linesContainer.appendChild(line);
            }
          }
        });
      }
    }
  }

  // Updates the relationship dynamics content based on selected signs and category
  function updateDynamicsContent(category) {
    const dynamicsContentEl = document.getElementById('dynamicsContent');
    if (!dynamicsContentEl) return; // Safety check
    
    // Check if two signs are selected - if not, show prompt
    if (!selectedSignOne || !selectedSignTwo) {
      dynamicsContentEl.innerHTML = '<p>Select two signs to explore specific relationship dynamics!</p>';
      return;
    }
    
    // Sort sign names alphabetically to ensure consistent key lookup
    // This allows us to find the right content regardless of selection order
    const signPair = [selectedSignOne, selectedSignTwo].sort().join('-');
    
    // Get content for the selected category and sign pair
    // If no specific content exists for this pair, use the default content
    let content = dynamicsContent[category][signPair] || dynamicsContent[category]['default'];
    
    // Create personalized content with sign names, symbols, and compatibility info
    const personalizedContent = `
      <div class="dynamics-header">
        <h3>${selectedSignOne} & ${selectedSignTwo}</h3>
        <div class="dynamics-symbols">
          ${zodiacSigns.find(s => s.name === selectedSignOne).symbol} + ${zodiacSigns.find(s => s.name === selectedSignTwo).symbol}
        </div>
      </div>
      <div class="dynamics-description">
        <p>${content}</p>
        <div class="compatibility-rating">
          <span class="rating-label">Compatibility in this area:</span>
          <span class="rating-stars ${compatibilityData[selectedSignOne][selectedSignTwo]}">
            ${getStarsForRating(compatibilityData[selectedSignOne][selectedSignTwo])}
          </span>
        </div>
      </div>
    `;
    
    // Update the DOM with the new content
    dynamicsContentEl.innerHTML = personalizedContent;
    
    // Add CSS styles for the dynamics content if not already added
    if (!document.getElementById('dynamics-css')) {
      const style = document.createElement('style');
      style.id = 'dynamics-css';
      style.textContent = `
        .dynamics-header {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .dynamics-header h3 {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1.8rem;
          margin-bottom: 5px;
          color: #cda9ff;
          text-shadow: 0 0 10px #bb8cff;
        }
        
        .dynamics-symbols {
          font-size: 1.5rem;
          opacity: 0.9;
        }
        
        .dynamics-description {
          background: rgba(30, 15, 50, 0.6);
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(162, 128, 255, 0.3);
        }
        
        .dynamics-description p {
          line-height: 1.6;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }
        
        .compatibility-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 15px;
        }
        
        .rating-label {
          font-weight: 600;
        }
        
        .rating-stars {
          font-size: 1.2rem;
          letter-spacing: 3px;
        }
        
        .rating-stars.high {
          color: #80ff80;
          text-shadow: 0 0 8px #80ff80;
        }
        
        .rating-stars.medium {
          color: #ffff80;
          text-shadow: 0 0 8px #ffff80;
        }
        a
        .rating-stars.low {
          color: #ff8080;
          text-shadow: 0 0 8px #ff8080;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Helper function to convert compatibility level to star rating display
  function getStarsForRating(rating) {
    switch(rating) {
      case 'high':
        return '★★★★★';
      case 'medium':
        return '★★★☆☆';
      case 'low':
        return '★★☆☆☆';
      default:
        return '★★★☆☆';
    }
  }

  // =====================================================================
  // TIMELINE FUNCTIONS
  // =====================================================================

  // Creates a visual timeline showing compatibility forecast
  function generateTimeline() {
    // Get references to the necessary DOM elements
    const timelineContainer = document.getElementById('timelineContainer');
    const timelineVisual = document.getElementById('timelineVisual');
    const timelineInsights = document.getElementById('timelineInsights');
    
    // Safety check - ensure all needed elements exist
    if (!timelineContainer || !timelineVisual || !timelineInsights) {
      console.error("Timeline elements not found");
      return;
    }
    
    // If two signs haven't been selected yet, show placeholder message
    if (!selectedSignOne || !selectedSignTwo) {
      // Create placeholder if it doesn't exist
      if (!document.querySelector('.timeline-placeholder')) {
        const placeholder = document.createElement('p');
        placeholder.className = 'timeline-placeholder';
        placeholder.textContent = 'Please select two zodiac signs first to generate a timeline!';
        timelineInsights.innerHTML = '';
        timelineInsights.appendChild(placeholder);
      }
      return;
    }
    
    // Get selected options from the form controls
    const timePeriod = document.getElementById('timeline-period')?.value || 'months12';
    const focusArea = document.getElementById('focus-area')?.value || 'overall';
    
    // Hide placeholder, show visual timeline
    const placeholder = document.querySelector('.timeline-placeholder');
    if (placeholder) placeholder.style.display = 'none';
    timelineVisual.style.display = 'block';
    timelineVisual.innerHTML = ''; // Clear previous content
    
    // Determine timeline length based on selected period
    let months = 12; // Default to 12 months
    if (timePeriod === 'months3') months = 3;
    if (timePeriod === 'months6') months = 6;
    
    // Generate timeline data - array of objects with monthly compatibility info
    const timelineData = [];
    const today = new Date();
    
    // Create data for each month in the timeline
    for (let i = 0; i < months; i++) {
      // Create a date object for this month
      const date = new Date(today);
      date.setMonth(today.getMonth() + i);
      
      // Generate a compatibility percentage that varies slightly month to month
      // Base level determined by overall compatibility, with some random variation
      const baseLevel = getCompatibilityBaseLevel(selectedSignOne, selectedSignTwo, focusArea);
      const variation = Math.floor(Math.random() * 15) - 7;  // -7 to +7 variation
      const compatibilityPercentage = Math.min(100, Math.max(30, baseLevel + variation));
      
      // Randomly add special cosmic events to some months
      const hasSpecialEvent = Math.random() < 0.3;  // 30% chance of special event
      let specialEvent = null;
    

        // Define special events and their descriptions
      if (hasSpecialEvent) {
        const specialEvents = [
          "Venus Transit enhances harmony",
          "Mercury Retrograde challenges communication",
          "Full Moon intensifies emotions",
          "Mars alignment boosts passion",
          "Jupiter expansion brings growth",
          "Saturn alignment tests commitment",
          "Neptune influence deepens spiritual connection"
        ];
        specialEvent = specialEvents[Math.floor(Math.random() * specialEvents.length)];
      }
      
      // Determine month color based on compatibility
      let monthColor;
      if (compatibilityPercentage >= 80) monthColor = '#80ff80';
      else if (compatibilityPercentage >= 60) monthColor = '#bfff80';
      else if (compatibilityPercentage >= 40) monthColor = '#ffff80';
      else monthColor = '#ff8080';
      
      timelineData.push({
        month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        compatibility: compatibilityPercentage,
        color: monthColor,
        specialEvent: specialEvent
      });
    }
    
    // Generate the visual timeline
    const monthsContainer = document.createElement('div');
    monthsContainer.className = 'timeline-months';
    
    timelineData.forEach((data, index) => {
      const monthElement = document.createElement('div');
      monthElement.className = 'timeline-month';
      monthElement.style.backgroundColor = data.color;
      monthElement.style.height = `${data.compatibility}px`;
      
      // Add tooltip with data
      monthElement.setAttribute('data-month', data.month);
      monthElement.setAttribute('data-compatibility', `${data.compatibility}%`);
      if (data.specialEvent) {
        monthElement.setAttribute('data-event', data.specialEvent);
        monthElement.classList.add('has-event');
      }
      
      // Month label
      const monthLabel = document.createElement('div');
      monthLabel.className = 'month-label';
      monthLabel.textContent = data.month.split(' ')[0]; // Just show month name
      monthElement.appendChild(monthLabel);
      
      monthsContainer.appendChild(monthElement);
    });
    
    timelineVisual.appendChild(monthsContainer);
    
    // Generate insights
    const insightsHTML = `
      <h3>Cosmic Insights for ${selectedSignOne} & ${selectedSignTwo}</h3>
      <p class="timeline-insight">${generateCompatibilityInsight(selectedSignOne, selectedSignTwo, focusArea, timelineData)}</p>
      <div class="peak-periods">
        <h4>Peak Harmony Periods</h4>
        <ul>
          ${getPeakPeriods(timelineData).map(month => `<li>${month}</li>`).join('')}
        </ul>
      </div>
      <div class="cosmic-advice">
        <h4>Cosmic Advice</h4>
        <p>${generateCosmicAdvice(selectedSignOne, selectedSignTwo, focusArea)}</p>
      </div>
    `;
    
    timelineInsights.innerHTML = insightsHTML;
    
    // Add event listeners for month elements to show tooltips
    document.querySelectorAll('.timeline-month').forEach(month => {
      month.addEventListener('mouseenter', showMonthTooltip);
      month.addEventListener('mouseleave', hideMonthTooltip);
    });
  }

  // Show tooltip for timeline month
  function showMonthTooltip(e) {
    const month = e.currentTarget;
    const tooltip = document.createElement('div');
    tooltip.className = 'timeline-tooltip';
    
    const monthName = month.getAttribute('data-month');
    const compatibility = month.getAttribute('data-compatibility');
    const event = month.getAttribute('data-event');
    
    tooltip.innerHTML = `
      <strong>${monthName}</strong><br>
      Compatibility: ${compatibility}<br>
      ${event ? `Event: ${event}` : ''}
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip near the mouse
    const x = e.clientX + 10;
    const y = e.clientY + 10;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    
    // Store reference to remove later
    month._tooltip = tooltip;
  }

  // Hide tooltip for timeline month
  function hideMonthTooltip(e) {
    const month = e.currentTarget;
    if (month._tooltip) {
      month._tooltip.remove();
      delete month._tooltip;
    }
  }

  // Get compatibility base level
  function getCompatibilityBaseLevel(sign1, sign2, focusArea) {
    // Get the base compatibility from our data
    const compatLevel = compatibilityData[sign1][sign2];
    
    // Convert to percentage
    let basePercentage;
    switch(compatLevel) {
      case 'high':
        basePercentage = 85;
        break;
      case 'medium':
        basePercentage = 65;
        break;
      case 'low':
        basePercentage = 45;
        break;
      default:
        basePercentage = 65;
    }
    
    // Adjust based on focus area and sign element compatibilities
    const sign1Element = zodiacSigns.find(s => s.name === sign1).element;
    const sign2Element = zodiacSigns.find(s => s.name === sign2).element;
    
    // Element compatibility adjustments
    if (focusArea === 'communication' && (sign1Element === 'air' || sign2Element === 'air')) {
      basePercentage += 10;
    } else if (focusArea === 'love' && ((sign1Element === 'fire' && sign2Element === 'air') || 
                                     (sign1Element === 'air' && sign2Element === 'fire'))) {
      basePercentage += 8;
    } else if (focusArea === 'growth' && ((sign1Element === 'water' && sign2Element === 'earth') || 
                                      (sign1Element === 'earth' && sign2Element === 'water'))) {
      basePercentage += 12;
    }
    
    return Math.min(95, basePercentage); // Cap at 95% to allow for variation
  }

  // Generate compatibility insight
  function generateCompatibilityInsight(sign1, sign2, focusArea, timelineData) {
    const sign1Element = zodiacSigns.find(s => s.name === sign1).element;
    const sign2Element = zodiacSigns.find(s => s.name === sign2).element;
    
    // Average compatibility
    const avgCompatibility = timelineData.reduce((sum, data) => sum + data.compatibility, 0) / timelineData.length;
    
    // Check if there are special events
    const specialEvents = timelineData.filter(data => data.specialEvent).length;
    
    // Base insights on sign combinations and focus area
    let insight = `The cosmic energy between ${sign1} and ${sign2} `;
    
    if (avgCompatibility >= 75) {
      insight += `shows remarkable potential during this period. `;
    } else if (avgCompatibility >= 60) {
      insight += `flows with moderate harmony through most of this timeline. `;
    } else {
      insight += `presents some challenges that can become opportunities for growth. `;
    }
    
    // Add element-specific insights
    if (sign1Element === sign2Element) {
      insight += `As two ${sign1Element} signs, you share a fundamental understanding of each other's approach to life. `;
    } else {
      // Complementary elements
      if ((sign1Element === 'fire' && sign2Element === 'air') || 
          (sign1Element === 'air' && sign2Element === 'fire')) {
        insight += `The ${sign1Element} and ${sign2Element} elements create a dynamic, stimulating connection that fuels inspiration. `;
      } else if ((sign1Element === 'earth' && sign2Element === 'water') || 
                (sign1Element === 'water' && sign2Element === 'earth')) {
        insight += `The ${sign1Element} and ${sign2Element} elements form a nurturing, supportive bond that fosters emotional security. `;
      } 
      // Challenging elements
      else if ((sign1Element === 'fire' && sign2Element === 'water') || 
              (sign1Element === 'water' && sign2Element === 'fire')) {
        insight += `The ${sign1Element} and ${sign2Element} elements create an intense dynamic that can transform through understanding each other's needs. `;
      } else if ((sign1Element === 'earth' && sign2Element === 'air') || 
                (sign1Element === 'air' && sign2Element === 'earth')) {
        insight += `The ${sign1Element} and ${sign2Element} elements offer valuable lessons in balancing practicality with vision. `;
      }
    }
    
    // Focus area specific insights
    if (focusArea === 'overall') {
      insight += `Overall, your connection has ${specialEvents > 1 ? 'several' : 'some'} cosmic moments that offer special opportunities for deepening your bond.`;
    } else if (focusArea === 'love') {
      insight += `In matters of the heart, the stars reveal a passionate journey that ${avgCompatibility >= 70 ? 'flourishes' : 'develops'} through authentic expression and mutual understanding.`;
    } else if (focusArea === 'communication') {
      insight += `Your communication patterns ${avgCompatibility >= 70 ? 'thrive' : 'strengthen'} when you honor your unique styles and create space for both expression and listening.`;
    } else if (focusArea === 'growth') {
      insight += `This period offers rich opportunities for mutual growth as you navigate ${specialEvents > 1 ? 'several cosmic events' : 'the cosmic energies'} that illuminate your shared path.`;
    }
    
    return insight;
  }

  // Get peak compatibility periods
  function getPeakPeriods(timelineData) {
    // Sort data by compatibility score
    const sortedData = [...timelineData].sort((a, b) => b.compatibility - a.compatibility);
    
    // Return top 3 or fewer periods
    return sortedData.slice(0, Math.min(3, sortedData.length)).map(data => data.month);
  }

  // Generate cosmic advice
  function generateCosmicAdvice(sign1, sign2, focusArea) {
    const sign1Element = zodiacSigns.find(s => s.name === sign1).element;
    const sign2Element = zodiacSigns.find(s => s.name === sign2).element;
    
    // Base advice on sign elements and focus area
    let advice = "";
    
    // Element-based advice
    if (sign1Element === sign2Element) {
      advice = `As two ${sign1Element} signs, remember to honor your similarities while creating space for individual expression. `;
    } else if ((sign1Element === 'fire' && sign2Element === 'earth') || 
              (sign1Element === 'earth' && sign2Element === 'fire')) {
      advice = `Balance ${sign1Element === 'fire' ? sign1 : sign2}'s passionate energy with ${sign1Element === 'earth' ? sign1 : sign2}'s grounded approach. `;
    } else if ((sign1Element === 'air' && sign2Element === 'water') || 
              (sign1Element === 'water' && sign2Element === 'air')) {
      advice = `Find harmony between ${sign1Element === 'air' ? sign1 : sign2}'s intellectual approach and ${sign1Element === 'water' ? sign1 : sign2}'s emotional depth. `;
    }
    
    // Focus area specific advice
    if (focusArea === 'overall') {
      advice += "Embrace the natural ebb and flow of your connection, recognizing that each phase offers gifts for your journey together.";
    } else if (focusArea === 'love') {
      advice += "Nurture your romantic bond by celebrating both the passionate peaks and the quieter moments that deepen your understanding of each other.";
    } else if (focusArea === 'communication') {
      advice += "Create sacred space for genuine dialogue, where both voices are heard and differences in communication styles are appreciated rather than judged.";
    } else if (focusArea === 'growth') {
      advice += "View challenges not as obstacles but as cosmic invitations to expand beyond comfort zones, supporting each other through personal evolution.";
    }
    
    return advice;
  }

  // Set up event listeners for the dynamics categories
  function setupDynamicsCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (!categoryButtons.length) return;
    
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update content based on selected category
        updateDynamicsContent(button.dataset.category);
      });
    });
  }

  // Initialize the compatibility chart and functionality
  function initCompatibilityPage() {
    // Generate the compatibility wheel
    generateCompatibilityWheel();
    
    // Setup dynamics categories
    setupDynamicsCategories();
    
    // Set up timeline generation button
    const generateBtn = document.getElementById('generate-timeline');
    if (generateBtn) {
      generateBtn.addEventListener('click', generateTimeline);
    } else {
      console.error("Generate timeline button not found");
    }
    
    // Add CSS for timeline tooltips
    const style = document.createElement('style');
    style.textContent = `
      .timeline-tooltip {
        position: fixed;
        background: rgba(20, 10, 40, 0.95);
        border: 1px solid #a280ff;
        border-radius: 5px;
        padding: 10px;
        color: white;
        font-size: 0.9rem;
        z-index: 100;
        pointer-events: none;
        box-shadow: 0 0 15px rgba(162, 128, 255, 0.5);
      }
      
      .timeline-tooltip strong {
        color: #d1b3ff;
      }
      
      /* Category buttons */
      .dynamics-categories {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
      }
      
      .category-btn {
        padding: 8px 15px;
        background: rgba(30, 15, 60, 0.6);
        border: 1px solid #a280ff;
        border-radius: 20px;
        color: #ccc;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .category-btn:hover {
        background: rgba(50, 25, 100, 0.7);
        color: white;
        box-shadow: 0 0 10px #a280ff77;
      }
      
      .category-btn.active {
        background: rgba(90, 40, 150, 0.7);
        color: white;
        box-shadow: 0 0 15px #bf80ff, inset 0 0 8px #a280ff;
      }
      
      /* Timeline options */
      .timeline-options {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        margin: 20px 0;
      }
      
      .timeline-option {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .timeline-option label {
        font-weight: 600;
        font-size: 0.9rem;
      }
      
      .timeline-option select {
        padding: 6px 10px;
        border-radius: 5px;
        border: 1px solid #a280ff;
        background: rgba(30, 15, 60, 0.6);
        color: #ddd;
        font-size: 0.9rem;
        cursor: pointer;
      }
      
      #generate-timeline {
        padding: 8px 18px;
        background: rgba(90, 40, 150, 0.7);
        border: 1px solid #bf80ff;
        border-radius: 20px;
        color: white;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 8px #a280ff55;
      }
      
      #generate-timeline:hover {
        background: rgba(110, 50, 180, 0.8);
        box-shadow: 0 0 15px #bf80ff77;
      }
      
      .timeline-container {
        margin-top: 30px;
      }
      
      .timeline-placeholder {
        text-align: center;
        padding: 20px;
        color: #bbb;
        font-style: italic;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize when DOM is ready
  initCompatibilityPage();


   // ===== NEXT PAGE ARROW =====
  const createNextPageArrow = () => {
    const nextPageArrow = document.createElement('div');
    nextPageArrow.className = 'next-page-arrow';
    nextPageArrow.innerHTML = `
      <a href="Celestial-Quiz.html" title="Celestial-Quiz page">
        <span style="margin-right: 10px;">Take A Quiz </span>
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