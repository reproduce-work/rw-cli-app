let devMode = true;
let currentTabListener = null;
let currentFocusedInput = null;

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


// Modify focus tracking to include input[type="text"]
document.addEventListener('focusin', event => {
    if (event.target.tagName.toLowerCase() === 'textarea' ||
        event.target.tagName.toLowerCase() === 'input' ||
        event.target.getAttribute('contenteditable') === 'true') {

        event.target.isFocused = true;
        currentFocusedInput = event.target;
    }
});

document.addEventListener('focusout', event => {
    if (event.target.tagName.toLowerCase() === 'textarea' ||
        event.target.tagName.toLowerCase() === 'input' ||
        event.target.getAttribute('contenteditable') === 'true') {

        event.target.isFocused = false;
        
        if (currentFocusedInput === event.target && currentTabListener) {
            document.removeEventListener('keydown', currentTabListener);
            currentTabListener = null;
        }
        currentFocusedInput = null;
    }
});



// Function to display the completion preview
function displayCompletion(newText, inputField, position) {
    const previewSpan = document.createElement('span');
    previewSpan.id = 'completion-preview';
    previewSpan.style.opacity = '0.6';
    previewSpan.textContent = newText;

    insertAtCaret(inputField, previewSpan, position);
}

// Function to insert an element at the caret position
function insertAtCaret(inputField, element, position) {
    if (inputField.tagName.toLowerCase() === 'textarea' || inputField.tagName.toLowerCase() === 'input') {
        // For textareas and inputs, you may need a different approach
        // as they do not support direct HTML insertion
    } else if (inputField.getAttribute('contenteditable') === 'true') {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(inputField.firstChild, position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        range.insertNode(element);
    }
}


// Function to get the completion text asynchronously
async function getCompletion(Field, Text, position, show_preview = true) {
    const { prefix, suffix } = getContext(Text, position);
    const prompt = `<PRE> ${prefix} <SUF> ${suffix} <MID>`;

    console.log('Prompt:', prompt);
    const completions = ['completion1', "completion2"]; // Mocked completions for now
    
    // Function to get the text with the completion inserted at the specified position
    function getCompletedText(text, position, completion) {
        // wrap completions in <span id="testCOMPLETION" style="opacity: 0.6;">completion</span>

        // detect Field type and insert completion accordingly
        if (Field.tagName.toLowerCase() === 'textarea' || Field.tagName.toLowerCase() === 'input') {
            return text.substring(0, position) + completion + text.substring(position);
        }
        else {
            return text.substring(0, position) + `<span id="testCOMPLETION" style="opacity: 0.6;">${completion}</span>` + text.substring(position);
        }

    }

    
    const completedText = show_preview ? getCompletedText(Text, position, completions[0]) : '';
    setupCompletionInsertion(Field, position, completedText);
    return completedText;
}

// Function to get the context around the caret position
function getContext(text, position) {
    const contextRadius = 100;
    const start = Math.max(0, position - contextRadius);
    const end = Math.min(text.length, position + contextRadius);
    return {
        prefix: text.substring(start, position),
        suffix: text.substring(position, end)
    };
}


// Function to setup the completion insertion on Tab key press
function setupCompletionInsertion(inputField, position, completion) {
    if (!inputField || !(inputField instanceof Element)) {
        console.error('Invalid input field');
        return;
    }

    if (currentTabListener) {
        document.removeEventListener('keydown', currentTabListener);
        currentTabListener = null;
    }

    currentTabListener = function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            finalizeCompletion(inputField, position, completion);
        }
    };

    document.addEventListener('keydown', currentTabListener);
}

// Function to finalize the completion by setting the opacity to full
function finalizeCompletion(inputField, position, completion) {
    const previewSpan = document.getElementById('completion-preview');
    if (previewSpan) {
        previewSpan.style.opacity = '1'; // Set opacity to full

        // Move the cursor to the end of the completion
        const newPosition = position + completion.length;
        if (inputField.tagName.toLowerCase() === 'textarea' || inputField.tagName.toLowerCase() === 'input') {
            inputField.selectionStart = inputField.selectionEnd = newPosition;
        } else if (inputField.getAttribute('contenteditable') === 'true') {
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStartAfter(previewSpan);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
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
