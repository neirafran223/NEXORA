const formulario = document.querySelector('.formulario-contacto');
const inputs = formulario.querySelectorAll('input, textarea');

const expresiones = {
  empresa: /^[a-zA-ZÀ-ÿ0-9\s\.,-]{2,50}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  mensaje: /^.{10,1000}$/
};

const campos = {
  empresa: false,
  nombre: false,
  correo: false,
  mensaje: false
};

const validarFormulario = (e) => {
  const id = e.target.id;
  switch (id) {
    case "empresa":
      validarCampo(expresiones.empresa, e.target, 'empresa', "Nombre de empresa inválido.");
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, 'nombre', "Nombre inválido. Solo letras y espacios.");
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, 'correo', "Correo inválido. Ejemplo: nombre@dominio.com");
      break;
    case "mensaje":
      validarCampo(expresiones.mensaje, e.target, 'mensaje', "El mensaje debe tener al menos 10 caracteres.");
      break;
  }
};

const validarCampo = (expresion, input, campo, mensajeError) => {
  if (expresion.test(input.value.trim())) {
    input.setCustomValidity("");
    campos[campo] = true;
  } else {
    input.setCustomValidity(mensajeError);
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener('input', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  if (campos.empresa && campos.nombre && campos.correo && campos.mensaje) {
    alert("✅ Formulario enviado correctamente.");
    formulario.reset();
    inputs.forEach(input => input.setCustomValidity(""));
    Object.keys(campos).forEach(key => campos[key] = false);
  } else {
    alert("❌ Por favor revisa los campos con errores.");
  }
});
