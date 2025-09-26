// game.js — Full-featured clicker with countdown, cosmetics, leaderboard, rebirths, cheats, hidden cat
window.addEventListener("DOMContentLoaded", () => {

  // --------- Elements ----------
  const timePicker = document.getElementById("timePicker");
  const countdownEl = document.getElementById("countdown");
  const scoreEl = document.getElementById("score");
  const rebirthPointsEl = document.getElementById("rebirthPoints");
  const powerEl = document.getElementById("power");
  const autoClickersEl = document.getElementById("autoClickers");
  const multiplierEl = document.getElementById("multiplier");
  const rebirthsEl = document.getElementById("rebirths");
  const clickBtn = document.getElementById("clickBtn");

  const buyPower = document.getElementById("buyPower");
  const buyAuto = document.getElementById("buyAuto");
  const buyMulti = document.getElementById("buyMulti");
  const buyMega = document.getElementById("buyMega");
  const buyBoost = document.getElementById("buyClickBoost");

  const costPower = document.getElementById("costPower");
  const costAuto = document.getElementById("costAuto");
  const costMulti = document.getElementById("costMulti");
  const costMega = document.getElementById("costMega");
  const costBoost = document.getElementById("costBoost");

  const rebirthBtn = document.getElementById("rebirthBtn");
  const rebirthCostEl = document.getElementById("rebirthCost");

  const cosmeticGrid = document.getElementById("cosmeticGrid");
  const cosmeticBtns = document.querySelectorAll(".cosmetic");
  const rebirthOnlyBtns = document.querySelectorAll(".rebirth-only");

  const cheatInput = document.getElementById("cheatInput");
  const applyCheat = document.getElementById("applyCheat");
  const playerName = document.getElementById("playerName");
  const saveScore = document.getElementById("saveScore");
  const leaderboardEl = document.getElementById("leaderboard");
  const resetSave = document.getElementById("resetSave");
  const clearLeaderboard = document.getElementById("clearLeaderboard");

  const title = document.getElementById("title");
  const hiddenCat = document.getElementById("hiddenCat");

  // --------- Game state (load or defaults) ----------
  const defaultState = {
    score: 0,
    power: 1,
    autoClickers: 0,
    multiplier: 1,
    rebirths: 0,
    rebirthPoints: 0,
    // upgrade costs
    costPower: 50,
    costAuto: 200,
    costMulti: 1000,
    costMega: 5000,
    costBoost: 1200,
  };

  let state = loadState();

  // Helper to save/load
  function saveState(){ localStorage.setItem("ultimate_clicker_state", JSON.stringify(state)); }
  function loadState(){
    const raw = localStorage.getItem("ultimate_clicker_state");
    if(!raw) return {...defaultState};
    try{ const obj = JSON.parse(raw); return {...defaultState, ...obj}; } catch(e){ return {...defaultState}; }
  }

  // --------- Countdown logic ----------
  let targetTime = null;
  timePicker.addEventListener("input", function() {
    if (this.value) {
      const [h,m] = this.value.split(":").map(Number);
      targetTime = { hours:h, minutes:m };
    }
  });
  function updateCountdown(){
    if(!targetTime){ countdownEl.textContent = "Choose a time ⏰"; return; }
    const now = new Date();
    const target = new Date();
    target.setHours(targetTime.hours, targetTime.minutes,0,0);
    if(now > target) target.setDate(target.getDate()+1);
    const diff = Math.max(0, target - now);
    const hours = Math.floor(diff / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);
    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
  setInterval(updateCountdown,1000);
  updateCountdown();

  // --------- Core game functions ----------
  function updateUI(){
    scoreEl.textContent = Math.floor(state.score);
    rebirthPointsEl.textContent = state.rebirthPoints;
    powerEl.textContent = state.power;
    autoClickersEl.textContent = state.autoClickers;
    multiplierEl.textContent = state.multiplier;
    rebirthsEl.textContent = state.rebirths;
    costPower.textContent = state.costPower;
    costAuto.textContent = state.costAuto;
    costMulti.textContent = state.costMulti;
    costMega.textContent = state.costMega;
    costBoost.textContent = state.costBoost;
    rebirthCostEl.textContent = calculateRebirthCost();

    // enable/disable upgrades
    buyPower.disabled = state.score < state.costPower;
    buyAuto.disabled = state.score < state.costAuto;
    buyMulti.disabled = state.score < state.costMulti;
    buyMega.disabled = state.score < state.costMega;
    buyBoost.disabled = state.score < state.costBoost;

    // cosmetics by score
    cosmeticBtns.forEach(btn=>{
      const cost = Number(btn.dataset.cost || 1);
      const bought = btn.dataset.bought === "true";
      btn.disabled = bought || (state.score < cost);
    });
    // rebirth-only cosmetics
    rebirthOnlyBtns.forEach(btn=>{
      const rpcost = Number(btn.dataset.rpcost || 1);
      const bought = btn.dataset.bought === "true";
      btn.disabled = bought || (state.rebirthPoints < rpcost);
    });

    saveState();
  }

  function calculateRebirthCost(){
    // base 10000, doubles each rebirth (exponential)
    return Math.floor(10000 * Math.pow(2, state.rebirths));
  }

  // click action
  clickBtn.addEventListener("click", ()=>{
    state.score += state.power * state.multiplier;
    flashClickButton();
    updateUI();
  });

  // auto click interval (every second)
  setInterval(()=> {
    if(state.autoClickers>0){
      state.score += state.autoClickers * state.multiplier;
      updateUI();
    }
  }, 1000);

  // --------- Upgrades handlers ----------
  buyPower.addEventListener("click", ()=>{
    if(state.score >= state.costPower){
      state.score -= state.costPower;
      state.power += 1;
      state.costPower = Math.floor(state.costPower * 1.6);
      updateUI();
    } else alert("Not enough points!");
  });

  buyAuto.addEventListener("click", ()=>{
    if(state.score >= state.costAuto){
      state.score -= state.costAuto;
      state.autoClickers += 1;
      state.costAuto = Math.floor(state.costAuto * 1.7);
      updateUI();
    } else alert("Not enough points!");
  });

  buyMulti.addEventListener("click", ()=>{
    if(state.score >= state.costMulti){
      state.score -= state.costMulti;
      state.multiplier += 1;
      state.costMulti = Math.floor(state.costMulti * 2);
      updateUI();
    } else alert("Not enough points!");
  });

  buyMega.addEventListener("click", ()=>{
    if(state.score >= state.costMega){
      state.score -= state.costMega;
      state.power += 5;
      state.costMega = Math.floor(state.costMega * 2.2);
      updateUI();
    } else alert("Not enough points!");
  });

  buyBoost.addEventListener("click", ()=>{
    if(state.score >= state.costBoost){
      state.score -= state.costBoost;
      state.power += 2;
      state.costBoost = Math.floor(state.costBoost * 1.9);
      updateUI();
    } else alert("Not enough points!");
  });

  // --------- Rebirth ----------
  rebirthBtn.addEventListener("click", ()=>{
    const cost = calculateRebirthCost();
    if(state.score >= cost){
      state.score = 0;
      state.power = 1;
      state.autoClickers = 0;
      state.multiplier = 1;
      state.rebirths += 1;
      state.rebirthPoints += 1; // award 1 RP per rebirth
      // reset upgrade costs to base
      state.costPower = defaultState.costPower;
      state.costAuto = defaultState.costAuto;
      state.costMulti = defaultState.costMulti;
      state.costMega = defaultState.costMega;
      state.costBoost = defaultState.costBoost;
      updateUI();
      alert("Rebirth complete! You gained 1 Rebirth Point (RP).");
    } else {
      alert(`You need ${cost} points to rebirth.`);
    }
  });

  // --------- Cosmetics purchase ----------
  cosmeticBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const cost = Number(btn.dataset.cost || 0);
      const type = btn.dataset.type;
      const value = btn.dataset.value;
      if(state.score >= cost){
        state.score -= cost;
        applyCosmetic(type, value);
        btn.dataset.bought = "true";
        btn.disabled = true;
        updateUI();
      } else alert("Not enough points for this cosmetic.");
    });
  });

  rebirthOnlyBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const rpcost = Number(btn.dataset.rpcost || 1);
      const type = btn.dataset.type;
      const value = btn.dataset.value;
      if(state.rebirthPoints >= rpcost){
        state.rebirthPoints -= rpcost;
        applyCosmetic(type, value);
        btn.dataset.bought = "true";
        btn.disabled = true;
        updateUI();
      } else alert("Not enough Rebirth Points.");
    });
  });

  function applyCosmetic(type, value){
    if(type === "bg"){
      document.documentElement.style.setProperty('--bg', value);
    } else if(type === "btn"){
      document.documentElement.style.setProperty('--accent', value);
    } else if(type === "font"){
      document.body.style.fontFamily = value;
    } else if(type === "rainbow"){
      // rainbow special cosmetics
      if(value === "rainbow"){
        clickBtn.classList.add("rainbow-glow");
      } else if(value === "rwbkg"){
        document.querySelector('.container').classList.add("rainbow-bg");
      }
    }
  }

  // --------- Cheats ----------
  applyCheat.addEventListener("click", ()=>{
    const code = String(cheatInput.value || "").trim().toUpperCase();
    // secret codes:
    // RAINBOWCAT => 10,000,000 coins + unlocks cat cosmetic
    // GODMODE => 10,000,000 coins
    // SMALLCHEAT => 10000 coins
    if(code === "RAINBOWCAT" || code === "GODMODE"){
      state.score += 10000000;
      // auto-unlock rainbow glow
      document.querySelectorAll(".cosmetic.rebirth-only").forEach(b=>{ b.dataset.bought = "true"; b.disabled = true; });
      applyCosmetic("rainbow","rainbow");
      revealCat();
      updateUI();
      alert("Cheat accepted.");
    } else if(code === "SMALLCHEAT"){
      state.score += 10000;
      updateUI();
      alert("Small boost granted.");
    } else {
      alert("Wrong code.");
    }
    cheatInput.value = "";
  });

  // Also allow typing the classic Konami-ish 'IDDQD' quickly —
  // but simple input box is fine per request.

  // --------- Leaderboard (localStorage) ----------
  function loadLeaderboard(){
    const raw = localStorage.getItem("ultimate_clicker_leaderboard");
    if(!raw) return [];
    try { return JSON.parse(raw); } catch(e){ return []; }
  }
  function saveLeaderboard(list){
    localStorage.setItem("ultimate_clicker_leaderboard", JSON.stringify(list));
  }
  function renderLeaderboard(){
    const list = loadLeaderboard();
    leaderboardEl.innerHTML = "";
    list.slice(0,10).forEach(entry=>{
      const li = document.createElement("li");
      li.textContent = `${entry.name} — ${Math.floor(entry.score)}`;
      leaderboardEl.appendChild(li);
    });
  }
  saveScore.addEventListener("click", ()=>{
    const name = (playerName.value || "Anonymous").slice(0,20);
    const list = loadLeaderboard();
    list.push({name, score: Math.floor(state.score)});
    // sort desc
    list.sort((a,b)=>b.score-a.score);
    saveLeaderboard(list.slice(0,50));
    renderLeaderboard();
    alert("Score saved to leaderboard!");
  });
  clearLeaderboard.addEventListener("click", ()=>{
    if(confirm("Clear leaderboard?")){ saveLeaderboard([]); renderLeaderboard(); }
  });

  // --------- Save / Reset ----------
  resetSave.addEventListener("click", ()=>{
    if(confirm("Reset your save (this will clear game progress but not the leaderboard)?")){
      localStorage.removeItem("ultimate_clicker_state");
      state = {...defaultState};
      updateUI();
    }
  });

  // --------- Hidden cat easter egg ----------
  let titleClicks = 0;
  title.addEventListener("click", ()=>{
    titleClicks++;
    if(titleClicks >= 7) revealCat();
    setTimeout(()=>{ titleClicks = Math.max(0, titleClicks-1); }, 2000);
  });

  // Also typing meow reveals cat
  let keyBuffer = "";
  window.addEventListener("keydown", (e)=>{
    keyBuffer += e.key.toLowerCase();
    if(keyBuffer.endsWith("meow")) revealCat();
    if(keyBuffer.length>20) keyBuffer = keyBuffer.slice(-20);
  });

  function revealCat(){
    hiddenCat.classList.add("show");
    // also add a fun cosmetic if not yet applied
    clickBtn.textContent = "Purr!";
    setTimeout(()=>{ clickBtn.textContent = "Click Me!"; }, 3000);
  }

  // small click animation
  function flashClickButton(){
    clickBtn.style.transform = "scale(0.98)";
    setTimeout(()=>{ clickBtn.style.transform = ""; }, 60);
  }

  // --------- Autosave and initial UI update ----------
  updateUI();
  renderLeaderboard();

  // occasionally autosave
  setInterval(saveState, 5000);

});
