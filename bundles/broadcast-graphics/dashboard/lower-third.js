const styleSelect = document.getElementById('style-select');
const tagInput = document.getElementById('tag-input');
const titleInput = document.getElementById('title-input');
const subtitleInput = document.getElementById('subtitle-input');
const toggle = document.getElementById('lt-toggle');
const clearBtn = document.getElementById('lt-clear');
const alignLeftBtn = document.getElementById('align-left');
const alignRightBtn = document.getElementById('align-right');

const ltStyleRep = nodecg.Replicant('ltStyle', { defaultValue: 'classic' });
const ltVisibleRep = nodecg.Replicant('ltVisible', { defaultValue: false });
const ltTagRep = nodecg.Replicant('ltTag', { defaultValue: '' });
const ltTitleRep = nodecg.Replicant('ltTitle', { defaultValue: '' });
const ltSubtitleRep = nodecg.Replicant('ltSubtitle', { defaultValue: '' });
const ltBgRep = nodecg.Replicant('ltBgColor', { defaultValue: '#0a0a14' });
const ltTextRep = nodecg.Replicant('ltTextColor', { defaultValue: '#ffffff' });
const ltAccentRep = nodecg.Replicant('ltAccentColor', { defaultValue: '#e5243b' });
const ltAlignRep = nodecg.Replicant('ltAlign', { defaultValue: 'right' });

styleSelect.addEventListener('change', () => { ltStyleRep.value = styleSelect.value; });
ltStyleRep.on('change', (v) => {
    styleSelect.value = v;
    tagInput.style.display = v === 'tag' ? '' : 'none';
});

// Toggle visibility
toggle.addEventListener('click', () => {
    ltVisibleRep.value = !ltVisibleRep.value;
});

ltVisibleRep.on('change', (v) => {
    toggle.textContent = v ? 'Hide' : 'Show';
    toggle.classList.toggle('is-active', v);
});

// Clear all text
clearBtn.addEventListener('click', () => {
    ltVisibleRep.value = false;
    ltTagRep.value = '';
    ltTitleRep.value = '';
    ltSubtitleRep.value = '';
    tagInput.value = '';
    titleInput.value = '';
    subtitleInput.value = '';
});

// Sync inputs on change (live update while visible)
tagInput.addEventListener('input', () => { ltTagRep.value = tagInput.value; });
titleInput.addEventListener('input', () => { ltTitleRep.value = titleInput.value; });
subtitleInput.addEventListener('input', () => { ltSubtitleRep.value = subtitleInput.value; });

ltTagRep.on('change', (v) => { tagInput.value = v; });
ltTitleRep.on('change', (v) => { titleInput.value = v; });
ltSubtitleRep.on('change', (v) => { subtitleInput.value = v; });

alignLeftBtn.addEventListener('click', () => { ltAlignRep.value = 'left'; });
alignRightBtn.addEventListener('click', () => { ltAlignRep.value = 'right'; });

ltAlignRep.on('change', (v) => {
    alignLeftBtn.classList.toggle('active', v === 'left');
    alignRightBtn.classList.toggle('active', v === 'right');
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

setupColorPicker('bg-color', 'bg-color-input', ltBgRep);
setupColorPicker('text-color', 'text-color-input', ltTextRep);
setupColorPicker('accent-color', 'accent-color-input', ltAccentRep);

// Initialize tag input visibility on load
NodeCG.waitForReplicants(ltStyleRep).then(() => {
    const v = ltStyleRep.value || 'classic';
    styleSelect.value = v;
    tagInput.style.display = v === 'tag' ? '' : 'none';
});
