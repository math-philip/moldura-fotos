document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            const frame = new Image();
            frame.src = 'moldura.png'; // URL da sua moldura

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            frame.onload = function() {
                context.drawImage(frame, 0, 0, canvas.width, canvas.height);
                document.getElementById('download').style.display = 'block';
            };
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'foto-com-moldura.png';
    link.href = canvas.toDataURL();
    link.click();
});
