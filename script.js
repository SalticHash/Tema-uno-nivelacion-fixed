function generarLiteralAleatorio() {
    const literales = ['x', 'y'];
    return literales[Math.floor(Math.random() * literales.length)];
}

function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1; // Números del 1 al 10
}

function generarTerminoAleatorio() {
    const coeficiente = generarNumeroAleatorio();
    const literal = generarLiteralAleatorio();
    return `${coeficiente}${literal}`;
}

function generarFormulaNotableSimple() {
    const formulas = [
        { formula: (a, b) => `(${a} + ${b})²`, peso: 1 },
        { formula: (a, b) => `(${a} - ${b})²`, peso: 1 },
        { formula: (a, b) => `(${a} + ${b})(${a} - ${b})`, peso: 1 },
        { formula: (a, b) => `(${a} + ${b})³`, peso: 1 },
        { formula: (a, b) => `(${a} - ${b})³`, peso: 3 },
        { formula: (a, b) => `(${a}³ + ${b})³`, peso: 3 },
        { formula: (a, b) => `(${a}³ - ${b})³`, peso: 3 }
    ];

    // Crear un arreglo expandido según los pesos
    const formulasExpandidas = formulas.flatMap(f => Array(f.peso).fill(f.formula));

    const a = generarTerminoAleatorio();
    const b = generarTerminoAleatorio();
    const formulaSeleccionada = formulasExpandidas[Math.floor(Math.random() * formulasExpandidas.length)];
    return formulaSeleccionada(a, b);
}

function generarOperacionAleatoria() {
    const operaciones = ['+', '-', '*'];
    return operaciones[Math.floor(Math.random() * operaciones.length)];
}

function generarExpresionCompleja(numTérminos) {
    let expresion = '';
    for (let i = 0; i < numTérminos; i++) {
        const termino = generarFormulaNotableSimple();
        expresion += termino;
        if (i < numTérminos - 1) {
            expresion += ` ${generarOperacionAleatoria()} `;
        }
    }
    return expresion;
}

document.getElementById('generarBtn').addEventListener('click', () => {
    const numTerminos = parseInt(document.getElementById('numTerminos').value, 10);
    const resultadoDiv = document.getElementById('resultado');

    if (!isNaN(numTerminos) && numTerminos > 0) {
        const expresion = generarExpresionCompleja(numTerminos);
        resultadoDiv.textContent = `Expresión generada: ${expresion}`;
        resultadoDiv.style.display = 'block';
    } else {
        resultadoDiv.textContent = "Por favor, introduce un número válido.";
        resultadoDiv.style.display = 'block';
    }
});