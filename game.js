window.addEventListener("DOMContentLoaded", () => {

  // ----- Countdown Timer -----
  let targetTime = null;
  const countdownEl = document.getElementById("countdown");
  const timePicker = document.getElementById("timePicker");

  timePicker.addEventListener("input", function() {
    if (this.value) {
      const [hours, minutes] = this.value.split(":").map(Number);
      targetTime = { hours, minutes };
    }
  });

  function updateCountdown() {
    if (!targetTime) {
      countdownEl.textContent = "Choose a time ⏰";
      return;
    }
    const now = new Date();
    const target = new Date();
    target.setHours(targetTime.hours, targetTime.minutes, 0, 0);
    if (now > target) target.setDate(target.getDate() + 1);
    const diff = target - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ----- Clicker Game -----
  let score = 0, power = 1, upgradeCost1 = 50;
  let autoClickers = 0, upgradeCost2 = 200;
  let multiplier = 1, upgradeCost3 = 1000;
  let rebirths = 0, rebirthMultiplier = 1;

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

  clickBtn.addEventListener("click", () => {
    score += power * multiplier * rebirthMultiplier;
    updateUI();
  });

  upgradeBtn1.addEventListener("click", () => {
    if (score >= upgradeCost1) {
      score -= upgradeCost1; power++; upgradeCost1 = Math.floor(upgradeCost1*1.5);
      upgradeBtn1.textContent = `Buy Power Upgrade (Cost: ${upgradeCost1})`;
      updateUI();
    } else alert("Not enough points!");
  });

  upgradeBtn2.addEventListener("click", () => {
    if (score >= upgradeCost2) {
      score -= upgradeCost2; autoClickers++; upgradeCost2 = Math.floor(upgradeCost2*1.5);
      upgradeBtn2.textContent = `Buy Auto-Clicker (Cost: ${upgradeCost2})`; updateUI();
    } else alert("Not enough points!");
  });

  upgradeBtn3.addEventListener("click", () => {
    if (score >= upgradeCost3) {
      score -= upgradeCost3; multiplier++; upgradeCost3 = Math.floor(upgradeCost3*2);
      upgradeBtn3.textContent = `Buy Super Upgrade (Cost: ${upgradeCost3})`; updateUI();
    } else alert("Not enough points!");
  });

  rebirthBtn.addEventListener("click", () => {
    if (score >= 10000) {
      rebirths++; rebirthMultiplier++;
      score = 0; power = 1; autoClickers = 0; multiplier = 1;
      upgradeCost1 = 50; upgradeCost2 = 200; upgradeCost3 = 1000;
      upgradeBtn1.textContent = `Buy Power Upgrade (Cost: ${upgradeCost1})`;
      upgradeBtn2.textContent = `Buy Auto-Clicker (Cost: ${upgradeCost2})`;
      upgradeBtn3.textContent = `Buy Super Upgrade (Cost: ${upgradeCost3})`;
      updateUI();
    } else alert("You need 10,000 points to Rebirth!");
  });

  setInterval(() => {
    if (autoClickers > 0) { score += autoClickers * multiplier * rebirthMultiplier; updateUI(); }
  }, 1000);

  function updateUI() {
    scoreEl.textContent = score;
    powerEl.textContent = power;
    autoClickersEl.textContent = autoClickers;
    multiplierEl.textContent = multiplier;
    rebirthsEl.textContent = rebirths;
  }

  // ----- Cosmetic Shop -----
  const cosmeticBtns = document.querySelectorAll(".cosmeticBtn");

  function updateCosmetics() {
    cosmeticBtns.forEach(btn => {
      const cost = Number(btn.dataset.cost);
      btn.disabled = score < cost;
    });
  }

  cosmeticBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const cost = Number(btn.dataset.cost);
      const type = btn.dataset.type;
      const value = btn.dataset.value;
      if (score >= cost) {
        score -= cost;
        if (type==="bg") document.body.style.backgroundColor=value;
        if (type==="btn") document.querySelectorAll("button").forEach(b=>b.style.backgroundColor=value);
        if (type==="font") document.body.style.fontFamily=value;
        btn.disabled=true;
        updateUI();
      } else alert("Not enough points!");
    });
  });

  setInterval(updateCosmetics, 1000);

});
