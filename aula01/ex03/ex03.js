// ex03.js
document.addEventListener('DOMContentLoaded', function () {
    const themeButton = document.getElementById('themeButton');
    const themedElements = document.querySelector('.themed-elements');
  
    themeButton.addEventListener('click', function () {
      toggleTheme();
    });
  
    function toggleTheme() {
      // Adiciona ou remove a classe dark-theme no corpo da página
      document.body.classList.toggle('dark-theme');
  
      // Adiciona ou remove a borda e a cor de fundo nos elementos temáticos
      themedElements.classList.toggle('dark-theme');
    }
  });
  