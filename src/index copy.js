let devMode = true;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize and append the footer
    initializeFooter();

    // Set up event listeners for active mode and textareas
    setupActiveMode();
    setupInputFields();
});

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

let activeMode = false;
let timeoutId;
function setupActiveMode() {
    document.addEventListener('click', (event) => handleEvent(event));
    document.addEventListener('keydown', (event) => handleEvent(event));
    activateMode();
}

function handleEvent(event) {
    if (!activeMode) {
        activateMode();
    } else {
        if(devMode){
            console.log('Timer reset triggered.');
        }
        resetActiveModeTimer();
    }

    if (activeMode){
        handleInputField(event);
    }
}

function activateMode() {
    activeMode = true;
    console.log('Active mode started.')
    resetActiveModeTimer();
}

function resetActiveModeTimer() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        activeMode = false;
        console.log('Active mode ended.');
    }, 10000); // 10 seconds active mode
}

function setupInputFields() {
    const inputFields = document.querySelectorAll('textarea, div[contenteditable="true"]');
    inputFields.forEach(inputField => {
        // Check if the listener has already been attached
        if (!inputField.hasListener) {
            inputField.debouncedHandler = debounce(handleInputField, 500);
            inputField.addEventListener('keyup', inputField.debouncedHandler);
            inputField.hasListener = true; // Set the flag
        }
    });
}

let debounceTimer;

function handleInputField(event) {
    if (event.target.isFocused && activeMode) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            processInputField(event.target);
        }, 1000); //  1 s debounce period
    }
}

async function processInputField(inputField) {
    console.log('Entering processInputField');
    const inputText = inputField.innerText || inputField.value;
    const position = getCaretPosition(inputField);

    console.log('Input Text:', inputText);
    console.log('Caret Position:', position);

    if (shouldRequestCompletion(inputField)) {
        console.log('Requesting completion');
        const newText = await getCompletion(inputField, inputText, position);
        console.log('New Text:', newText);
        displayCompletion(newText, inputField);
    }
}


// Global state to track last values of input fields
const lastValues = new Map();

function shouldRequestCompletion(inputField) {
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

function getCaretPosition(inputField) {
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

function displayCompletion(newText, inputField) {
    if (inputField.tagName.toLowerCase() === 'textarea') {
        inputField.value = newText;
    } else {
        inputField.innerText = newText;
    }
}

// Add focus tracking for both textareas and contenteditable elements
document.addEventListener('focusin', event => {
    if (event.target.tagName.toLowerCase() === 'textarea' || event.target.getAttribute('contenteditable') === 'true') {
        event.target.isFocused = true;
    }
});

document.addEventListener('focusout', event => {
    if (event.target.tagName.toLowerCase() === 'textarea' || event.target.getAttribute('contenteditable') === 'true') {
        event.target.isFocused = false;
    }
});


async function getCompletion(Field, Text,  position) {

    const { prefix, suffix } = getContext(Text, position);
    const prompt = `<PRE> ${prefix} <SUF> ${suffix} <MID>`;

    console.log('Prompt:', prompt);
    const completions = ["completion1", "completion2"]; // Mocked completions for now
    const completedText = insertCompletion(Field, position, completions[0]);
    return completedText;
}

function getContext(text, position) {
    const contextRadius = 50;
    const start = Math.max(0, position - contextRadius);
    const end = Math.min(text.length, position + contextRadius);
    return {
        prefix: text.substring(start, position),
        suffix: text.substring(position, end)
    };
}



function insertCompletion(inputField, position, completion) {
    if (!inputField || !(inputField instanceof Element)) {
        console.error('Invalid input field');
        return;
    }

    if (inputField.tagName.toLowerCase() === 'textarea') {
        // For textarea
        inputField.value = inputField.value.substring(0, position) + completion + inputField.value.substring(position);

        // set the cursor to the end of the completion
        inputField.selectionStart = position;
        inputField.selectionEnd = position + completion.length;

        

    } else if (inputField.getAttribute('contenteditable') === 'true') {
        // For contenteditable
        const range = document.createRange();
        const sel = window.getSelection();

        const { node, offset } = getNodeAtPosition(inputField, position);
        if (!node) {
            console.error('Could not find the node at the specified position');
            return;
        }

        range.setStart(node, offset);
        range.collapse(true);

        const span = document.createElement('span');
        span.className = 'gen-ai-completion';
        span.textContent = completion;

        range.deleteContents();
        range.insertNode(span);

        // Move the caret to the end of the completion
        range.setStartAfter(span);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        // set the cursor to the end of the completion
        const range2 = document.createRange();
        range2.selectNodeContents(span);
        range2.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range2);
        
    }

    return inputField.tagName.toLowerCase() === 'textarea' ? inputField.value : inputField.innerText;
}

function getNodeAtPosition(root, position) {
    let node;
    let offset = 0;

    function getNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (position <= offset + node.length) {
                return { node, offset: position - offset };
            }
            offset += node.length;
        } else {
            for (const child of node.childNodes) {
                const result = getNode(child);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    node = getNode(root);
    return node || { node: null, offset: 0 };
}
