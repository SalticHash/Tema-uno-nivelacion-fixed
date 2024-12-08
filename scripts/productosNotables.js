import { randomComplexExpression } from "../math.js";

// Vincular el botón para generar productos notables
document.getElementById('generarBtn').addEventListener('click', () => {
    const numTerminos = parseInt(document.getElementById('numTerminos').value, 10);
    const resultadoDiv = document.getElementById('resultado');

    if (!isNaN(numTerminos) && numTerminos > 0) {
        const expresion = randomComplexExpression(numTerminos); // Genera la expresión completa
        resultadoDiv.textContent = `Expresión generada: ${expresion}`;
        resultadoDiv.style.display = 'block';
    } else {
        resultadoDiv.textContent = "Por favor, introduce un número válido.";
        resultadoDiv.style.display = 'block';
    }
});
