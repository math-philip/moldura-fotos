let cropper;
const upload = document.getElementById('upload');
const image = document.getElementById('image');
const frame = document.getElementById('frame');
const saveButton = document.getElementById('save');
const downloadButton = document.getElementById('download');

upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
        image.style.display = 'block';

        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            ready() {
                // Ensure the cropper is ready before displaying the save button
                saveButton.style.display = 'block';
            }
        });
    };
    reader.readAsDataURL(file);
});

saveButton.addEventListener('click', function() {
    const croppedCanvas = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
    });

    const context = croppedCanvas.getContext('2d');
    const frameImage = new Image();
    frameImage.src = 'moldura.png';

    frameImage.onload = function() {
        // Draw the frame on the cropped canvas
        context.drawImage(frameImage, 0, 0, croppedCanvas.width, croppedCanvas.height);

        // Display the download button
        downloadButton.style.display = 'block';
    };
});

downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'foto-com-moldura.png';
    link.href = croppedCanvas.toDataURL();
    link.click();
});
