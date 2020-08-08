'use strict';

var hashtagInput = document.querySelector('.text__hashtags');
var MAX_HASHTAGSQUANTITY = 5;
var MIN_HASHTAGLENGTH = 2;
var MAX_HASHTTAGLENGTH = 20;
var submitButton = document.querySelector('.img-upload__submit');
// var arr = [1,2,3,4,5,6,6];

submitButton.addEventListener('click',function () {
    var hashtagValue = document.querySelector('.text__hashtags').value;
    var hashtagSeparation = /\s*\s\s*/;
    var permissibleStems =  /^#[A-Za-zА-Яа-я0-9]+$/i;
    var hashArr = hashtagValue.split(hashtagSeparation)
    var count = 0;
    var errors = 0;

    if (hashArr.length > MAX_HASHTAGSQUANTITY) {
      errors++
      hashtagInput.setCustomValidity('Максимальное количество хэштэгов 5')
    }

    for (var i = 0; i < hashArr.length; i++) {
        if (hashArr[i][0] !== '#') {
        errors++
        hashtagInput.setCustomValidity('Хэштег должен начинаться с символа #')
      } else if (hashArr[i].length < MIN_HASHTAGLENGTH) {
        errors++
        hashtagInput.setCustomValidity('Хэштег не может состоять только из символа #')
      } else if (permissibleStems.test(hashArr[i]) == !true) {
        errors++
        hashtagInput.setCustomValidity('Введен запрещенный символ')
      } else if (hashArr[i].length > MAX_HASHTTAGLENGTH) {
        errors++
        hashtagInput.setCustomValidity('Хэштег не может состоять более чем из 20 символов')
      }
    }

    for (let m = 0; m < hashArr.length; m++) {
      // console.log('количество тэгов: ' + hashArr.length)
      for (let i = 0; i < hashArr.length; i++) {
        if (hashArr[m].toLowerCase() == hashArr[i].toLowerCase()) {
          count++
          // console.log('Счётчик: ' + count)
        }
      }
    }
    if (hashArr.length !== count) {
      errors++
      hashtagInput.setCustomValidity('Не может быть два и более одинаковых хэш-тэгов')
      console.log('Повторы есть')
    }

    if (errors == 0) {
      hashtagInput.setCustomValidity('')
    }

    // console.log('Конец ' + count)
    console.log('Ошибок ' + errors)
});







