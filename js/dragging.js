

  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var pageWidthStart = document.documentElement.clientWidth;
  var minX = 0;
  var maxX = 0;

  effectLevelPin.style.left = 0 + 'px';

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var pageWidth = document.documentElement.clientWidth
      console.log(pageWidth)

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      console.log('Пин в точке ' + startCoords.x)
    if (pageWidth == document.documentElement.clientWidth) {
      console.log('Широкий экран')
      minX = 725
      maxX = 1175
    } else if (pageWidthStart > document.documentElement.clientWidth) {
      console.log('Узкий экран')
      minX = 350
      maxХ = 800
    }

      var condition = startCoords.x >= minX && startCoords.x <= maxX

  if (condition) {
      effectLevelValue.value = Math.round((effectLevelPin.offsetLeft - shift.x) / 4.5);
      console.log(effectLevelValue.value);
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectLevelPin.addEventListener('mousemove', function () {
    console.log(imgUploadPreview.style.cssText)
    if (imgUploadPreview.className == 'img-upload__preview effects__preview--chrome') {
      console.log('Chrome')
      imgUploadPreview.style.cssText = 'filter: grayscale(' + effectLevelValue.value / 100 +')'
    } else if (imgUploadPreview.className == 'img-upload__preview effects__preview--sepia') {
      console.log('Sepia')
      imgUploadPreview.style.cssText = 'filter: sepia(' + effectLevelValue.value / 100 +')'
    } else if (imgUploadPreview.className == 'img-upload__preview effects__preview--marvin') {
      console.log('Marvin')
      imgUploadPreview.style.cssText = 'filter: invert(' + effectLevelValue.value + '%' + ')'
    } else if (imgUploadPreview.className == 'img-upload__preview effects__preview--phobos') {
      console.log('Phobos')
      imgUploadPreview.style.cssText = 'filter: blur(' + Math.floor(effectLevelValue.value / 33) + 'px)'
    } else if (imgUploadPreview.className == 'img-upload__preview effects__preview--heat') {
      console.log('Heat')
      imgUploadPreview.style.cssText = 'filter: brightness(' + Math.floor(effectLevelValue.value / 33) + ')'
    }
  })

