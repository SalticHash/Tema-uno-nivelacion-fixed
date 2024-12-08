import { randomPolynomialDivision } from "../math.js"

// Vincular el botón para generar divisiones de polinomios
document.getElementById('generarDivisionesBtn').addEventListener('click', () => {
    const numEjemplos = parseInt(document.getElementById('numEjemplos').value, 10);
    const resultadoDiv = document.getElementById('resultadoDivisiones');

    if (!isNaN(numEjemplos) && numEjemplos > 0) {
        let divisiones = '';
        for (let i = 0; i < numEjemplos; i++) {
            divisiones += `Ejemplo ${i + 1}: ${randomPolynomialDivision()}<br>`;
        }
        resultadoDiv.innerHTML = divisiones;
        resultadoDiv.style.display = 'block';
    } else {
        resultadoDiv.textContent = "Por favor, introduce un número válido.";
        resultadoDiv.style.display = 'block';
    }
});