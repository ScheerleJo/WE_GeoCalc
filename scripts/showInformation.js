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
