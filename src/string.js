var GRAVITY = { x: 0, y: 12 };
var FRICTION = { x: 0.94, y: 0.91 };
var NUM_JOINTS = 12;
var DISTANCE = 1.2;
var WEIGHT = 6;
var target = { x: 220, y: 0 };

// Arrays
var px = [];
var py = [];
var oldx = [];
var oldy = [];
var ax = [];
var ay = [];

// Rendering variables
var paper;
var path;
var rect;
var card;

window.onmousemove = function (event) {
  target.x = event.clientX;
  target.y = event.clientY;
};

window.ontouchmove = function (event) {
  target.x = event.touches[0].pageX;
  target.y = event.touches[0].pageY;
  event.preventDefault();
};

window.onload = function () {
  createRope();

  // Creates Raphael canvas (1000 x 800)
  paper = Raphael(0, 0, 1000, 800);
  paper.canvas.classList.add("raphael-canvas");

  var pathStr = "M10 10";
  path = paper.path(pathStr);
  path.attr({
    stroke: "teal",
    "stroke-width": 3,
    "stroke-linecap": "round",
    fill: "none"
  });

  // Give the rope a class so we can override the global CSS:
  path.node.classList.add("rope");

  setInterval(render, 1000 / 60);

  // Uncomment the following if you need the rectangle:
  // rect = paper.rect(5, 5, 40, 40, 3);
  // rect.attr({ fill: "#ffd614" });

  card = $("#card");
};

function collideRope() {
  for (var i = 0; i < NUM_JOINTS; i++) {
    if (py[i] > 250) {
      // Set border limit
      py[i] = 250;
    }
  }
}

function render() {
  updateRope(); // Handles gravity and weight forces
  // collideRope(); // Handles collisions with the ground if needed

  // Attach first point to the mouse/touch position
  px[0] = target.x;
  py[0] = target.y;

  var pathStr = "M" + target.x + " " + target.y;
  for (var j = 0; j <= NUM_JOINTS; j++) {
    pathStr += "L" + px[j] + " " + py[j];
  }
  path.attr("path", pathStr);
}

function updateRope() {
  // FORCE: apply gravity to joints 1 through NUM_JOINTS
  for (var i = 1; i <= NUM_JOINTS; i++) {
    py[i] += GRAVITY.y * (1 / 36);
    px[i] += GRAVITY.x * (1 / 36);
  }

  // FRICTION: update each joint's position
  for (var i = 0; i <= NUM_JOINTS; i++) {
    var previousx = px[i];
    var previousy = py[i];

    px[i] += (px[i] - oldx[i]) * FRICTION.x;
    py[i] += (py[i] - oldy[i]) * FRICTION.y;

    oldx[i] = previousx;
    oldy[i] = previousy;
  }

  // Apply extra weight to the last joint
  py[NUM_JOINTS] += WEIGHT * (1 / 36);

  // TENSION: enforce distance between joints
  var jointDistance = DISTANCE / NUM_JOINTS;
  for (var i = 1; i <= NUM_JOINTS; i++) {
    var dx = (px[i] - px[i - 1]) / 100;
    var dy = (py[i] - py[i - 1]) / 100;
    var d = Math.sqrt(dx * dx + dy * dy);
    var force = d - jointDistance;

    ax[i] = (dx / d) * 0.5 * 100 * force;
    ay[i] = (dy / d) * 0.5 * 100 * force;
    px[i] -= ax[i];
    py[i] -= ay[i];
    px[i - 1] += ax[i];
    py[i - 1] += ay[i];
  }

  // Update the card's position based on the last joint
  // (If needed, you can update the rectangle's position similarly)
  card.css({ left: px[NUM_JOINTS] - 100, top: py[NUM_JOINTS] });
}

function createRope() {
  for (var i = 0; i <= NUM_JOINTS; i++) {
    px[i] = 0;
    py[i] = 0;
    oldx[i] = 0;
    oldy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}