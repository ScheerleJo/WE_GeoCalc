/**
 * Expands the page and shows all information of the selected geometry
 * @param  {String} geometry - The geometry to show information of
 */
function showInformation(geometry) {
    let section = document.getElementById('info-' + geometry);
    hideEverythingElse(geometry);
    section.style.display = 'block';
    section.classList.add('active-info');
    document.getElementById('button-' + geometry).classList.add('active-button');
    document.getElementById('reset-highlights').style.display = 'block';
}

/**
 * Hides all information of every figure except the selected geometry
 * @param  {string} geometry - The geometry to to still be visible
 */
function hideEverythingElse(geometry) {
    let sections = document.getElementsByClassName('info');
    for (let i = 0; i < sections.length; i++) {
        if(sections[i].id !== 'info-' + geometry) {
            sections[i].style.display = 'none';
            sections[i].classList.remove('active-info');
        }
    }
    let buttons = document.getElementsByClassName('info-button');
    for (let i = 0; i < buttons.length; i++) {
        if(buttons[i].id !== 'button-' + geometry) {
            buttons[i].classList.remove('active-button');
        }
    }
}
/**
 * Hides all borders of the information sections in ```formulas.html```
 */
function hideBorders(){
    let sections = document.getElementsByClassName('info');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active-info');
        sections[i].style.display = 'none';
    }
    let buttons = document.getElementsByClassName('info-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active-button');
    }
    document.getElementById('formulas-2d').classList.remove('highlight');
    document.getElementById('formulas-3d').classList.remove('highlight');
    document.getElementById('reset-highlights').style.display = 'none';
}

/**
 * Highlights the 2D formulas in ```formulas.html``` with a border around the article
 */
function highlight2D (){
    document.getElementById('formulas-2d').classList.add('highlight');
}
/**
 * Highlights the 3D formulas in ```formulas.html``` with a border around the article
 */
function highlight3D (){
    document.getElementById('formulas-3d').classList.add('highlight');
}


/**
 * Function is activated when Body is loaded. It hides all information sections and starts Listening on KeyDown events
 */
function loadBody(){
    hideEverythingElse('none');
    listenOnKeyDown();
    document.getElementById('reset-highlights').style.display = 'none';
}


/**
 * Function listens to KeyDown events and triggers when the 'k' key is pressed.
 */
function listenOnKeyDown() {
    console.log('Listening to keydown events');
    document.body.addEventListener('keydown', function(event) {
        if(event.key === 'k' || event.key === 'K') {
            hideEverythingButSphere();
            // Add a button to restore/relaod the page
            if(document.getElementById('formula-buttons').childElementCount === 1) {
                button = document.createElement('button');
                button.appendChild(document.createTextNode('Wiederherstellen'));
                button.addEventListener('click', () => window.location.reload());
                document.getElementById('formula-buttons').appendChild(button);
            }
        }
    });
}

/**
 * Deletes all information sections except the sphere and shows the information of the sphere 
 */
function hideEverythingButSphere() {
    console.log("Delete everything.... You better run!");;
    document.querySelectorAll("section.info, button.info-button").forEach(element => {if(!element.id.includes('-sphere')) element.remove()});
    Array.from(document.getElementsByTagName('h2')).forEach(h2 => h2.remove());
    document.querySelector("hr").remove();
    showInformation('sphere');
}

/**
 * Function to show the calculator page with speficied geometry
 * @param {String} geometry - The geometry to show the calculator of
 */
function showCalc(geometry) {
    let data = {
        selected: geometry,
    }
    localStorage.setItem('setSelected', JSON.stringify(data));
    window.location.href = 'calculator.html';
}