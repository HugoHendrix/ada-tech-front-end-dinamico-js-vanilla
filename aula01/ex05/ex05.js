// ex05.js

document.addEventListener('DOMContentLoaded', function () {
    let clickCount = 0;
    const clickContainer = document.getElementById('clickContainer');
    const clickCounter = document.getElementById('clickCounter');
  
    clickContainer.addEventListener('click', function () {
      clickCount++;
      clickCounter.textContent = clickCount;
    });
  });
  