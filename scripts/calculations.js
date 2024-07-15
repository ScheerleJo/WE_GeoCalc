/**
 * This script provides the functionality to calculate the area or volume of different shapes.
 */


/**
 * Adds an event listener to the dropdown menu to show the calculation form based on the selected shape.
 * Sets the default value of the dropdown menu to 'rectangle' and shows the calculation form for a rectangle.
 * Calls the function to show the calculation form.
 * Tries to retrieve the selected shape from the local storage and shows the form if it exists.
 * @see showForm
*/
function onCalcBodyLoad() {
    document.getElementById('geo-options').addEventListener('change', ()=> showForm());
    let data = localStorage.getItem('setSelected');
    if (data){
        data = JSON.parse(data).selected;
        localStorage.removeItem('setSelected');
        showForm(data);
        document.getElementById('geo-options').value = data;
    } else {
        showForm('rectangle');
        document.getElementById('geo-options').value = 'rectangle';
    }
}

/**
 * Shows the calculation form based on the selected shape in the dropdown menu.
 * @param {string} geometry optional parameter to set the shape specifically
*/
function showForm(geometry = undefined) {
    const shape = geometry || document.getElementById('geo-options').value;
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

/**
 * Calculates the area or volume of a shape based on the given values.
 * The calculation is based on the selected shape in the dropdown menu.
 * The function will calculate the missing value if one of the values is missing.
 */
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
        return; // Exit the function if an error occured while parsing the values
    }
    if(a < 0 || b < 0 || c < 0) {
        alert('Bitte geben sie gültige Werte für die Berechnung ein');
        return; // Exit the function if the values are invalid
    }
    if(isNaN(a)) a = 0;
    if(isNaN(b)) b = 0;
    if(isNaN(c)) c = 0;

    // Calculate normally if all values are given
    switch(shape) {
        case 'rectangle':
            // If one value is missing, calculate the missing value (Simulate a XOR operation)
            if(xor(result, a, b)) {
                isNormalCalculation = false;
                if(a == 0) a = result / b;
                else b = result / a;
            } else result = a * b;
            break;
        case 'square':
            if(xor(result, a)) {
                isNormalCalculation = false;
                a = Math.sqrt(result);
            } else result = Math.pow(a, 2);
            break;
        case 'triangle':
            if(xor(result, a, b)) {
                isNormalCalculation = false;
                if(a == 0) a = 2 * result / b;
                else b = 2 * result / a;
            } else result = a * b * 0.5;
            break;
        case 'circle':
            if(xor(result, a)) {
                isNormalCalculation = false;
                a = Math.sqrt(result / Math.PI);
            } else result = Math.PI * Math.pow(a, 2);
            break;
        case 'cube':
            if(xor(result, a)) {
                isNormalCalculation = false;
                a = Math.cbrt(result);
            } else result = Math.pow(a, 3);
            break;
        case 'cuboid':
            if(xor(result, a, b, c)) {
                isNormalCalculation = false;
                if(a == 0) a = result / (b * c);
                else if(b == 0) b = result / (a * c);
                else c = result / (a * b);
            } else result = a * b * c;
            break;
        case 'sphere':
            if(xor(result, a)) {
                isNormalCalculation = false;
                a = Math.cbrt((3/4) * (result / Math.PI));
            } else result = ((4/3) * Math.PI * Math.pow(a, 3));
            break;
        case 'pyramid':
            if(xor(result, a, b, c)) {
                isNormalCalculation = false;
                if(a == 0) a = (3 * result) / (b * c);
                else if(b == 0) b = (3 * result) / (a * c);
                else c = (3 * result) / (a * b);
            } else result = ((1/3) * (a * b) * c);
            break;
        case 'tetraeder':
            if(xor(result, a, b, c)) {
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

/**
 * Shows the Input-Boxes to calculate the area of a square
 */
function showCalcSquare() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Seitenlänge a';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mi>a</mi><mo>&middot</mo><mi>a</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
    document.getElementById('img-geometry').setAttribute('src', '../assets/2D/square.png');
}

/**
 * Shows the Input-Boxes to calculate the area of a rectangle
*/
function showCalcRectangle() {
    showSpecificInputs(true, true);
    document.getElementById('label-a').innerText = 'Seitenlänge a';
    document.getElementById('label-b').innerText = 'Seitenlänge b';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mi>a</mi><mo>&middot</mo><mi>b</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
    document.getElementById('img-geometry').setAttribute('src', '../assets/2D/rectangle.png');
}

/**
 * Shows the Input-Boxes to calculate the area of a triangle
*/
function showCalcTriangle() {
    showSpecificInputs(true, true);
    document.getElementById('label-a').innerText = 'Grundseite a';
    document.getElementById('label-b').innerText = 'Höhe h';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>&middot</mo><mi>a</mi><mo>&middot</mo><mi>h</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
    document.getElementById('img-geometry').setAttribute('src', '../assets/2D/triangle.png');
}

/**
 * Shows the Input-Boxes to calculate the area of a circle
*/
function showCalcCircle() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Radius r';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>A</mi><mo>=</mo><mi>π</mi><mo>&middot</mo><msup><mi>r</mi><mn>2</mn></msup></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis A';
    document.getElementById('img-geometry').setAttribute('src', '../assets/2D/circle.png');
}

