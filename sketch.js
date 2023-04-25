function setup() {
  createCanvas(windowWidth, windowHeight);
}
function drawCirculos(parts) {
  clear();
  if(parts > 1) {
      drawPuntoPendiente(parts, width / 4, height / 2, 50);
      drawPizzaDDA(parts, width / 2, height / 2, 50);
      drawBresenham(parts, width / 1.3, height / 2, 50);
  } else {
      drawPuntoPendiente(0, width / 4, height / 2, 50);
      drawPizzaDDA(0, width / 2, height / 2, 50);
      drawBresenham(0, width / 1.3, height / 2, 50);
  }
}
function drawCircle(xCenter, yCenter, radius) {
  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;
  while (y <= x) {
    point(x + xCenter, y + yCenter);
    point(y + xCenter, x + yCenter);
    point(-x + xCenter, y + yCenter);
    point(-y + xCenter, x + yCenter);
    point(-x + xCenter, -y + yCenter);
    point(-y + xCenter, -x + yCenter);
    point(x + xCenter, -y + yCenter);
    point(y + xCenter, -x + yCenter);
    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }
}
function drawPuntoPendiente(parts, centerX, centerY, radius) {
  const anglePerSlice = (2 * Math.PI) / parts;
  for (let i = 0; i < parts; i++) {
    const startAngle = i * anglePerSlice;
    const endAngle = (i + 1) * anglePerSlice;
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    line(centerX, centerY, startX, startY);
    line(centerX, centerY, endX, endY);
  }
  drawCircle(centerX, centerY, radius);
}
function drawPizzaDDA(parts, centerX, centerY, radius) {
  const angle = (2 * PI) / parts;
  for (let i = 0; i < parts; i++) {
    const x1 = centerX;
    const y1 = centerY;
    const x2 = centerX + radius * cos(angle * i);
    const y2 = centerY + radius * sin(angle * i);
    drawLineDDA(x1, y1, x2, y2);
  }
  drawCircle(centerX, centerY, radius);
}
function drawLineDDA(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;
  let x = x1;
  let y = y1;
  for (let i = 0; i < steps; i++) {
    point(Math.round(x), Math.round(y));
    x += xIncrement;
    y += yIncrement;
  }
}
function drawBresenham(parts, centerX, centerY, radius) {
  drawCircle(centerX, centerY, radius);
  for (let i = 0; i < parts; i++) {
    const angle1 = (i * TWO_PI) / parts;
    let x1 = round(centerX + radius * cos(angle1));
    let y1 = round(centerY + radius * sin(angle1));
    line(centerX, centerY, x1, y1);
  }
}