
function onCalcBodyLoad() {
    document.getElementById('geo-options').addEventListener('change', showForm);
    document.getElementById('geo-options').value = 'rectangle';
    showCalcRectangle();
}


function showForm() {
    const shape = document.getElementById('geo-options').value;
    switch (shape) {
        case 'rectangle': showCalcRectangle(); break;
        case 'square': showCalcSquare(); break;
        case 'triangle': showCalcTriangle(); break;
        case 'circle': showCalcCircle(); break;
        case 'cube': showCalcCube(); break;
        case 'cuboid': showCalcCuboid(); break;
        case 'sphere': showCalcSphere();  break;
        case 'pyramid': showCalcPyramid(); break;
        case 'tetraeder': showCalcTetraeder(); break;
    }
}


function calculate() {

    const shape = document.getElementById('geo-options').value;
    let result = document.getElementById('result').value;
    let a, b, c;
    let isNormalCalculation = true;
    try {
        a = parseFloat(document.getElementById('input-a').value);
        b = parseFloat(document.getElementById('input-b').value);
        c = parseFloat(document.getElementById('input-c').value);
    } catch (error) {
        console.error('Error: ' + error);
        return;
    }
    if(a < 0 || b < 0 || c < 0) {
        alert('Bitte geben sie gültige Werte für die Berechnung ein');
        return;
    }

    // Calculate normally if all values are given
    switch(shape) {
        case 'rectangle':
            // If one value is missing, calculate the missing value (Simulate a XOR operation)
            if(xor(a,b) && result != 0) {
                isNormalCalculation = false;
                if(a == 0) a = result / b;
                else a = result / a;
            } else result = a * b;
            break;
        case 'square':
            if(a == 0 && result != 0) {
                isNormalCalculation = false;
                a = Math.sqrt(result);
            } else result = Math.pow(a, 2);
            break;
        case 'triangle':
            if(xor(a, b) && result != 0) {
                isNormalCalculation = false;
                if(a == 0) a = 2 * result / b;
                else b = 2 * result / a;
            } else result = a * b * 0.5;
            break;
        case 'circle':
            if(a == 0 && result != 0) {
                isNormalCalculation = false;
                a = Math.sqrt(result / Math.PI);
            } else result = Math.PI * Math.pow(a, 2);
            break;
        case 'cube':
            if(a == 0 && result != 0) {
                isNormalCalculation = false;
                a = Math.cbrt(result);
            } else result = Math.pow(a, 3);
            break;
        case 'cuboid':
            if(xor(a,b,c) && result != 0) {
                isNormalCalculation = false;
                if(a == 0) a = result / (b * c);
                else if(b == 0) b = result / (a * c);
                else c = result / (a * b);
            } else result = a * b * c;
            break;
        case 'sphere':
            if(a == 0 && result != 0) {
                isNormalCalculation = false;
                a = Math.cbrt((3/4) * (result / Math.PI));
            } else result = ((4/3) * Math.PI * Math.pow(a, 3));
            break;
        case 'pyramid':
            if(xor(a,b,c) && result != 0) {
                isNormalCalculation = false;
                if(a == 0) a = (3 * result) / (b * c);
                else if(b == 0) b = (3 * result) / (a * c);
                else c = (3 * result) / (a * b);
            } else result = ((1/3) * (a * b) * c);
            break;
        case 'tetraeder':
            if(xor(a,b,c) && result != 0) {
                isNormalCalculation = false;
                if(a == 0) a = (3 * result) / (b * c);
                else if(b == 0) b = (3 * result) / (a * c);
                else c = (3 * result) / (a * b);
            } else result = (1/3) * (0.5 * a * b) * c;
            break;
    }
    if(isNormalCalculation) document.getElementById('result').value = Math.abs(result);
    else {
        document.getElementById('input-a').value = a;
        document.getElementById('input-b').value = b;
        document.getElementById('input-c').value = c; 
    }
}


function showCalcSquare() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Seitenlänge a';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mi>a</mi><mo>&middot</mo><mi>a</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
}
function showCalcRectangle() {
    showSpecificInputs(true, true);
    document.getElementById('label-a').innerText = 'Seitenlänge a';
    document.getElementById('label-b').innerText = 'Seitenlänge b';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mi>a</mi><mo>&middot</mo><mi>b</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
}
function showCalcTriangle() {
    showSpecificInputs(true, true);
    document.getElementById('label-a').innerText = 'Grundseite a';
    document.getElementById('label-b').innerText = 'Höhe h';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>&middot</mo><mi>a</mi><mo>&middot</mo><mi>h</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
}
function showCalcCircle() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Radius r';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mi>π</mi><mo>&middot</mo><msup><mi>r</mi><mn>2</mn></msup></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
}
function showCalcCube() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Kantenlänge a';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><msup><mi>a</mi><mn>3</mn></msup></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
}
function showCalcCuboid() {
    showSpecificInputs(true, true, true);
    document.getElementById('label-a').innerText = 'Kantenlänge a';
    document.getElementById('label-b').innerText = 'Kantenlänge b';
    document.getElementById('label-c').innerText = 'Kantenlänge c';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mi>a</mi><mo>&middot</mo><mi>b</mi><mo>&middot</mo><mi>c</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
}
function showCalcSphere() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Radius r';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mfrac><mn>4</mn><mn>3</mn></mfrac><mo>&middot</mo><mi>π</mi><mo>&middot</mo><msup><mi>r</mi><mn>3</mn></msup></math>';
}
function showCalcPyramid() {
    showSpecificInputs(true, true, true);
    document.getElementById('label-a').innerText = 'Grundseite a';
    document.getElementById('label-b').innerText = 'Grundseite b';
    document.getElementById('label-c').innerText = 'Höhe h';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mo>&middot</mo><mi>a</mi><mo>&middot</mo><mi>b</mi><mo>&middot</mo><mi>h</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
}

function showCalcTetraeder() {
    showSpecificInputs(true, true, true);
    document.getElementById('label-a').innerText = 'Kante Grundfläche a';
    document.getElementById('label-b').innerText = '"Höhe" Grunfläche b';
    document.getElementById('label-c').innerText = 'Höhe h';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mo>&middot</mo><mrow><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>&middot</mo><mi>a</mi><mo>&middot</mo><mi>b</mi><mo>)</mo></mrow><mo>&middot</mo><mi>h</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
}

function showSpecificInputs(input1 = false,input2 = false,input3 = false) {
    let a = document.getElementById('input-a');
    let b = document.getElementById('input-b');
    let c = document.getElementById('input-c');
    a.style.display = input1? 'block' : 'none';
    a.value = input1? 0: '';
    b.style.display = input2? 'block' : 'none';
    b.value = input2? 0: '';
    c.style.display = input3? 'block' : 'none';
    c.value = input3? 0: '';
    
    document.getElementById('label-a').style.display = input1? 'block' : 'none';
    document.getElementById('label-b').style.display = input2? 'block' : 'none';
    document.getElementById('label-c').style.display = input3? 'block' : 'none';    

    document.getElementById('result').value = '';
}

function xor(a = undefined, b = undefined, c = undefined) {
    let xor// = (a === 0 && b !== 0 && c !== 0) || (a !== 0 && b === 0 && c !== 0) || (a !== 0 && b !== 0 && c === 0);
    xor = (isEmpty(a) && !isEmpty(b) && !isEmpty(c)) || (!isEmpty(a) && isEmpty(b) && !isEmpty(c)) || (!isEmpty(a) && !isEmpty(b) && isEmpty(c));
    return xor;
}
function isEmpty(value) {
    return value === 0 || value === '';
}