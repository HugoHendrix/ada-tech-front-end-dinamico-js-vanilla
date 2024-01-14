function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form data
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const birthdate = document.getElementById("birthdate").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate each input
  validateField("name", validateName);
  validateField("phone", validatePhone);
  validateField("birthdate", validateBirthdate);
  validateField("email", validateEmail);
  validateField("password", validatePassword);

  // Display form data in Bootstrap Modal if all inputs are valid
  if (document.querySelectorAll(".is-invalid").length === 0) {
    const userDataModalBody = document.getElementById("userDataModalBody");
    userDataModalBody.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Data de Nascimento:</strong> ${birthdate}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Password:</strong> ${password}</p>
        `;
    // Show the Bootstrap Modal
    const userDataModal = new bootstrap.Modal(
      document.getElementById("userDataModal")
    );
    userDataModal.show();
  }
}

function validateField(fieldName, customValidation) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(fieldName + "Error");

  if (customValidation && !customValidation(field.value)) {
    errorElement.textContent = customValidationErrorMessage(fieldName);
    field.classList.add("is-invalid");
  } else if (!field.checkValidity()) {
    errorElement.textContent = "Campo obrigatório";
    field.classList.add("is-invalid");
  } else {
    errorElement.textContent = "";
    field.classList.remove("is-invalid");
  }
}

function clearError(fieldName) {
  const errorElement = document.getElementById(fieldName + "Error");
  errorElement.textContent = "";
  const field = document.getElementById(fieldName);
  field.classList.remove("is-invalid");
}

function validateName(value) {
  return value.length >= 3 && value.length <= 35;
}

function validatePhone(value) {
  // Validate if the phone has the format "XX XXXXX XXXX" (e.g., "17 99678 1133")
  const phoneRegex = /^\d{2} \d{5} \d{4}$/;
  return phoneRegex.test(value);
}

function validateBirthdate(value) {
  const birthdateYear = new Date(value).getFullYear();
  const currentYear = new Date().getFullYear();
  return currentYear - birthdateYear <= 120;
}

function validateEmail(value) {
  // Basic email validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function validatePassword(value) {
  // Validate if the password has at least 8 characters and contains both letters and numbers
  const hasMinLength = value.length >= 8;
  const hasLettersAndNumbers = /[a-zA-Z]/.test(value) && /\d/.test(value);
  return hasMinLength && hasLettersAndNumbers;
}

function customValidationErrorMessage(fieldName) {
  switch (fieldName) {
    case "name":
      return "O nome deve ter entre 3 e 35 caracteres.";
    case "phone":
      return "O telefone deve ter o formato XX XXXXX XXXX (ex: 17 99678 1133).";
    case "birthdate":
      return "A data de nascimento não pode ser maior do que 120 anos.";
    case "email":
      return "Formato de e-mail inválido.";
    case "password":
      return "A senha deve ter pelo menos 8 caracteres e conter letras e números.";
    default:
      return "Campo obrigatório";
  }
}
