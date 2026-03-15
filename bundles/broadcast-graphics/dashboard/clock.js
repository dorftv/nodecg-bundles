const styleSelect = document.getElementById('clk-style-select');
const sizeInput = document.getElementById('clk-size-input');
const toggle = document.getElementById('clk-toggle');

const clkStyleRep = nodecg.Replicant('clkStyle', { defaultValue: 'digital' });
const clkVisibleRep = nodecg.Replicant('clkVisible', { defaultValue: false });
const clkSizeRep = nodecg.Replicant('clkSize', { defaultValue: 1.5 });
const clkBgRep = nodecg.Replicant('clkBgColor', { defaultValue: '#0a0a14' });
const clkTextRep = nodecg.Replicant('clkTextColor', { defaultValue: '#ffffff' });
const clkAccentRep = nodecg.Replicant('clkAccentColor', { defaultValue: '#e5243b' });

styleSelect.addEventListener('change', () => { clkStyleRep.value = styleSelect.value; });
clkStyleRep.on('change', (v) => { styleSelect.value = v; });

sizeInput.addEventListener('input', () => { clkSizeRep.value = parseFloat(sizeInput.value); });
clkSizeRep.on('change', (v) => { sizeInput.value = v; });

toggle.addEventListener('click', () => { clkVisibleRep.value = !clkVisibleRep.value; });

clkVisibleRep.on('change', (v) => {
    toggle.textContent = v ? 'Hide' : 'Show';
    toggle.classList.toggle('is-active', v);
});

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

setupColorPicker('clk-bg-color', 'clk-bg-color-input', clkBgRep);
setupColorPicker('clk-text-color', 'clk-text-color-input', clkTextRep);
setupColorPicker('clk-accent-color', 'clk-accent-color-input', clkAccentRep);
