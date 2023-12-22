/* cerebral.technology completions manager */

/**
 * Manages the footer initialization and metadata toggle.
 */
class FooterManager {
    constructor() {
        this.initializeFooter();
    }

    initializeFooter() {
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
                this.setupMetadataToggle();
            }).catch(error => console.error('Error loading footer:', error));
    }

    setupMetadataToggle() {
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
}


/**
 * Determines whether or not a user is actively typing and 
 * may find value in a completion
 */
class ActiveModeHandler {
    constructor() {
        this.activeMode = false;
        this.timeoutId = null;
        this.debounceTimer = null;
        this.lastValues = new Map();
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('click', () => this.handleEvent());
        document.addEventListener('keydown', () => this.handleEvent());
        document.addEventListener('focusin', event => this.trackFocus(event, true));
        document.addEventListener('focusout', event => this.trackFocus(event, false));
    }

    handleEvent() {
        if (!this.activeMode) {
            this.activateMode();
        } else {
            this.logDevMode('Timer reset triggered.');
            this.resetActiveModeTimer();
        }
    }

    activateMode() {
        this.activeMode = true;
        this.logDevMode('Active mode started.');
        this.resetActiveModeTimer();
    }

    resetActiveModeTimer() {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.activeMode = false;
            this.logDevMode('Active mode ended.');
        }, 10000); // 10 seconds active mode
    }

    trackFocus(event, isFocused) {
        const { target } = event;
        if (target.matches('textarea, div[contenteditable="true"]')) {
            target.isFocused = isFocused;
        }
    }

    logDevMode(message) {
        if (devMode) console.log(message);
    }
}



/**
 * Handles input field interactions, debounce, and processing.
 */
class InputFieldHandler {
    constructor(activeModeHandler) {
        this.activeModeHandler = activeModeHandler;
        this.setupInputFields();
    }

    setupInputFields() {
        const inputFields = document.querySelectorAll('textarea, div[contenteditable="true"]');
        inputFields.forEach(inputField => {
            if (!inputField.hasListener) {
                inputField.addEventListener('keyup', () => this.debouncedHandleInputField(inputField));
                inputField.hasListener = true;
            }
        });
    }

    debouncedHandleInputField(inputField) {
        if (inputField.isFocused && this.activeModeHandler.activeMode) {
            clearTimeout(this.activeModeHandler.debounceTimer);
            this.activeModeHandler.debounceTimer = setTimeout(() => {
                this.processInputField(inputField);
            }, 1000); // 1 second debounce period
        }
    }

    processInputField(inputField) {
        console.log('Entering processInputField');
        const inputText = inputField.innerText || inputField.value;
        const position = getCaretPosition(inputField);
    
        console.log('Input Text:', inputText);
        console.log('Caret Position:', position);
    
        if (shouldRequestCompletion(inputField)) {
            console.log('Requesting completion');
            const newText = getCompletion(inputField, inputText, position);
            console.log('New Text:', newText);
            displayCompletion(newText, inputField);
        }
    }
    
    
    // Global state to track last values of input fields
    lastValues = new Map();
    
    shouldRequestCompletion(inputField) {
        const currentValue = inputField.tagName.toLowerCase() === 'textarea' ? inputField.value : inputField.innerText;
        const lastValue = lastValues.get(inputField) || '';
        const hasChanged = lastValue !== currentValue;
    
        lastValues.set(inputField, currentValue); // Update the last value
        const shouldRequest = inputField.isFocused && activeMode && hasChanged;
        if(devMode){
            console.log('Should request? ', shouldRequest)
        }
    
        return shouldRequest;
    }
    
    getCaretPosition(inputField) {
        if (inputField.tagName.toLowerCase() === 'textarea') {
            return inputField.selectionStart;
        } else if (inputField.getAttribute('contenteditable') === 'true') {
            const selection = window.getSelection();
            if (selection.rangeCount === 0) return 0; // No selection
    
            const range = selection.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(inputField);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            return preCaretRange.toString().length;
        }
    }
    
    displayCompletion(newText, inputField) {
        if (inputField.tagName.toLowerCase() === 'textarea') {
            inputField.value = newText;
        } else {
            inputField.innerText = newText;
        }
    }
}

// Initialization
const devMode = true;
let activeModeHandler = new ActiveModeHandler();
let footerManager = new FooterManager();
let inputFieldHandler = new InputFieldHandler(activeModeHandler);

document.addEventListener('DOMContentLoaded', () => {
    // Additional initialization if needed
});
