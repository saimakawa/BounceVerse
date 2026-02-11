const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const message = document.getElementById("message");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let small = {
  x: 100,
  y: 100,
  radius: 30,
  dx: 4,
  dy: 3,
  color: "cyan",
};

let big = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 120,
  dx: 2,
  dy: 2,
  color: "orange",
};

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

  if (distance <= small.radius + big.radius) {
    small.color = "red";
    big.color = "yellow";

    message.textContent = "Collision Happened!";

    let tempDx = small.dx;
    let tempDy = small.dy;

    small.dx = big.dx;
    small.dy = big.dy;

    big.dx = tempDx;
    big.dy = tempDy;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  small.x += small.dx;
  small.y += small.dy;

  big.x += big.dx;
  big.y += big.dy;

  wallBounce(small);
  wallBounce(big);

  checkCollision();

  drawCircle(big);
  drawCircle(small);

  requestAnimationFrame(update);
}

update();
