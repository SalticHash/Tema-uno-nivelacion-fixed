// Función para generar un término aleatorio (coeficiente y literal)
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

// Función para geuunerar productos notables
function generarFormulaNotableSimple() {
    const formulas = [
        { formula: (a, b) => `(${a} + ${b})²`, peso: 5 },
        { formula: (a, b) => `(${a} - ${b})²`, peso: 5 },
        { formula: (a, b) => `(${a} + ${b})(${a} - ${b})`, peso: 3 },
        { formula: (a, b) => `(${a} + ${b})³`, peso: 1 },
        { formula: (a, b) => `(${a} - ${b})³`, peso: 1 },
        { formula: (a, b) => `(${a} + ${b})³`, peso: 1 },
    ];

    const formulasExpandidas = formulas.flatMap(f => Array(f.peso).fill(f.formula));

    const a = generarTerminoAleatorio();
    const b = generarTerminoAleatorio();
    const formulaSeleccionada = formulasExpandidas[Math.floor(Math.random() * formulasExpandidas.length)];
    return formulaSeleccionada(a, b);
}

// Función para generar una expresión compleja con varios términos
function generarExpresionCompleja(numTerminos) {
    let expresion = '';
    for (let i = 0; i < numTerminos; i++) {
        const termino = generarFormulaNotableSimple();
        expresion += termino;
        if (i < numTerminos - 1) {
            expresion += ' + ';
        }
    }
    return expresion;
}

// Función para generar un término de polinomio, con el cambio de sintaxis para grados
function generarTerminoPolinomio(gradoMax) {
    const coeficiente = generarNumeroAleatorio();
    const grado = Math.floor(Math.random() * gradoMax) + 1;  // Grado aleatorio entre 1 y gradoMax

    // Mostrar el término con el grado adecuado
    if (grado === 1) {
        return `${coeficiente}x`;  // Para grado 1, no mostrar el exponente
    }

    if (grado === 2) {
        return `${coeficiente}x²`; // Exponente 2
    }

    if (grado === 3) {
        return `${coeficiente}x³`; // Exponente 3
    }

    if (grado === 4) {
        return `${coeficiente}x⁴`; // Exponente 4
    }
}

// Función para generar un polinomio aleatorio
function generarPolinomio(gradoMax, numTerminos) {
    let polinomio = '';
    for (let i = 0; i < numTerminos; i++) {
        polinomio += (i === 0 ? '' : ' + ') + generarTerminoPolinomio(gradoMax - i);
    }
    return polinomio;
}

// Función para generar una división de polinomios
function generarDivisionPolinomios() {
    const gradoDividendo = Math.floor(Math.random() * 4) + 2;
    const gradoDivisor = Math.floor(Math.random() * (gradoDividendo - 1)) + 1;
    const dividendo = generarPolinomio(gradoDividendo, gradoDividendo);
    const divisor = generarPolinomio(gradoDivisor, gradoDivisor);

    return `(${dividendo}) ÷ (${divisor})`;
}

// Mostrar y ocultar secciones
function mostrarSeccion(seccionId) {
    const secciones = [
        'menuPrincipal', 
        'generarProblemas', 
        'productosNotables', 
        'divisionPolinomios',
        'temasFisica', 
        'temasQuimica', 
        'temasBiologia', 
        'temasMatematicas'
    ];

    secciones.forEach(id => {
        document.getElementById(id).style.display = (id === seccionId) ? 'block' : 'none';
    });
}

// Eventos para el menú principal
document.getElementById('carpetasPadrinosBtn').addEventListener('click', () => {
    alert('Sección Carpetas Padrinos (pendiente de implementar).');
});

document.getElementById('generarProblemasBtn').addEventListener('click', () => {
    mostrarSeccion('generarProblemas');
});

document.getElementById('temasFisicaBtn').addEventListener('click', () => {
    mostrarSeccion('temasFisica');
});

document.getElementById('temasQuimicaBtn').addEventListener('click', () => {
    mostrarSeccion('temasQuimica');
});

document.getElementById('temasBiologiaBtn').addEventListener('click', () => {
    mostrarSeccion('temasBiologia');
});

document.getElementById('temasMatematicasBtn').addEventListener('click', () => {
    mostrarSeccion('temasMatematicas');
});

// Eventos para volver al menú principal desde otras secciones
[
    'volverMenuPrincipalGenerar', 
    'volverMenuPrincipalFisica', 
    'volverMenuPrincipalQuimica',
    'volverMenuPrincipalBiologia', 
    'volverMenuPrincipalMatematicas', 
    'volverMenuPrincipal1', 
    'volverMenuPrincipal2'
].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        mostrarSeccion('menuPrincipal');
    });
});

// Vincular el botón para generar productos notables
document.getElementById('generarBtn').addEventListener('click', () => {
    const numTerminos = parseInt(document.getElementById('numTerminos').value, 10);
    const resultadoDiv = document.getElementById('resultado');

    if (!isNaN(numTerminos) && numTerminos > 0) {
        const expresion = generarExpresionCompleja(numTerminos); // Genera la expresión completa
        resultadoDiv.textContent = `Expresión generada: ${expresion}`;
        resultadoDiv.style.display = 'block';
    } else {
        resultadoDiv.textContent = "Por favor, introduce un número válido.";
        resultadoDiv.style.display = 'block';
    }
});

// Vincular el botón para generar divisiones de polinomios
document.getElementById('generarDivisionesBtn').addEventListener('click', () => {
    const numEjemplos = parseInt(document.getElementById('numEjemplos').value, 10);
    const resultadoDiv = document.getElementById('resultadoDivisiones');

    if (!isNaN(numEjemplos) && numEjemplos > 0) {
        let divisiones = '';
        for (let i = 0; i < numEjemplos; i++) {
            divisiones += `Ejemplo ${i + 1}: ${generarDivisionPolinomios()}<br>`;
        }
        resultadoDiv.innerHTML = divisiones;
        resultadoDiv.style.display = 'block';
    } else {
        resultadoDiv.textContent = "Por favor, introduce un número válido.";
        resultadoDiv.style.display = 'block';
    }
});

// Vincular botones para las secciones de Productos Notables y División de Polinomios
document.getElementById('productosNotablesBtn').addEventListener('click', () => {
    mostrarSeccion('productosNotables');
});

document.getElementById('divisionPolinomiosBtn').addEventListener('click', () => {
    mostrarSeccion('divisionPolinomios');
});
