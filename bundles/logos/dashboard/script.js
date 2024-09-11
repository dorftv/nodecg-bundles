function initLogoSelector(assetCategory, replicantName) {
    const logoSelect = document.getElementById('logoSelect');
    const logoPreview = document.getElementById('logo-preview');
    const submitButton = document.getElementById('submitButton');
    const thumbnails = nodecg.Replicant(`assets:${assetCategory}`);
    const logoReplicant = nodecg.Replicant(replicantName);

    function updatePreview(value) {
        if (value === 'nologo') {
            logoPreview.src = '';
            logoPreview.style.display = 'none';
        } else {
            const selectedLogo = thumbnails.value.find(thumb => thumb.sum === value);
            if (selectedLogo) {
                logoPreview.src = selectedLogo.url;
                logoPreview.style.display = 'block';
            }
        }
    }

    function updateSubmitButtonVisibility() {
        submitButton.style.display =
            logoSelect.value !== logoReplicant.value ? 'block' : 'none';
    }

    NodeCG.waitForReplicants(thumbnails, logoReplicant).then(() => {
        logoSelect.innerHTML = '<option value="nologo">No logo</option>';
        for (const thumb of thumbnails.value) {
            const option = document.createElement('option');
            option.value = thumb.sum;
            option.textContent = thumb.name;
            logoSelect.appendChild(option);
        }

        if (logoReplicant.value) {
            logoSelect.value = logoReplicant.value;
            updatePreview(logoReplicant.value);
        } else {
            logoSelect.value = 'nologo';
            updatePreview('nologo');
        }

        updateSubmitButtonVisibility();

        logoSelect.addEventListener('change', (event) => {
            updatePreview(event.target.value);
            updateSubmitButtonVisibility();
        });

        submitButton.addEventListener('click', () => {
            logoReplicant.value = logoSelect.value;
            updateSubmitButtonVisibility();
        });

        logoReplicant.on('change', (newValue) => {
            logoSelect.value = newValue || 'nologo';
            updatePreview(newValue || 'nologo');
            updateSubmitButtonVisibility();
        });
    });
}
