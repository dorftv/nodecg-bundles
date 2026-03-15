const marqueeInput = document.getElementById('marquee-input');
const speedInput = document.getElementById('speed-input');
const fontsizeInput = document.getElementById('fontsize-input');
const toggle = document.getElementById('mq-toggle');
const clearBtn = document.getElementById('mq-clear');

const mqVisibleRep = nodecg.Replicant('mqVisible', { defaultValue: false });
const mqTextRep = nodecg.Replicant('mqText', { defaultValue: '' });
const mqSpeedRep = nodecg.Replicant('mqSpeed', { defaultValue: 80 });
const mqFontSizeRep = nodecg.Replicant('mqFontSize', { defaultValue: 1.1 });
const mqBgRep = nodecg.Replicant('mqBgColor', { defaultValue: '#0a0a14' });
const mqTextColorRep = nodecg.Replicant('mqTextColor', { defaultValue: '#ffffff' });
const mqAccentRep = nodecg.Replicant('mqAccentColor', { defaultValue: '#e5243b' });

// Toggle visibility
toggle.addEventListener('click', () => {
    mqVisibleRep.value = !mqVisibleRep.value;
});

mqVisibleRep.on('change', (v) => {
    toggle.textContent = v ? 'Hide' : 'Show';
    toggle.classList.toggle('is-active', v);
});

// Clear text
clearBtn.addEventListener('click', () => {
    mqVisibleRep.value = false;
    mqTextRep.value = '';
    marqueeInput.value = '';
});

// Live update text while visible
marqueeInput.addEventListener('input', () => { mqTextRep.value = marqueeInput.value; });

mqTextRep.on('change', (v) => { marqueeInput.value = v; });

speedInput.addEventListener('input', () => {
    mqSpeedRep.value = parseInt(speedInput.value);
});

fontsizeInput.addEventListener('input', () => {
    mqFontSizeRep.value = parseFloat(fontsizeInput.value);
});

mqSpeedRep.on('change', (v) => { speedInput.value = v; });
mqFontSizeRep.on('change', (v) => { fontsizeInput.value = v; });

function setupColorPicker(swatchId, inputId, replicant) {
    const swatch = document.getElementById(swatchId);
    const input = document.getElementById(inputId);
    swatch.addEventListener('click', () => input.click());
    input.addEventListener('input', () => {
        swatch.style.backgroundColor = input.value;
        replicant.value = input.value;
    });
    replicant.on('change', (v) => {
        swatch.style.backgroundColor = v;
        input.value = v;
    });
}

setupColorPicker('mq-bg-color', 'mq-bg-color-input', mqBgRep);
setupColorPicker('mq-text-color', 'mq-text-color-input', mqTextColorRep);
setupColorPicker('mq-accent-color', 'mq-accent-color-input', mqAccentRep);
