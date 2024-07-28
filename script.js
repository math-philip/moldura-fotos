const upload = document.getElementById('upload');
const image = document.getElementById('image');
const frameContainer = document.getElementById('frame-container');
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

        saveButton.style.display = 'block';

        // Allow image to be dragged within the container
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        image.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = image.offsetLeft;
            initialTop = image.offsetTop;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                let dx = e.clientX - startX;
                let dy = e.clientY - startY;
                image.style.left = `${initialLeft + dx}px`;
                image.style.top = `${initialTop + dy}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
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
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, image.offsetLeft, image.offsetTop, image.width, image.height);
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
