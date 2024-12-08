
// [min, max)
function randfRange(min, max) {
    return Math.random() * (max - min) + min;
}

// [min, max]
function randiRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomElement(array) {
    return array[randiRange(0, array.length - 1)]
}

const operations = {
    DIVISION: '÷',
    MULTIPLICATION: '·',
    ADITION: '+',
    SUBSTRACTION: '−',
    SUPERSCRIPT_SUBSTRACTION: '⁻'
}
const exponents = "⁰¹²³⁴⁵⁶⁷⁸⁹"
function getExponent(exponent) {
    let exponentString = ""
    if (exponent === 0) return exponents[0]
    if (exponent === 1) return ''

    const exponentSign = Math.sign(exponent)
    exponent = Math.abs(exponent)
    
    // Get every digit in reverse order
    while (exponent !== 0) {
        let digit = exponent % 10
        exponentString = exponents[digit] + exponentString 
        exponent /= 10
        exponent = Math.trunc(exponent)
    }

    if (exponentSign == -1)
        exponentString = operations.SUPERSCRIPT_SUBSTRACTION + exponentString

    return exponentString
}

// Función para generar un término aleatorio (coeficiente y literal)
function randomLiteral() {
    const literals = ['x', 'y'];
    return randomElement(literals);
}

function randomNumber() {
    return randiRange(1, 10); // Números del 1 al 10
}

function randomTerm() {
    const coefficient = randomNumber();
    const literal = randomLiteral();
    return `${coefficient}${literal}`;
}

// Función para geuunerar productos notables
function randomSimpleAlgebraicIdentity() {
    const formulas = [
        { formula: (a, b) => `(${a} + ${b})²`, weight: 5 },
        { formula: (a, b) => `(${a} - ${b})²`, weight: 5 },
        { formula: (a, b) => `(${a} + ${b})(${a} - ${b})`, weight: 3 },

        { formula: (a, b) => `(${a} - ${b})³`, weight: 1 },
        { formula: (a, b) => `(${a} + ${b})³`, weight: 2 },
    ];
    
    const weightedFormulasArray = formulas.flatMap(f => Array(f.weight).fill(f.formula));
    const a = randomTerm();
    const b = randomTerm();
    const selectedFormula = randomElement(weightedFormulasArray);

    return selectedFormula(a, b);
}

// Función para generar una expresión compleja con varios términos
export function randomComplexExpression(termAmount) {
    let expression = '';
    for (let i = 0; i < termAmount; i++) {
        const term = randomSimpleAlgebraicIdentity();
        expression += term;
        if (i < termAmount - 1) {
            expression += ' + ';
        }
    }
    return expression;
}

// Función para generar un término de polinomio, con el cambio de sintaxis para grados
function randomPolynomialTerm(maxExponent) {
    const coefficient = randomNumber();
    const exponentNumber = randiRange(1, maxExponent);  // Grado aleatorio entre 1 y gradoMax
    const exponent = getExponent(exponentNumber);
    return `${coefficient}x${exponent}`;
}

// Función para generar un polinomio aleatorio
function randomPolynomial(maxExponent, termAmount) {
    let polynomial = '';
    for (let i = 0; i < termAmount; i++) {
        polynomial += (i === 0 ? '' : ' + ') + randomPolynomialTerm(maxExponent - i);
    }
    return polynomial;
}

// Función para generar una división de polinomios
export function randomPolynomialDivision() {
    const dividendExponent = randiRange(2, 6);
    const divisorExponent = randiRange(1, dividendExponent);
    const dividend = randomPolynomial(dividendExponent, dividendExponent);
    const divisor = randomPolynomial(divisorExponent, divisorExponent);

    return `(${dividend}) ÷ (${divisor})`;
}