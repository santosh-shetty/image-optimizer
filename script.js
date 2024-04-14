document.getElementById('compressButton').addEventListener('click', function () {
    const imageInput = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    const main = document.querySelector('.main');
    const backImage = document.querySelector('.back-image');
    const topImage = document.querySelector('.top-image');
    const quality = parseFloat(document.getElementById("quality").value);
    console.log(quality);

    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        const oldImgUrl = URL.createObjectURL(file);
        const compressor = new ImageCompressor();
        const options = {
            quality: quality,
            // maxWidth: 800,
            // maxHeight: 800,
            success: function (result) {
                // preview.src = URL.createObjectURL(result);
                // preview.style.display = 'block';
                const optimizeImgUrl = URL.createObjectURL(result);

                main.style.display = "block";
                backImage.style.backgroundImage = `url(${optimizeImgUrl})`;
                topImage.style.backgroundImage = `url(${oldImgUrl})`;

                downloadButton.href = optimizeImgUrl;
                downloadButton.download = 'compressed-image.jpg'; 
                downloadButton.style.display = 'block'; 
            },
            error: function (e) {
                console.log(e.message);
            }
        };

        compressor.compress(file, options); 
    }
});

// 

window.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX + 'px';
    const imageMove = document.querySelector('.back-image');
    imageMove.style.width = mouseX;

});