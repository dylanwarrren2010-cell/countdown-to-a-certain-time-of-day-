window.addEventListener("DOMContentLoaded", () => {
  let targetTime = null;
  const countdownEl = document.getElementById("countdown");
  const timePicker = document.getElementById("timePicker");
  const fontSizeInput = document.getElementById("fontSize");
  const fontColorInput = document.getElementById("fontColor");

  // ⏰ Pick target time
  timePicker.addEventListener("input", function() {
    if (this.value) {
      const [hours, minutes] = this.value.split(":").map(Number);
      targetTime = { hours, minutes };
    }
  });

  // 🔠 Live update font size
  fontSizeInput.addEventListener("input", () => {
    countdownEl.style.fontSize = fontSizeInput.value + "px";
  });

  // 🎨 Live update font color
  fontColorInput.addEventListener("input", () => {
    countdownEl.style.color = fontColorInput.value;
  });

  // ⏳ Countdown logic
  function updateCountdown() {
    if (!targetTime) {
      countdownEl.textContent = "Choose a time ⏰";
      return;
    }

    const now = new Date();
    const target = new Date();
    target.setHours(targetTime.hours, targetTime.minutes, 0, 0);

    // If target already passed today, set for tomorrow
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }

    const diff = target - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});

