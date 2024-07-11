function showInformation(geometry) {
    let section = document.getElementById('info-' + geometry);
    hideEverythingElse(geometry);
    section.style.display = 'block';
    section.classList.add('active-info');
    document.getElementById('button-' + geometry).classList.add('active-button');
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
}





function loadBody(){
    hideEverythingElse('none');
    listenOnKeyDown();
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

    Array.from(document.getElementsByClassName('info')).forEach(section => {if(section.id != 'info-sphere') section.remove()});
    Array.from(document.getElementsByClassName('info-button')).forEach(button => {if(button.id != 'button-sphere') button.remove()});
    Array.from(document.getElementsByTagName('h2')).forEach(h2 => h2.remove());
    document.getElementsByTagName("hr")[0].remove();
    showInformation('sphere');
}
function restoreEverything() {
    window.location.reload();
}