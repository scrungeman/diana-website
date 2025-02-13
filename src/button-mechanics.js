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
  
  // Modified Valentine "Yes" button handler
  if (valentineYesBtn) {
    valentineYesBtn.addEventListener('click', function(){
      // Hide the "No" button
      if (valentineNoBtn) {
        valentineNoBtn.style.display = 'none';
      }
  
      // Play the tada audio
      var tadaAudio = new Audio('src/assets/tada.mp3');
      tadaAudio.play();
  
      // Trigger confetti
      const canvasElem = document.getElementById('canvas');
      canvasElem.classList.remove('hidden');
      initConfetti();
      renderConfetti();
  
      valentineModal.innerHTML = '';
  
      var modalContent = document.createElement('div');
      modalContent.style.position = 'relative';
      modalContent.style.padding = '20px';
  
      var topMessage = document.createElement('h2');
      topMessage.textContent = "i knew you'd say yes!!! :) i love diana!!!";
      topMessage.style.textAlign = 'center';
      topMessage.style.marginBottom = '20px';
      modalContent.appendChild(topMessage);

      var subText = document.createElement('p');
      subText.textContent = "this is us btw..";
      subText.style.textAlign = 'center';
      subText.style.fontSize = '0.8rem';
      subText.style.marginBottom = '20px';
      modalContent.appendChild(subText);
  
      var musicDiv = document.createElement('div');
      musicDiv.id = 'musicControls';
      musicDiv.className = 'music-controls';
      musicDiv.style.position = 'absolute';
      musicDiv.style.top = '10px';
      musicDiv.style.right = '10px';
      musicDiv.innerHTML = `
        <button id="musicToggle" class="music-btn">🎵 Play Music</button>
        <audio id="bgMusic" loop>
          <source id="musicSource" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      `;
      modalContent.appendChild(musicDiv);
  
      var imageContainer = document.createElement('div');
      imageContainer.style.display = 'flex';
      imageContainer.style.justifyContent = 'center';
      imageContainer.style.alignItems = 'center';
      imageContainer.style.gap = '10px';
      imageContainer.style.marginTop = '20px';
  
      var img1 = document.createElement('img');
      img1.src = 'src/assets/seal1.gif';
      img1.alt = 'Seal 1';
      img1.style.maxWidth = '200px';
      img1.style.height = 'auto';
  
      var img2 = document.createElement('img');
      img2.src = 'src/assets/kiss.jpg';
      img2.alt = 'Kiss';
      img2.style.maxWidth = '200px';
      img2.style.height = 'auto';
  
      var img3 = document.createElement('img');
      img3.src = 'src/assets/seal2.gif';
      img3.alt = 'Seal 2';
      img3.style.maxWidth = '200px';
      img3.style.height = 'auto';
  
      imageContainer.appendChild(img1);
      imageContainer.appendChild(img2);
      imageContainer.appendChild(img3);
  
      modalContent.appendChild(imageContainer);
  
      valentineModal.appendChild(modalContent);
  
      if (typeof setupMusicPlayer === 'function') {
        setupMusicPlayer();
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
