









function calculate() {

    const shape = document.getElementById('geo-options').value;
    let result = 'a';
    let resultp2 = 'A = ';


    switch(shape) {
        case 'rectangle':
            result = calcGroundArea(parseFloat(document.getElementById('a').value),parseFloat(document.getElementById('b').value));
            break;
        case 'square':
            const a = parseFloat(document.getElementById('quadrat-a').value);
            result = Math.pow(a, 2);
            break;
        /*case '4eck':
            const d1_4eck = parseFloat(document.getElementById('4eck-d1').value);
            const d2_4eck = parseFloat(document.getElementById('4eck-d2').value);
            const theta_4eck = parseFloat(document.getElementById('4eck-theta').value);
            const theta_radians = theta_4eck * (Math.PI / 180); // Konvertiere Winkel in Radianten
            result = (0.5 * d1_4eck * d2_4eck * Math.sin(theta_radians));
            resultp2 = 'A = ';
            break;*/
        case 'triangle':
            result = calcGroundArea(parseFloat(document.getElementById('a').value),parseFloat(document.getElementById('b').value), 0.5);
            break;

        case 'cube':
            result = Math.pow(parseFloat(document.getElementById('a').value), 3);
            break;
        case 'cuboid':
            result = calcGroundArea(parseFloat(document.getElementById('quader-a').value), parseFloat(document.getElementById('quader-b').value), parseFloat(document.getElementById('quader-c').value));
            break;
        case 'sphere':
            result = ((4/3) * Math.PI * Math.pow(parseFloat(document.getElementById('kugel-r').value), 3));
            break;
        case 'pyramid':
            const G_pyramide = parseFloat(document.getElementById('G').value);
            const h_pyramide = parseFloat(document.getElementById('h').value);
            result = ((1/3) * G_pyramide * h_pyramide);
            resultp2 = 'V = ';
            break;
        case 'tetraeder':
            const a_tetraeder = parseFloat(document.getElementById('a').value);
            result = ((1/3)* 0.5*g*h;
            resultp2 = 'V = ';
            break;
    }

    if (isNaN(result) || result<0) {
        result = 'Bitte geben Sie gültige Zahlen ein.';
    }
    if(shape == 'square' || shape == 'rectangle' || shape == 'triangle')  result = "A = " + result;
    else result = "V = " + result;
    document.getElementById('result').value = result;
}







function calcGroundArea(a, b, c) {
    let result = a * b;
    if(c) {
        result = c * result;
    }
    return result;
}