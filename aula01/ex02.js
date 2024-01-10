// ex02.js
document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.getElementById('clock');
  
    function updateClock() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const day = now.toLocaleDateString('pt-BR', { weekday: 'long' });
      const date = now.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  
      // Saudação com base na hora
      let greeting;
      if (hours < 12) {
        greeting = 'Bom Dia!';
      } else if (hours < 18) {
        greeting = 'Boa Tarde!';
      } else {
        greeting = 'Boa Noite!';
      }
  
      // Atualiza o conteúdo do relógio
      clockElement.innerHTML = `
        <div>
          <h2>${greeting}</h2>
          <h4>${day}, ${date}</h4>
        </div>
        <div>
          <p>${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}</p>
        </div>
      `;
    }
  
    // Atualiza o relógio a cada segundo
    setInterval(updateClock, 1000);
  
    // Chama a função para exibir o relógio ao carregar a página
    updateClock();
  });
  