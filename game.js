const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/* === 修正：正方形マップ用サイズ === */
const TILE = 30;
const MAP_W = 10;
const MAP_H = 10;
/* === 修正ここまで === */

const map = [
  "##########",
  "#........#",
  "#........#",
  "#..####..#",
  "#........#",
  "#........#",
  "#..####..#",
  "#........#",
  "#........#",
  "##########",
];

const player = { x: 1, y: 1 };

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      ctx.fillStyle = map[y][x] === "#" ? "#555" : "#888";
      ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
    }
  }

  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(
    player.x * TILE + 4,
    player.y * TILE + 4,
    TILE - 8,
    TILE - 8
  );
}

function move(dx, dy) {
  const nx = player.x + dx;
  const ny = player.y + dy;

  if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) return;
  if (map[ny][nx] === "#") return;

  player.x = nx;
  player.y = ny;
  draw();
}

// PC操作
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move(0, -1);
  if (e.key === "ArrowDown") move(0, 1);
  if (e.key === "ArrowLeft") move(-1, 0);
  if (e.key === "ArrowRight") move(1, 0);
});

// スマホ操作（スワイプ）
let sx = 0, sy = 0;
canvas.addEventListener("touchstart", e => {
  sx = e.touches[0].clientX;
  sy = e.touches[0].clientY;
});
canvas.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - sx;
  const dy = e.changedTouches[0].clientY - sy;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 20) move(1, 0);
    if (dx < -20) move(-1, 0);
  } else {
    if (dy > 20) move(0, 1);
    if (dy < -20) move(0, -1);
  }
});

draw();
