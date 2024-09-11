const lowerThird = document.getElementById('lower-third');
const titleContainer = document.getElementById('title-container');
const subtitleContainer = document.getElementById('subtitle-container');

const titleReplicant = nodecg.Replicant('displayTitle', { defaultValue: '' });
const subtitleReplicant = nodecg.Replicant('displaySubtitle', { defaultValue: '' });
const bgColorReplicant = nodecg.Replicant('bgColor', { defaultValue: '#000000' });
const textColorReplicant = nodecg.Replicant('textColor', { defaultValue: '#FFFFFF' });

function updateLowerThirdVisibility() {
    const hasTitleContent = titleContainer.textContent.trim() !== '';
    const hasSubtitleContent = subtitleContainer.textContent.trim() !== '';

    titleContainer.classList.toggle('has-content', hasTitleContent);
    subtitleContainer.classList.toggle('has-content', hasSubtitleContent);

    if (hasTitleContent || hasSubtitleContent) {
        lowerThird.classList.remove('hide');
        lowerThird.classList.add('show');
    } else {
        lowerThird.classList.remove('show');
        lowerThird.classList.add('hide');
    }
}

titleReplicant.on('change', (newValue) => {
    titleContainer.textContent = newValue;
    updateLowerThirdVisibility();
});

subtitleReplicant.on('change', (newValue) => {
    subtitleContainer.textContent = newValue;
    updateLowerThirdVisibility();
});

bgColorReplicant.on('change', (newValue) => {
    document.documentElement.style.setProperty('--bg-color', newValue);
});

textColorReplicant.on('change', (newValue) => {
    document.documentElement.style.setProperty('--text-color', newValue);
});
