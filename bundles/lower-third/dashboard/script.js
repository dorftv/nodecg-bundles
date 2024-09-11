const titleInput = document.getElementById('title-input');
const subtitleInput = document.getElementById('subtitle-input');
const bgColorSwatch = document.getElementById('bg-color');
const textColorSwatch = document.getElementById('text-color');
const bgColorInput = document.getElementById('bg-color-input');
const textColorInput = document.getElementById('text-color-input');
const sendButton = document.getElementById('send-button');
const clearButton = document.getElementById('clear-button');

const titleReplicant = nodecg.Replicant('displayTitle', { defaultValue: '' });
const subtitleReplicant = nodecg.Replicant('displaySubtitle', { defaultValue: '' });
const bgColorReplicant = nodecg.Replicant('bgColor', { defaultValue: '#000000' });
const textColorReplicant = nodecg.Replicant('textColor', { defaultValue: '#FFFFFF' });

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

function setupColorPicker(swatch, input, replicant) {
    swatch.style.backgroundColor = replicant.value;
    input.value = replicant.value;

    swatch.addEventListener('click', () => {
        input.click();
    });

    input.addEventListener('input', () => {
        const newColor = input.value;
        swatch.style.backgroundColor = newColor;
        replicant.value = newColor;
    });

    replicant.on('change', (newValue) => {
        swatch.style.backgroundColor = newValue;
        input.value = newValue;
    });
}

setupColorPicker(bgColorSwatch, bgColorInput, bgColorReplicant);
setupColorPicker(textColorSwatch, textColorInput, textColorReplicant);

titleReplicant.on('change', (newValue) => {
    titleInput.value = newValue;
});

subtitleReplicant.on('change', (newValue) => {
    subtitleInput.value = newValue;
});
