// Función para generar un literal aleatorio
function generarLiteralAleatorio() {
    const literales = ['x', 'y'];
    return literales[Math.floor(Math.random() * literales.length)];
}

// Función para generar un número aleatorio entre 1 y 10
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1; // Números del 1 al 10
}

// Función para generar un término aleatorio (coeficiente y literal)
function generarTerminoAleatorio() {
    const coeficiente = generarNumeroAleatorio();
    const literal = generarLiteralAleatorio();
    return `${coeficiente}${literal}`;
}

// Función para generar una fórmula notable simple
function generarFormulaNotableSimple() {
    const formulas = [
        { formula: (a, b) => `(${a} + ${b})²`, peso: 3 },
        { formula: (a, b) => `(${a} - ${b})²`, peso: 3 },
        { formula: (a, b) => `(${a} + ${b})(${a} - ${b})`, peso: 2 },
        { formula: (a, b) => `(${a} + ${b})³`, peso: 2 },
        { formula: (a, b) => `(${a} - ${b})³`, peso: 2 },
        { formula: (a, b) => `(${a}³ + ${b}³)`, peso: 1 },
        { formula: (a, b) => `(${a}³ - ${b}³)`, peso: 1 }
    ];

    // Crear un arreglo expandido según los pesos
    const formulasExpandidas = formulas.flatMap(f => Array(f.peso).fill(f.formula));

    const a = generarTerminoAleatorio();
    const b = generarTerminoAleatorio();
    const formulaSeleccionada = formulasExpandidas[Math.floor(Math.random() * formulasExpandidas.length)];
    return formulaSeleccionada(a, b);
}

// Función para generar una operación aleatoria (+, -, *)
function generarOperacionAleatoria() {
    const operaciones = ['+', '-', '*'];
    return operaciones[Math.floor(Math.random() * operaciones.length)];
}

// Función para generar una expresión compleja combinando varias fórmulas notables
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

// Función para generar un término aleatorio de polinomio con exponentes formateados
function generarTerminoPolinomio(gradoMax) {
    const coeficiente = generarNumeroAleatorio(); // Reutiliza la función existente
    let grado = Math.floor(Math.random() * (gradoMax + 1)); // Grado aleatorio entre 0 y gradoMax

    // Si grado es 0, devolver solo el coeficiente (constante)
    if (grado === 0) {
        return `${coeficiente}`;
    }

    // Si grado es 1, devolver solo coeficiente con literal sin exponente
    if (grado === 1) {
        return `${coeficiente}x`;
    }

    // Para grados mayores, devolver con exponente formateado
    return `${coeficiente}x^${grado}`
        .replace(/\^2/g, '²')
        .replace(/\^3/g, '³')
        .replace(/\^4/g, '⁴')
        .replace(/\^5/g, '⁵');
}

// Función para generar un polinomio aleatorio con exponentes formateados
function generarPolinomio(gradoMax, numTerminos) {
    let polinomio = '';
    for (let i = 0; i < numTerminos; i++) {
        polinomio += (i === 0 ? '' : ' + ') + generarTerminoPolinomio(gradoMax);
    }
    return polinomio;
}

// Función para generar un ejemplo de división de polinomios con exponentes formateados
function generarDivisionPolinomios() {
    const gradoDividendo = Math.floor(Math.random() * 4) + 2; // Grado del dividendo (entre 2 y 5)
    const gradoDivisor = Math.floor(Math.random() * (gradoDividendo - 1)) + 1; // Grado del divisor (menor que el dividendo)
    const dividendo = generarPolinomio(gradoDividendo, gradoDividendo);
    const divisor = generarPolinomio(gradoDivisor, gradoDivisor);

    return `(${dividendo}) ÷ (${divisor})`;
}

// Función para generar múltiples ejemplos de división de polinomios
function generarDivisionesPolinomios(numEjemplos) {
    let divisiones = '';
    for (let i = 0; i < numEjemplos; i++) {
        divisiones += `Ejemplo ${i + 1}: ${generarDivisionPolinomios()}<br>`;
    }
    return divisiones;
}

// Event listeners para mostrar diferentes secciones
document.getElementById('productosNotablesBtn').addEventListener('click', () => {
    mostrarSeccion('productosNotables');
});

document.getElementById('divisionPolinomiosBtn').addEventListener('click', () => {
    mostrarSeccion('divisionPolinomios');
});

document.getElementById('volverMenuPrincipal1').addEventListener('click', () => {
    mostrarSeccion('menuPrincipal');
});

document.getElementById('volverMenuPrincipal2').addEventListener('click', () => {
    mostrarSeccion('menuPrincipal');
});

// Event listener para generar expresiones de productos notables
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

// Event listener para generar divisiones de polinomios
document.getElementById('generarDivisionesBtn').addEventListener('click', () => {
    const numEjemplos = parseInt(document.getElementById('numEjemplos').value, 10);
    const resultadoDiv = document.getElementById('resultadoDivisiones');

    if (!isNaN(numEjemplos) && numEjemplos > 0) {
        const divisiones = generarDivisionesPolinomios(numEjemplos);
        resultadoDiv.innerHTML = divisiones;
        resultadoDiv.style.display = 'block';
    } else {
        resultadoDiv.textContent = "Por favor, introduce un número válido.";
        resultadoDiv.style.display = 'block';
    }
});

// Función para mostrar y ocultar secciones
function mostrarSeccion(seccionId) {
    document.getElementById('menuPrincipal').style.display = 'none';
    document.getElementById('productosNotables').style.display = 'none';
    document.getElementById('divisionPolinomios').style.display = 'none';
    document.getElementById(seccionId).style.display = 'block';
        }
