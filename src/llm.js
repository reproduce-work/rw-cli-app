const docker = require('dockerode');
const { spawn } = require('child_process');

let activeMode = false;
let timeoutId;

function isInputFieldActive() {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
        return true;
    }
    return false;
}

function isPrompterActive() {
    return activeMode;
}

function isInputFieldAndPrompterActive() {
    return isInputFieldActive() && isPrompterActive();
}

let currentContext = null;
function getUserContext() {
    if (isInputFieldAndPrompterActive()) {
        const activeElement = document.activeElement;
        // find active cursor exact location and text before and after in the
        // input field
        const cursorPosition = activeElement.selectionStart;
        const textBeforeCursor = activeElement.value.substring(0, cursorPosition);
        const textAfterCursor = activeElement.value.substring(cursorPosition);
        currentContext = {
            cursorPosition,
            textBeforeCursor,
            textAfterCursor,
        };
        return currentContext;
    } else {
        return currentContext;
    }
}

function openAiPrompt(prompt) {
    const child = spawn('docker', ['run', '-it', 'rw-llm-openai', 'llm', '--key', process.env.OPENAI_API_KEY, prompt], {
        stdio: 'inherit',
    });

    child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

function promptFromContext(context) {
    const { cursorPosition, textBeforeCursor, textAfterCursor } = context;
    const prompt = `[PROMPT_BEFORE]${textBeforeCursor}[PROMPT_AFTER]\n\n[OPENAI_OUTPUT_AREA]\n<put your output here>\n\n${textAfterCursor}`;
    return prompt;
}

function checkDockerContainer(tagName) {
    const dockerClient = new docker();
    dockerClient.listContainers({ all: true }, (err, containers) => {
        if (err) {
            console.error('Error occurred while listing containers:', err);
            return;
        }

        const runningContainer = containers.find((container) => container.Image === tagName);
        if (runningContainer) {
            console.log('Docker container is running.');
        } else {
            console.log('Docker container is not running.');
            // run it again with new prompt;
            if (isInputFieldAndPrompterActive()) {
                const context = getUserContext();
                const prompt = promptFromContext(context);
                openAiPrompt(prompt);
            }
        }
    });
}

function activateMode() {
    activeMode = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        activeMode = false;
        console.log('Active mode ended.');
    }, 10000);
}

function handleEvent() {
    if (!activeMode) {
        activateMode();
        checkDockerContainer('rw-llm-openai');
    } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            activeMode = false;
            console.log('Active mode ended.');
        }, 10000);
    }
}

document.addEventListener('click', handleEvent);
document.addEventListener('keydown', handleEvent);

module.exports = {
    start: () => {
        activeMode = true; // Set activeMode to true initially
        handleEvent(); // Trigger the handleEvent function to start the process
        document.addEventListener('click', handleEvent);
        document.addEventListener('keydown', handleEvent);
    },
    stop: () => {
        activeMode = false;
        document.removeEventListener('click', handleEvent);
        document.removeEventListener('keydown', handleEvent);
    },
};
