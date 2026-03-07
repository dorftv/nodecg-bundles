const titleInput = document.getElementById('title-input');
const subtitleInput = document.getElementById('subtitle-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');
const alignLeftBtn = document.getElementById('align-left');
const alignRightBtn = document.getElementById('align-right');

const titleReplicant = nodecg.Replicant('displayTitle', { defaultValue: '' });
const subtitleReplicant = nodecg.Replicant('displaySubtitle', { defaultValue: '' });
const bgColorReplicant = nodecg.Replicant('bgColor', { defaultValue: '#0f0f19' });
const textColorReplicant = nodecg.Replicant('textColor', { defaultValue: '#ffffff' });
const accentColorReplicant = nodecg.Replicant('accentColor', { defaultValue: '#ff3c6f' });
const alignReplicant = nodecg.Replicant('align', { defaultValue: 'right' });

sendButton.addEventListener('click', () => {
    titleReplicant.value = titleInput.value;
    subtitleReplicant.value = subtitleInput.value;
});

clearButton.addEventListener('click', () => {
    titleReplicant.value = '';
    subtitleReplicant.value = '';
    titleInput.value = '';
    subtitleInput.value = '';
});

// Alignment toggle
alignLeftBtn.addEventListener('click', () => { alignReplicant.value = 'left'; });
alignRightBtn.addEventListener('click', () => { alignReplicant.value = 'right'; });

alignReplicant.on('change', (newValue) => {
    alignLeftBtn.classList.toggle('active', newValue === 'left');
    alignRightBtn.classList.toggle('active', newValue === 'right');
});

// Color pickers
function setupColorPicker(swatchId, inputId, replicant) {
    const swatch = document.getElementById(swatchId);
    const input = document.getElementById(inputId);

    swatch.addEventListener('click', () => input.click());

    input.addEventListener('input', () => {
        swatch.style.backgroundColor = input.value;
        replicant.value = input.value;
    });

    replicant.on('change', (newValue) => {
        swatch.style.backgroundColor = newValue;
        input.value = newValue;
    });
}

setupColorPicker('bg-color', 'bg-color-input', bgColorReplicant);
setupColorPicker('text-color', 'text-color-input', textColorReplicant);
setupColorPicker('accent-color', 'accent-color-input', accentColorReplicant);

// Sync text inputs
titleReplicant.on('change', (newValue) => { titleInput.value = newValue; });
subtitleReplicant.on('change', (newValue) => { subtitleInput.value = newValue; });
