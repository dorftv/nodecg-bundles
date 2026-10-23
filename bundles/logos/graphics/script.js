function initLogoDisplay(replicantName, assetCategory) {
    const logoDisplay = document.getElementById('logo-display');
    const logoReplicant = nodecg.Replicant(replicantName);

    function hideLogo() {
        logoDisplay.removeAttribute('src');
        logoDisplay.style.display = 'none';
    }

    function updateLogo(newValue) {
        if (newValue && newValue !== 'nologo') {
            nodecg.readReplicant(`assets:${assetCategory}`, (assets) => {
                const selectedAsset = assets.find(asset => asset.sum === newValue);
                if (selectedAsset) {
                    logoDisplay.src = selectedAsset.url;
                    logoDisplay.style.display = 'block';
                } else {
                    // The selected logo was deleted
                    hideLogo();
                }
            });
        } else {
            hideLogo();
        }
    }

    // A logo whose file does not load leaves no frame either
    logoDisplay.addEventListener('error', hideLogo);

    logoReplicant.on('change', updateLogo);

    // Initial update
    NodeCG.waitForReplicants(logoReplicant).then(() => {
        updateLogo(logoReplicant.value);
    });
}
