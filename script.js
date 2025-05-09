const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let userSequence = [];
let level = 0;

// Retrieve highest level from localStorage
let highestLevel = localStorage.getItem("highestLevel") || 0;
document.getElementById("status").textContent = `Highest Level: ${highestLevel}`;

function flashButton(color) {
  const button = document.getElementById(color);
  button.classList.add("flash");
  setTimeout(() => button.classList.remove("flash"), 500);
}

function playSequence() {
  userSequence = [];
  document.getElementById("status").textContent = `Level ${level}`;
  
  sequence.push(colors[Math.floor(Math.random() * colors.length)]);
  
  sequence.forEach((color, index) => {
    setTimeout(() => flashButton(color), (index + 1) * 800);
  });
}

function checkUserInput() {
  if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
    document.getElementById("status").textContent = `Game Over! Highest Level: ${highestLevel}`;
    sequence = [];
    level = 0;
    return;
  }

  if (userSequence.length === sequence.length) {
    level++;

    // Update highest level in localStorage
    if (level > highestLevel) {
      highestLevel = level;
      localStorage.setItem("highestLevel", highestLevel);
    }

    setTimeout(playSequence, 1000);
  }
}

document.getElementById("startBtn").addEventListener("click", () => {
  level = 1;
  sequence = [];
  playSequence();
});

document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", (event) => {
    const color = event.target.id;
    userSequence.push(color);
    flashButton(color);
    checkUserInput();
  });
});
