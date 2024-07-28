let cropper;
const upload = document.getElementById('upload');
const image = document.getElementById('image');
const canvas = document.getElementById('canvas');
const cropButton = document.getElementById('crop');
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
        });

        cropButton.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

cropButton.addEventListener('click', function() {
    const croppedCanvas = cropper.getCroppedCanvas({
        width: 500,
        height: 500,
    });

    const context = canvas.getContext('2d');
    const frame = new Image();
    frame.src = 'moldura.png'; // URL da sua moldura

    frame.onload = function() {
        canvas.width = 500;
        canvas.height = 500;
        context.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);

        downloadButton.style.display = 'block';
    };

    canvas.style.display = 'block';
    cropButton.style.display = 'none';
});

downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'foto-com-moldura.png';
    link.href = canvas.toDataURL();
    link.click();
});
