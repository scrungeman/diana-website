document.addEventListener('DOMContentLoaded', function(){
    // Get references to the elements
    var showBirthdayBtn    = document.getElementById('showBirthdayBtn');
    var choiceContainer    = document.getElementById('choiceContainer');
    var birthdayChoiceBtn  = document.getElementById('birthdayChoiceBtn');
    var valentineChoiceBtn = document.getElementById('valentineChoiceBtn');
    var surpriseButtons    = document.getElementById('surpriseButtons');
    var valentineModal     = document.getElementById('valentineModal');
    var valentineYesBtn    = document.getElementById('valentineYesBtn');
    var valentineNoBtn     = document.getElementById('valentineNoBtn');
    
    // When the original "click here 4 a surprise" button is clicked,
    // hide it and show the choice container.
    if (showBirthdayBtn) {
      showBirthdayBtn.addEventListener('click', function(){
        this.style.display = 'none';
        choiceContainer.classList.remove('hidden');
      });
    }
    
    if (birthdayChoiceBtn) {
      birthdayChoiceBtn.addEventListener('click', function(){
        choiceContainer.classList.add('hidden');
        if (surpriseButtons) {
          surpriseButtons.classList.remove('hidden');
        }
        showBirthdayMessage();
      });
    }
    
    if (valentineChoiceBtn) {
      valentineChoiceBtn.addEventListener('click', function(){
        choiceContainer.classList.add('hidden');
        if (valentineModal) {
          valentineModal.classList.remove('hidden');
        }
      });
    }
    
    // When the "Yes" button is clicked, hide the "No" button and show a message.
    if (valentineYesBtn) {
      valentineYesBtn.addEventListener('click', function(){
        // Hide the "No" button
        if (valentineNoBtn) {
          valentineNoBtn.style.display = 'none';
        }

        var tadaAudio = new Audio('src/assets/tada.mp3');
        tadaAudio.play();
        
        // Display the confirmation message without using innerHTML.
        var valentineBox = document.getElementById('valentineBox');
        if (valentineBox) {
          // Clear any previous content
          valentineBox.textContent = '';
          
          // Create a new paragraph element for the message.
          var messagePara = document.createElement('p');
          messagePara.textContent = 'Yay!';
          messagePara.style.fontSize = '1.5rem';
          valentineBox.appendChild(messagePara);
        }
      });
    }
    
    // Updated moveButton function using the viewport as container.
    function moveButton(button) {
      // Remove the button from its current parent and attach it to the body.
      document.body.appendChild(button);
  
      const padding = 20;
      const btnWidth = button.offsetWidth;
      const btnHeight = button.offsetHeight;
      
      // Calculate available width and height based on the viewport dimensions.
      const availableWidth = window.innerWidth - btnWidth - (2 * padding);
      const availableHeight = window.innerHeight - btnHeight - (2 * padding);
      
      // Generate random coordinates within those boundaries.
      const randomX = padding + Math.random() * availableWidth;
      const randomY = padding + Math.random() * availableHeight;
      
      // Set fixed positioning so the button is positioned relative to the viewport.
      button.style.position = 'fixed';
      button.style.left = randomX + 'px';
      button.style.top = randomY + 'px';
      
      console.log("No button repositioned: x =", randomX, " y =", randomY);
    }
    
    // Array of audio files to cycle through.
    var audioFiles = [
      'src/assets/nuhuh.wav',
      'src/assets/nope.wav',
      'src/assets/wrong.wav'
    ];
    var currentAudioIndex = 0;
    
    // For the Valentine modal "No" button: use moveButton to reposition it
    if (valentineNoBtn) {
      valentineNoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Generate a random index to pick a random audio file
        var randomIndex = Math.floor(Math.random() * audioFiles.length);
        var audioSrc = audioFiles[randomIndex];
        var noAudio = new Audio(audioSrc);
        noAudio.play();

        moveButton(this);
      });
    }
});