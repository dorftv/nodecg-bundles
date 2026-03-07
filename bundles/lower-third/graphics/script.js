const lowerThird = document.getElementById('lower-third');
const titleContainer = document.getElementById('title-container');
const subtitleContainer = document.getElementById('subtitle-container');

const titleReplicant = nodecg.Replicant('displayTitle', { defaultValue: '' });
const subtitleReplicant = nodecg.Replicant('displaySubtitle', { defaultValue: '' });
const bgColorReplicant = nodecg.Replicant('bgColor', { defaultValue: '#0a0a12' });
const textColorReplicant = nodecg.Replicant('textColor', { defaultValue: '#ffffff' });
const accentColorReplicant = nodecg.Replicant('accentColor', { defaultValue: '#ff3c6f' });
const alignReplicant = nodecg.Replicant('align', { defaultValue: 'right' });

function updateVisibility() {
    const has = titleContainer.textContent.trim() || subtitleContainer.textContent.trim();
    if (has) {
        lowerThird.classList.remove('hide');
        lowerThird.classList.add('show');
    } else {
        lowerThird.classList.remove('show');
        lowerThird.classList.add('hide');
    }
}

titleReplicant.on('change', (v) => { titleContainer.textContent = v; updateVisibility(); });
subtitleReplicant.on('change', (v) => { subtitleContainer.textContent = v; updateVisibility(); });

bgColorReplicant.on('change', (v) => {
    const r = parseInt(v.slice(1, 3), 16);
    const g = parseInt(v.slice(3, 5), 16);
    const b = parseInt(v.slice(5, 7), 16);
    document.documentElement.style.setProperty('--bg-color', `rgba(${r}, ${g}, ${b}, 0.78)`);
});

textColorReplicant.on('change', (v) => {
    document.documentElement.style.setProperty('--text-color', v);
});

accentColorReplicant.on('change', (v) => {
    document.documentElement.style.setProperty('--accent-color', v);
});

alignReplicant.on('change', (v) => {
    lowerThird.classList.remove('align-left', 'align-right');
    lowerThird.classList.add('align-' + v);
});
