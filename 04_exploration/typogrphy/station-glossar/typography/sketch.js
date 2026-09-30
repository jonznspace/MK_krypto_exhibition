let message = "KRYPTO, WAS?";
let tileSize = 24;
let tileMap = [];
let textInputElement;
let sizeInputElement;
let sizeValueElement;

function setup() {
  createCanvas(1440, 1024);
  pixelDensity(1);

  textInputElement = document.getElementById("textInput");
  sizeInputElement = document.getElementById("tileSizeInput");
  sizeValueElement = document.getElementById("tileSizeValue");

  if (textInputElement) {
    textInputElement.addEventListener("input", () => {
      message = textInputElement.value.trim() || "TYPE";
      updateGrid();
    });
  }

  if (sizeInputElement) {
    sizeInputElement.addEventListener("input", () => {
      tileSize = Number(sizeInputElement.value) || 24;
      if (sizeValueElement) {
        sizeValueElement.textContent = tileSize;
      }
      updateGrid();
    });
  }

  if (sizeValueElement) {
    sizeValueElement.textContent = tileSize;
  }

  const exportButton = document.getElementById("exportSvg");
  if (exportButton) {
    exportButton.addEventListener("click", exportSvg);
  }

  if (document.fonts && document.fonts.load) {
    document.fonts.load("800 180px Panchang").then(updateGrid).catch(updateGrid);
  } else {
    updateGrid();
  }
}

function draw() {
  background(255);
  noStroke();
  fill(0);

  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      if (tileMap[row][col]) {
        rect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }
}


function updateGrid() {
  let gfx = createGraphics(width, height);
  gfx.pixelDensity(1);
  gfx.background(255);
  gfx.fill(0);
  gfx.noStroke();
  gfx.textFont("Panchang");
  gfx.textStyle(BOLD);
  gfx.textSize(100);
  gfx.textAlign(LEFT, BASELINE);
  gfx.text(message, 120, 240);
  gfx.loadPixels();

  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);
  tileMap = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const startX = col * tileSize;
      const startY = row * tileSize;
      let filled = false;

      for (let yy = startY; yy < startY + tileSize && yy < height && !filled; yy++) {
        for (let xx = startX; xx < startX + tileSize && xx < width; xx++) {
          const index = 4 * (xx + yy * width);
          const r = gfx.pixels[index];
          if (r < 128) {
            filled = true;
            break;
          }
        }
      }

      tileMap[row][col] = filled;
    }
  }
}

function exportSvg() {
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  for (let row = 0; row < tileMap.length; row++) {
    for (let col = 0; col < tileMap[row].length; col++) {
      if (tileMap[row][col]) {
        svg += `<rect x="${col * tileSize}" y="${row * tileSize}" width="${tileSize}" height="${tileSize}" fill="black"/>`;
      }
    }
  }
  svg += '</svg>';

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'typography.svg';
  a.click();
  URL.revokeObjectURL(url);
}