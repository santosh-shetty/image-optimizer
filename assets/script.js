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

//  move before after image script
window.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX + 'px';
    const imageMove = document.querySelector('.back-image');
    imageMove.style.width = mouseX;

});

// File Upload script
function readURL(input) {
    if (input.files && input.files[0]) {
  
      var reader = new FileReader();
  
      reader.onload = function(e) {
        $('.image-upload-wrap').hide();
  
        $('.file-upload-image').attr('src', e.target.result);
        $('.file-upload-content').show();
  
        $('.image-title').html(input.files[0].name);
      };
  
      reader.readAsDataURL(input.files[0]);
  
    } else {
      removeUpload();
    }
  }
  
  function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
  }
  $('.image-upload-wrap').bind('dragover', function () {
          $('.image-upload-wrap').addClass('image-dropping');
      });
      $('.image-upload-wrap').bind('dragleave', function () {
          $('.image-upload-wrap').removeClass('image-dropping');
  });
  

  // Range value for quality Script
  const rangeInputs = document.querySelectorAll('input[type="range"]')
const numberInput = document.querySelector('input[type="number"]')
let isRTL = document.documentElement.dir === 'rtl'

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  let percentage = (val - min) * 100 / (max - min)
  if (isRTL) {
    percentage = (max - val) 
  }
  
  target.style.backgroundSize = percentage + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

numberInput.addEventListener('input', handleInputChange)

// Handle element change, check for dir attribute value change
function callback(mutationList, observer) {  mutationList.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
      isRTL = mutation.target.dir === 'rtl'
    }
  })
}

// Listen for body element change
const observer = new MutationObserver(callback)
observer.observe(document.documentElement, {attributes: true})