// Correctly import the toml module
import * as toml from '@iarna/toml';

// Function to fetch and parse TOML data from a URL
async function fetchTomlData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        const tomlData = await response.text();
        return toml.parse(tomlData);
    } catch (error) {
        console.error('Error fetching TOML data:', error);
        throw error; // Re-throw the error for handling by the caller
    }
}

// Function to toggle visibility of metadata menu
function setupMetadataToggle() {
    const toggleButton = document.getElementById('toggle-metadata');
    toggleButton?.addEventListener('click', () => {
        const metadataMenu = document.getElementById('metadata-menu');
        metadataMenu.style.display = metadataMenu.style.display === 'none' ? 'block' : 'none';
    });
}

// Function to initialize and append the footer
async function initializeFooter() {
    let wrapperDiv = document.getElementById('rw-wrapper') || createWrapperDiv();
    try {
        const footerHtml = await fetch('/_rw/footer.html').then(response => response.text());
        appendFooter(wrapperDiv, footerHtml);
        setupMetadataToggle();
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Helper function to create a wrapper div
function createWrapperDiv() {
    const div = document.createElement('div');
    div.id = 'rw-wrapper';
    document.body.appendChild(div);
    return div;
}

// Helper function to append the footer
function appendFooter(wrapperDiv, html) {
    const footerDiv = document.createElement('div');
    footerDiv.id = 'rw-footer';
    footerDiv.innerHTML = html;
    wrapperDiv.appendChild(footerDiv);
}

// Function to extract a nested key from TOML data
function queryTomlKey(data, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc?.[key], data);
}

// Function to set text in the scientific environment div
async function setSciEnvText() {
    try {
        const sciEnvData = await fetchTomlData('/_rwproj/sci.env');
        document.querySelectorAll('#rw-footer [data-rw-env]').forEach(element => {
            const varName = element.getAttribute('data-rw-env');
            const value = queryTomlKey(sciEnvData, varName);
            console.log(`Setting ${varName} to ${value}`);

            if (value !== null) {
                element.innerHTML = value;
            }
        });
    } catch (error) {
        console.error('Error setting scientific environment text:', error);
    }
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFooter();
    setSciEnvText();
});
