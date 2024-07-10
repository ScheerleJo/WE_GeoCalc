function showInformation(geometry) {
    let section = document.getElementById('info-' + geometry);
    hideEverythingElse(geometry);
    section.style.display = 'block';
}
function hideEverythingElse(geometry) {
    let sections = document.getElementsByClassName('info');
    for (let i = 0; i < sections.length; i++) {
        if(sections[i].id !== 'info-' + geometry) {
            sections[i].style.display = 'none';
        }
    }
}
function loadBody(){
    hideEverythingElse('none');
    listenOnKeyDown();
}


function listenOnKeyDown() {
    console.log('Listening to keydown events');
    document.body.addEventListener('keydown', function(event) {
        console.log('Key pressed: ' + event.key);
        if(event.key === 'k' || event.key === 'K') {
            hideEverythingButSphere();
            if(!document.getElementById('restore-button')) {
                button = document.createElement('button');
                button.innerHTML = 'Restore';
                button.setAttribute('id', 'restore-button');
                button.addEventListener('click', restoreEverything);
                document.getElementById('formulas-main').appendChild(button);
            }
        }
    });
}

function hideEverythingButSphere() {
    console.log("Delete everything.... You better run!")

    Array.from(document.getElementsByClassName('info')).forEach(section => {if(section.id != 'info-sphere') section.remove()});
    Array.from(document.getElementsByClassName('button-wrapper')).forEach(buttonWrapper => buttonWrapper.remove());
    Array.from(document.getElementsByTagName('h2')).forEach(h2 => h2.remove());
    document.getElementsByTagName("hr")[0].remove();
    showInformation('sphere');
}
function restoreEverything() {
    window.location.reload();
}


