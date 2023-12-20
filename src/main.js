document.addEventListener('DOMContentLoaded', (event) => {
    // Create the rw-wrapper div if it doesn't exist
    let wrapperDiv = document.getElementById('rw-wrapper');
    if (!wrapperDiv) {
        wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'rw-wrapper';
        document.body.appendChild(wrapperDiv);
    }

    // Fetch and append the footer content
    fetch('/_rw/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerDiv = document.createElement('div');
            footerDiv.id = 'rw-footer';
            footerDiv.innerHTML = data;
            wrapperDiv.appendChild(footerDiv);

            document.getElementById('toggle-metadata').addEventListener('click', () => {
                const metadataMenu = document.getElementById('metadata-menu');
                if (metadataMenu) {
                    metadataMenu.style.display = metadataMenu.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
});
