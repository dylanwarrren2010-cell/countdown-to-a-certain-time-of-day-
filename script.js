function updateCountdown() {
  const now = new Date();
  
  // Set target time today
  const target = new Date();
  target.setHours(14); // 2 PM
  target.setMinutes(13);
  target.setSeconds(0);
  
  // If target time already passed today, set for tomorrow
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }
  
  const diff = target - now;
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('countdown').textContent =
    `${hours}h ${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call
