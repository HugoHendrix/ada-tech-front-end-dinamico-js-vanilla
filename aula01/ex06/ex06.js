

document.addEventListener('DOMContentLoaded', function () {
    let count = 0;
    const counter = document.getElementById('counter');
    const incrementButton = document.getElementById('incrementButton');
  
    incrementButton.addEventListener('click', function () {
      count++;
      counter.textContent = count;
    });
  });
