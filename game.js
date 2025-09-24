window.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  let power = 1;
  let upgradeCost1 = 50;

  let autoClickers = 0;
  let upgradeCost2 = 200;

  let multiplier = 1;
  let upgradeCost3 = 1000;

  let rebirths = 0;
  let rebirthMultiplier = 1;

  // Elements
  const scoreEl = document.getElementById("score");
  const powerEl = document.getElementById("power");
  const autoClickersEl = document.getElementById("autoClickers");
  const multiplierEl = document.getElementById("multiplier");
  const rebirthsEl = document.getElementById("rebirths");

  const clickBtn = document.getElementById("clickBtn");
  const upgradeBtn1 = document.getElementById("upgradeBtn1");
  const upgradeBtn2 = document.getElementById("upgradeBtn2");
  const upgradeBtn3 = document.getElementById("upgradeBtn3");
  const rebirthBtn = document.getElementById("rebirthBtn");

  // Main click
  clickBtn.addEventListener("click", () => {
    score += power * multiplier * rebirthMultiplier;
    updateUI();
  });

  // Upgrade 1: Power per click
  upgradeBtn1.addEventListener("click", () => {
    if (score >= upgradeCost1) {
      score -= upgradeCost1;
      power++;
      upgradeCost1 = Math.floor(upgradeCost1 * 1.5);
      upgradeBtn1.textContent = `Buy Power Upgrade (Cost: ${upgradeCost1})`;
      updateUI();
    } else {
      alert("Not enough points!");
    }
  });

  // Upgrade 2: Auto-clicker
  upgradeBtn2.addEventListener("click", () => {
    if (score >= upgradeCost2) {
      score -= upgradeCost2;
      autoClickers++;
      upgradeCost2 = Math.floor(upgradeCost2 * 1.5);
      upgradeBtn2.textContent = `Buy Auto-Clicker (Cost: ${upgradeCost2})`;
      updateUI();
    } else {
      alert("Not enough points!");
    }
  });

  // Upgrade 3: Multiplier
  upgradeBtn3.addEventListener("click", () => {
    if (score >= upgradeCost3) {
      score -= upgradeCost3;
      multiplier++;
      upgradeCost3 = Math.floor(upgradeCost3 * 2);
      upgradeBtn3.textContent = `Buy Super Upgrade (Cost: ${upgradeCost3})`;
      updateUI();
    } else {
      alert("Not enough points!");
    }
  });

  // Rebirth
  rebirthBtn.addEventListener("click", () => {
    if (score >= 10000) {
      rebirths++;
      rebirthMultiplier++;
      score = 0;
      power = 1;
      autoClickers = 0;
      multiplier = 1;
      upgradeCost1 = 50;
      upgradeCost2 = 200;
      upgradeCost3 = 1000;
      upgradeBtn1.textContent = `Buy Power Upgrade (Cost: ${upgradeCost1})`;
      upgradeBtn2.textContent = `Buy Auto-Clicker (Cost: ${upgradeCost2})`;
      upgradeBtn3.textContent = `Buy Super Upgrade (Cost: ${upgradeCost3})`;
      updateUI();
    } else {
      alert("You need 10,000 points to Rebirth!");
    }
  });

  // Auto-clickers add points every second
  setInterval(() => {
    if (autoClickers > 0) {
      score += autoClickers * multiplier * rebirthMultiplier;
      updateUI();
    }
  }, 1000);

  function updateUI() {
    scoreEl.textContent = score;
    powerEl.textContent = power;
    autoClickersEl.textContent = autoClickers;
    multiplierEl.textContent = multiplier;
    rebirthsEl.textContent = rebirths;
  }
});
