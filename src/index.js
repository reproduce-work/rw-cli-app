let devMode = true;


document.addEventListener('DOMContentLoaded', () => {
    // Initialize and append the footer
    initializeFooter();

    // Set up event listeners for active mode and textareas
    setupActiveMode();
    setupInputFields();
});


function setupMetadataToggle() {
    const toggleButton = document.getElementById('toggle-metadata');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const metadataMenu = document.getElementById('metadata-menu');
            if (metadataMenu) {
                metadataMenu.style.display = metadataMenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
}


function initializeFooter() {
    let wrapperDiv = document.getElementById('rw-wrapper');
    if (!wrapperDiv) {
        wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'rw-wrapper';
        document.body.appendChild(wrapperDiv);
    }

    fetch('/_rw/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerDiv = document.createElement('div');
            footerDiv.id = 'rw-footer';
            footerDiv.innerHTML = data;
            wrapperDiv.appendChild(footerDiv);

            setupMetadataToggle();
        }).catch(error => console.error('Error loading footer:', error));
}