/**
 * Shows the Input-Boxes to calculate the volume of a cube
*/
function showCalcCube() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Kantenlänge a';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><msup><mi>a</mi><mn>3</mn></msup></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
    document.getElementById('img-geometry').setAttribute('src', '../assets/3D/cube.png');
}

/**
 * Shows the Input-Boxes to calculate the volume of a cuboid
*/
function showCalcCuboid() {
    showSpecificInputs(true, true, true);
    document.getElementById('label-a').innerText = 'Kantenlänge a';
    document.getElementById('label-b').innerText = 'Kantenlänge b';
    document.getElementById('label-c').innerText = 'Kantenlänge c';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mi>a</mi><mo>&middot</mo><mi>b</mi><mo>&middot</mo><mi>c</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
    document.getElementById('img-geometry').setAttribute('src', '../assets/3D/cuboid.png');
}

/**
 * Shows the Input-Boxes to calculate the volume of a sphere
*/
function showCalcSphere() {
    showSpecificInputs(true);
    document.getElementById('label-a').innerText = 'Radius r';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mfrac><mn>4</mn><mn>3</mn></mfrac><mo>&middot</mo><mi>π</mi><mo>&middot</mo><msup><mi>r</mi><mn>3</mn></msup></math>';
    document.getElementById('img-geometry').setAttribute('src', '../assets/3D/sphere.png');
}

/**
 * Shows the Input-Boxes to calculate the volume of a pyramid
*/
function showCalcPyramid() {
    showSpecificInputs(true, true, true);
    document.getElementById('label-a').innerText = 'Grundseite a';
    document.getElementById('label-b').innerText = 'Grundseite b';
    document.getElementById('label-c').innerText = 'Höhe h';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mo>&middot</mo><mi>a</mi><mo>&middot</mo><mi>b</mi><mo>&middot</mo><mi>h</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
    document.getElementById('img-geometry').setAttribute('src', '../assets/3D/pyramid.png');
}
/**
 * Shows the Input-Boxes to calculate the volume of a tetraeder
*/
function showCalcTetraeder() {
    showSpecificInputs(true, true, true);
    document.getElementById('label-a').innerText = 'Kante Grundfläche a';
    document.getElementById('label-b').innerText = '"Höhe" Grunfläche b';
    document.getElementById('label-c').innerText = 'Höhe h';
    document.getElementById('formula-text').innerHTML = '<math xmlns = "http://www.w3.org/1998/Math/MathML"><mi>V</mi><mo>=</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mo>&middot</mo><mrow><mo>(</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mo>&middot</mo><mi>a</mi><mo>&middot</mo><mi>b</mi><mo>)</mo></mrow><mo>&middot</mo><mi>h</mi></math>';
    document.getElementById('label-result').innerText = 'Ergebnnis V';
    document.getElementById('img-geometry').setAttribute('src', '../assets/3D/tetraeder.png');
}

/**
 * Shows the specific inputs for the calculation and hides the others.
 * Parameters are optional and default to false to hide all inputs. If true, the input will be shown.
 * @param {boolean} input1 true if input 1 should be visible
 * @param {boolean} input2 true if input 2 should be visible
 * @param {boolean} input3 true if input 3 should be visible
 */
function showSpecificInputs(input1 = false,input2 = false,input3 = false) {
    let a = document.getElementById('input-a');
    let b = document.getElementById('input-b');
    let c = document.getElementById('input-c');
    a.style.display = input1? 'block' : 'none';
    a.value = '';
    b.style.display = input2? 'block' : 'none';
    b.value = '';
    c.style.display = input3? 'block' : 'none';
    c.value = '';
    
    document.getElementById('label-a').style.display = input1? 'block' : 'none';
    document.getElementById('label-b').style.display = input2? 'block' : 'none';
    document.getElementById('label-c').style.display = input3? 'block' : 'none';    

    document.getElementById('result').value = '';
}

/**
 * Adds XOR functionality to JS.
 * @param {number} a input a
 * @param {number} b input b
 * @param {number} c input c
 * @param {number} result input result
 * @returns {boolean} true if one value is missing and the result is given
 */
function xor(result = undefined, a = undefined, b = undefined, c = undefined) {
    return ((isEmpty(a) && !isEmpty(b) && !isEmpty(c) && !isEmpty(result)) || (!isEmpty(a) && isEmpty(b) && !isEmpty(c) && !isEmpty(result)) || (!isEmpty(a) && !isEmpty(b) && isEmpty(c) && !isEmpty(result)));
}
/**
 * Adds isEmpty functionality to JS. Checks if a value is 0 or an empty string.
 * @param {*} value 
 * @returns {boolean} true if the value is 0 or an empty string
 */
function isEmpty(value) {
    return value === 0 || value === '';
}