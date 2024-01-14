// ex01.js
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("validation-form");

  form.addEventListener("submit", function (event) {
    // Impede o envio padrão do formulário
    event.preventDefault();

    // Realiza a validação dos campos
    if (validateForm()) {
      // Se a validação for bem-sucedida, você pode adicionar aqui o código para enviar o formulário
      alert("Formulário enviado com sucesso!");
      // Aqui você pode adicionar código para enviar o formulário, como form.submit()
    }
  });

  function validateForm() {
    // Obtém os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Validação de nome
    if (
      nome === "" ||
      containsSpecialCharacters(nome) ||
      containsNumbers(nome) ||
      nome.length < 3 ||
      nome.length > 50
    ) {
      alert(
        "Por favor, insira um nome válido (entre 3 e 50 caracteres e sem números ou caracteres especiais)."
      );
      return false;
    }

    // Validação de e-mail
    if (!verifyEmail()) {
      return false;
    }

    // Validação de mensagem
    if (mensagem === "" || mensagem.length < 10 || mensagem.length > 200) {
      alert(
        "Por favor, insira uma mensagem válida (entre 10 e 200 caracteres)."
      );
      return false;
    }

    // Se todas as validações passarem, retorna true
    return true;
  }

  const verifyEmail = () => {
    // Verifica se inputValue.email está definido
    const email = document.getElementById("email").value.trim();

    // Expressão regular para validar endereços de e-mail
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Verifica se o e-mail atende ao padrão da expressão regular
    if (!emailRegex.test(String(email).toLowerCase())) {
      // Configura um erro se o e-mail não for válido
      setFieldError("emailError", true);
      alert("Por favor, insira um e-mail válido.");
      return false;
    }

    // Limpa o erro se o e-mail for válido
    setFieldError("emailError", false);
    return true;
  };

  const containsSpecialCharacters = (text) => {
    const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
    return specialCharacterRegex.test(text);
  };

  const containsNumbers = (text) => {
    const numberRegex = /\d/;
    return numberRegex.test(text);
  };

  const setFieldError = (fieldName, isError) => {
    // Adicione lógica aqui para configurar o erro no campo especificado
  };
});
