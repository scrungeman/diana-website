document.addEventListener('DOMContentLoaded', function () {
    // Music settings (no external config file used)
    const musicConfig = {
      enabled: true,
      musicUrl:
        'https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3',
      startText: '🎵 Play Music',
      stopText: '🔇 Stop Music',
      volume: 0.5,
    };
  
    function setupMusicPlayer() {
      const musicControls = document.getElementById('musicControls');
      const musicToggle = document.getElementById('musicToggle');
      const bgMusic = document.getElementById('bgMusic');
      const musicSource = document.getElementById('musicSource');
  
      // If music is disabled, hide the controls
      if (!musicConfig.enabled) {
        if (musicControls) musicControls.style.display = 'none';
        return;
      }
  
      // Set the music source and volume
      musicSource.src = musicConfig.musicUrl;
      bgMusic.volume = musicConfig.volume;
      bgMusic.load();
  
      // Try autoplay (some browsers may block it)
      if (musicConfig.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay prevented by browser');
            musicToggle.textContent = musicConfig.startText;
          });
        }
      }
  
      // Toggle play/pause on button click
      musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
          bgMusic.play();
          musicToggle.textContent = musicConfig.stopText;
        } else {
          bgMusic.pause();
          musicToggle.textContent = musicConfig.startText;
        }
      });
    }
  
    // Make the function available globally
    window.setupMusicPlayer = setupMusicPlayer;
  });
  