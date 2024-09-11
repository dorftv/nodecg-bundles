function initLogoDisplay(replicantName, assetCategory) {
    const logoDisplay = document.getElementById('logo-display');
    const logoReplicant = nodecg.Replicant(replicantName);

    function updateLogo(newValue) {
        if (newValue && newValue !== 'nologo') {
            nodecg.readReplicant(`assets:${assetCategory}`, (assets) => {
                const selectedAsset = assets.find(asset => asset.sum === newValue);
                if (selectedAsset) {
                    logoDisplay.src = selectedAsset.url;
                    logoDisplay.style.display = 'block';
                }
            });
        } else {
            logoDisplay.src = '';
            logoDisplay.style.display = 'none';
        }
    }

    logoReplicant.on('change', updateLogo);

    // Initial update
    NodeCG.waitForReplicants(logoReplicant).then(() => {
        updateLogo(logoReplicant.value);
    });
}
