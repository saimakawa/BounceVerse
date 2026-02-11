const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let big = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 120,
  color: "orange",
};

let small;

function initSmallCircle() {
  small = {
    x: 100,
    y: 100,
    radius: 30,
    dx: 4,
    dy: 3,
    color: "cyan",
    collided: false,
  };
  message.textContent = "";
}

initSmallCircle();

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}

function wallBounce(circle) {
  if (
    circle.x - circle.radius <= 0 ||
    circle.x + circle.radius >= canvas.width
  ) {
    circle.dx *= -1;
  }

  if (
    circle.y - circle.radius <= 0 ||
    circle.y + circle.radius >= canvas.height
  ) {
    circle.dy *= -1;
  }
}

function checkCollision() {
  let dx = small.x - big.x;
  let dy = small.y - big.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= small.radius + big.radius && !small.collided) {
    small.collided = true;
    small.color = "red";
    message.textContent = "Collision Happened!";

    let angle = Math.atan2(dy, dx);

    small.x = big.x + (big.radius + small.radius) * Math.cos(angle);
    small.y = big.y + (big.radius + small.radius) * Math.sin(angle);

    small.dx = 0;
    small.dy = 0;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!small.collided) {
    small.x += small.dx;
    small.y += small.dy;

    wallBounce(small);
    checkCollision();
  }

  drawCircle(big);
  drawCircle(small);

  requestAnimationFrame(update);
}

update();

restartBtn.addEventListener("click", function () {
  initSmallCircle();
});

canvas.addEventListener("click", function () {
  initSmallCircle();
});
