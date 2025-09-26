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

  // cosmetics by score
  cosmeticBtns.forEach(btn=>{
    const cost = Number(btn.dataset.cost || 0);
    const bought = btn.dataset.bought === "true";
    btn.disabled = bought || (state.score < cost);
  });

  // rebirth-only cosmetics
  rebirthOnlyBtns.forEach(btn=>{
    const rpcost = Number(btn.dataset.rpcost || 0);
    const bought = btn.dataset.bought === "true";
    btn.disabled = bought || (state.rebirthPoints < rpcost);
  });

  saveState();
}

// --------- Cosmetics purchase ----------
cosmeticBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const cost = Number(btn.dataset.cost || 0);
    if(state.score >= cost && btn.dataset.bought !== "true"){
      state.score -= cost;
      applyCosmetic(btn.dataset.type, btn.dataset.value);
      btn.dataset.bought = "true";
      updateUI();
    }
  });
});

rebirthOnlyBtns.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const rpcost = Number(btn.dataset.rpcost || 0);
    if(state.rebirthPoints >= rpcost && btn.dataset.bought !== "true"){
      state.rebirthPoints -= rpcost;
      applyCosmetic(btn.dataset.type, btn.dataset.value);
      btn.dataset.bought = "true";
      updateUI();
    }
  });
});
