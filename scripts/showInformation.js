function showInformation(geometry) {
    let section = document.getElementById('info-' + geometry);
    hideEverythingElse(geometry);
    section.style.display = 'block';
    section.classList.add('active-info');
    document.getElementById('button-' + geometry).classList.add('active-button');
    document.getElementById('reset-highlights').style.display = 'block';
}
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

function highlight2D (){
    document.getElementById('formulas-2d').classList.add('highlight');
}
function highlight3D (){
    document.getElementById('formulas-3d').classList.add('highlight');
}



function loadBody(){
    hideEverythingElse('none');
    listenOnKeyDown();
    document.getElementById('reset-highlights').style.display = 'none';
}


function listenOnKeyDown() {
    console.log('Listening to keydown events');
    document.body.addEventListener('keydown', function(event) {
        if(event.key === 'k' || event.key === 'K') {
            hideEverythingButSphere();
            if(document.getElementById('formula-buttons').childElementCount === 1) {
                button = document.createElement('button');
                button.appendChild(document.createTextNode('Restore'));
                button.addEventListener('click', restoreEverything);
                document.getElementById('formula-buttons').appendChild(button);
            }
        }
    });
}

function hideEverythingButSphere() {
    console.log("Delete everything.... You better run!");;
    document.querySelectorAll("section.info, button.info-button").forEach(element => {if(!element.id.includes('-sphere')) element.remove()});
    Array.from(document.getElementsByTagName('h2')).forEach(h2 => h2.remove());
    document.querySelector("hr").remove();
    showInformation('sphere');
}

function restoreEverything() { window.location.reload();}
