const formulario = document.getElementById('register');
const inputs = document.querySelectorAll('#register input');

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^.{4,12}$/
};

const campos = {
  nombre: false,
  apellido: false,
  correo: false,
  password: false
};

const validarFormulario = (e) => {
  const input = e.target;
  const placeholder = input.placeholder;

  switch (placeholder) {
    case "Nombre":
      validarCampo(expresiones.nombre, input, 'nombre', "El nombre solo debe contener letras y espacios.");
      break;
    case "Apellido":
      validarCampo(expresiones.nombre, input, 'apellido', "El apellido solo debe contener letras y espacios.");
      break;
    case "Correo electronico":
      validarCampo(expresiones.correo, input, 'correo', "Correo inválido. Ej: ejemplo@correo.com");
      break;
    case "Contraseña":
      validarCampo(expresiones.password, input, 'password', "La contraseña debe tener entre 4 y 12 caracteres.");
      validarPassword2();
      break;
    case "Repetir contraseña":
      validarPassword2();
      break;
  }
};

const validarCampo = (expresion, input, campo, mensajeError) => {
  if (expresion.test(input.value)) {
    input.setCustomValidity("");
    campos[campo] = true;
  } else {
    input.setCustomValidity(mensajeError); // Muestra el mensaje
    campos[campo] = false;
  }
};

const validarPassword2 = () => {
  const password1 = document.querySelector('input[placeholder="Contraseña"]');
  const password2 = document.querySelector('input[placeholder="Repetir contraseña"]');

  if (password1.value !== password2.value) {
    password2.setCustomValidity("Las contraseñas no coinciden.");
    campos['password'] = false;
  } else {
    password2.setCustomValidity("");
    campos['password'] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener('input', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (campos.nombre && campos.apellido && campos.correo && campos.password) {
    alert('Formulario enviado correctamente');
    formulario.reset();
    inputs.forEach(input => input.setCustomValidity(""));
  } else {
    alert('Revisa los campos marcados. Hay errores por corregir.');
  }
});