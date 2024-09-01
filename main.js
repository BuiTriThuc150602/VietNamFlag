const canvas = document.getElementById("flagCanvas");
const ctx = canvas.getContext("2d");
const audio = new Audio("./audio/Download.mp3");
audio.play();

function animateBorder() {
  const borderWidth = 1;
  const delay = 100;
  let borderProgress = 0;

  function drawBorder() {
    if (borderProgress < canvas.width) {
      canvas.style.borderLeft = `${borderWidth}px solid black`;
      canvas.style.borderLeftWidth = `${borderWidth}px`;
    } else if (borderProgress < canvas.width + canvas.height) {
      canvas.style.borderTop = `${borderWidth}px solid black`;
      canvas.style.borderTopWidth = `${borderWidth}px`;
    } else if (borderProgress < 2 * canvas.width) {
      canvas.style.borderRight = `${borderWidth}px solid black`;
      canvas.style.borderRightWidth = `${borderWidth}px`;
    } else if (borderProgress < 2 * canvas.width + canvas.height) {
      canvas.style.borderBottom = `${borderWidth}px solid black`;
      canvas.style.borderBottomWidth = `${borderWidth}px`;
    }

    borderProgress += 10;

    if (borderProgress < 2 * (canvas.width + canvas.height)) {
      requestAnimationFrame(drawBorder);
    } else {
      animateRectangleWaveWipe();
    }
  }

  drawBorder();
}

function drawRectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

let rectHeight = 0;
function animateRectangle() {
  drawRectangle("red", 0, 0, 500, rectHeight);
  if (rectHeight < 400) {
    rectHeight += 2;
    requestAnimationFrame(animateRectangle);
  } else {
    animateStar(250, 200, 100, 0);
  }
}

let rectWidth = 0;

function animateRectangleWaveWipe() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas

  for (let i = 0; i < canvas.height; i++) {
    let waveHeight = 10 * Math.sin((i + rectWidth) / 20);
    ctx.fillStyle = "red";
    ctx.fillRect(0, i, rectWidth + waveHeight + 20, 1);
  }

  if (rectWidth < canvas.width) {
    rectWidth += 5;
    requestAnimationFrame(animateRectangleWaveWipe);
  } else {
    animateStar(400, 300, 150, 0);
  }
}

function drawStar(x, y, radius, progress) {
  ctx.beginPath();
  const outerRadius = radius;
  const innerRadius = radius * 0.382;

  for (let i = 0; i < 5; i++) {
    const angle = i * ((2 * Math.PI) / 5) - Math.PI / 2;
    const xOuter = x + outerRadius * Math.cos(angle);
    const yOuter = y + outerRadius * Math.sin(angle);

    if (i === 0) {
      ctx.moveTo(xOuter, yOuter);
    } else {
      ctx.lineTo(xOuter, yOuter);
    }

    const angleInner = angle + Math.PI / 5;
    const xInner = x + innerRadius * Math.cos(angleInner);
    const yInner = y + innerRadius * Math.sin(angleInner);

    ctx.lineTo(xInner, yInner);
  }

  ctx.closePath();
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.clip();

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arc(x, y, radius, -Math.PI / 2, 2 * Math.PI * progress - Math.PI / 2);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

function animateStar(x, y, radius, progress) {
  drawStar(x, y, radius, progress);
  if (progress < 1) {
    requestAnimationFrame(() => animateStar(x, y, radius, progress + 0.01));
  } else {
    canvas.style.border = "none";
    canvas.style.animation = "waveFlag 2s infinite";
  }
}

animateBorder();
