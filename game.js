window.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  let power = 1;
  let upgradeCost = 50;

  const scoreEl = document.getElementById("score");
  const powerEl = document.getElementById("power");
  const clickBtn = document.getElementById("clickBtn");
  const upgradeBtn = document.getElementById("upgradeBtn");

  // Clicking increases score
  clickBtn.addEventListener("click", () => {
    score += power;
    updateUI();
  });

  // Buy upgrade
  upgradeBtn.addEventListener("click", () => {
    if (score >= upgradeCost) {
      score -= upgradeCost;
      power++;
      upgradeCost = Math.floor(upgradeCost * 1.5); // increase cost
      upgradeBtn.textContent = `Buy Upgrade (Cost: ${upgradeCost})`;
      updateUI();
    } else {
      alert("Not enough points!");
    }
  });

  function updateUI() {
    scoreEl.textContent = score;
    powerEl.textContent = power;
  }
});
