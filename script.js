const upload = document.getElementById('upload');
const image = document.getElementById('image');
const frame = document.getElementById('frame');
const canvas = document.getElementById('canvas');
const saveButton = document.getElementById('save');
const downloadButton = document.getElementById('download');

upload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
        image.style.display = 'block';
        frame.style.display = 'block';

        saveButton.style.display = 'block';

        image.onload = function() {
            // Calculate initial image position and size
            const container = document.querySelector('.image-container');
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const imgWidth = image.naturalWidth;
            const imgHeight = image.naturalHeight;
            const imgAspectRatio = imgWidth / imgHeight;
            const containerAspectRatio = containerWidth / containerHeight;

            if (imgAspectRatio > containerAspectRatio) {
                image.style.width = 'auto';
                image.style.height = '100%';
                image.style.top = '0';
                image.style.left = `-${(image.offsetWidth - containerWidth) / 2}px`;
            } else {
                image.style.width = '100%';
                image.style.height = 'auto';
                image.style.left = '0';
                image.style.top = `-${(image.offsetHeight - containerHeight) / 2}px`;
            }
        };
    };
    reader.readAsDataURL(file);
});

saveButton.addEventListener('click', function() {
    const context = canvas.getContext('2d');
    const frameImage = new Image();
    frameImage.src = 'moldura.png';

    frameImage.onload = function() {
        canvas.width = 500;
        canvas.height = 500;
        const container = document.querySelector('.image-container');
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image in canvas
        context.drawImage(image, imageRect.left - containerRect.left, imageRect.top - containerRect.top, imageRect.width, imageRect.height);

        // Draw frame on top
        context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        downloadButton.style.display = 'block';
    };

    canvas.style.display = 'block';
    saveButton.style.display = 'none';
});

downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'foto-com-moldura.png';
    link.href = canvas.toDataURL();
    link.click();
});
