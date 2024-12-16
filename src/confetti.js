const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 2;
const drag = 0.1;
const colors = [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'goldenrod' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'deeppink' },
  { front: 'purple', back: 'indigo' },
  { front: 'turquoise', back: 'darkturquoise' }
];

//-----------Functions--------------
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function initConfetti() {
  confetti = []; // clear old confetti if any
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30)
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1
      },
      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 0.4,
        y: 0.4
      },
      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50)
      }
    });
  }
};

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  window.requestAnimationFrame(render);
};

//---------Overlay and display-----------
window.addEventListener('resize', resizeCanvas);

// This function will show the birthday message and start the confetti animation
function showBirthdayMessage() {
  const nameElem = document.querySelector('.name');
  const canvasElem = document.querySelector('#canvas');
  
  // Remove hidden class to display elements
  nameElem.classList.remove('hidden');
  canvasElem.classList.remove('hidden');

  // Initialize and render confetti
  initConfetti();
  render();
}

// Export the function so we can call it from the main page if needed
window.showBirthdayMessage = showBirthdayMessage;