'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var photosArray = [];
var commentsCount = 6;
var quantity = 25;
var names =   ['Артем', 'Иван', 'Федор', 'Роман', 'Василий', 'Анна', 'Степан', 'Мария', 'Ярослава'];
var comment = [
               'В целом всё неплохо. Но не всё',
               'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
               'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
               'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
               'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
              ];


function randomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

var generateComments = function () {
  var comments = [];
  for (var j = 0; j < quantity; j++) {
    comments.push({
      avatar:'img/avatar'+ randomNumber(1,6) + '.svg',
      message:comment[randomNumber(0,4)],
      name:names[randomNumber(0, names.length - 1)]
    })
  }
  return comments[randomNumber(0, comments.length - 1)];;
};

var generatePhotos = function () {
  for (var i = 0; i < quantity; i++) {
    photosArray.push({
      url:'photos/' + (i + 1) + '.jpg',
      description:'описание фотографии',
      likes:randomNumber(15, 200),
      comments:generateComments(),
    })
  }
  return photosArray;
};

generatePhotos();

var renderPictures = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photosArray[k].url;
    pictureElement.querySelector('.picture__likes').textContent = photosArray[k].likes;
    pictureElement.querySelector('.picture__comments').textContent = photosArray[k].comments;

    return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < photosArray.length; k++) {
  fragment.appendChild(renderPictures(photosArray[k]));
}
pictures.appendChild(fragment);

var bigPictureRender = function () {
  bigPicture.classList.remove('hidden');
  document.querySelectorAll('img')[26].src = photosArray[0].url;
  document.querySelector('.likes-count').textContent = photosArray[0].likes;
  document.querySelector('.comments-count').textContent = commentsCount;
};

bigPictureRender();

var renderComments = function () {
  var elementComment = document.querySelector('.social__comment').cloneNode(true);

  elementComment.querySelector('.social__picture').alt = names[randomNumber(0, names.length - 1)];
  elementComment.querySelector('.social__picture').src = "img/avatar-"+ randomNumber(1, m) +".svg";
  elementComment.querySelector('.social__text').textContent = comment[randomNumber(0, comment.length - 1)];

  return elementComment;
}

var fragmentComment = document.createDocumentFragment();
for (var m = 0; m < commentsCount; m++) {
  fragmentComment.appendChild(renderComments());
}
document.querySelector('.social__comments').appendChild(fragmentComment);

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');

document.querySelector('.big-picture').classList.add('hidden'); // скрывает большую картинку, временное решение
// 4.2
var scaleControlDefault = 100;
var scaleStyles =  ['transform: scale(0.25)', 'transform: scale(0.5)', 'transform: scale(0.75)', 'transform: scale(1)'];

var openUploadOverlay = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden')
  document.querySelector('body').classList.add('modal-open')
  document.querySelector('.img-upload__preview').style.cssText='transform: scale(1)'
  document.querySelector('.scale__control--value').value = scaleControlDefault+"%"
  document.querySelector('.img-upload__preview').style.cssText = scaleStyles[3]
}

var closeUploadOverlay = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden')
  document.querySelector('body').classList.remove('modal-open')
  scaleControlDefault = 100
}

document.querySelector('#upload-file').addEventListener('change', openUploadOverlay);

document.querySelector('#upload-cancel').addEventListener('click', closeUploadOverlay);

document.querySelector('body').addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    if (evt.target !== document.querySelector('.text__hashtags')) {
      if (evt.target !== document.querySelector('.text__description')) {
        closeUploadOverlay()
      }
    }
  }
})

document.querySelector('.scale__control--bigger').addEventListener('click', function () {
  if (scaleControlDefault >= 25 && scaleControlDefault < 100) {
    scaleControlDefault += 25
  document.querySelector('.scale__control--value').value = scaleControlDefault +"%"
  }
    // scaleControlDefault += 25

  if (scaleControlDefault == 100) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[3]
  } else if (scaleControlDefault == 75) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[2]
  } else if (scaleControlDefault == 50) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[1]
  } else if (scaleControlDefault == 25) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[0]
  }
})

document.querySelector('.scale__control--smaller').addEventListener('click', function () {
  if (scaleControlDefault > 25 && scaleControlDefault <= 100) {
    scaleControlDefault -= 25
  document.querySelector('.scale__control--value').value = scaleControlDefault +"%"
  }
    // scaleControlDefault -= 25

  if (scaleControlDefault == 100) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[3]
  } else if (scaleControlDefault == 75) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[2]
  } else if (scaleControlDefault == 50) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[1]
  } else if (scaleControlDefault == 25) {
    document.querySelector('.img-upload__preview').style.cssText = scaleStyles[0]
  }
})

var effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

document.querySelector('.img-upload__effect-level').classList.add('hidden')
document.querySelector('.effects__list').addEventListener('click', function (evt) {
  document.querySelector('.img-upload__preview').className = 'img-upload__preview'
  document.querySelector('.img-upload__preview').style.cssText = ''
  for (var z = 0; z < document.querySelectorAll('.effects__radio').length; z++) {
   if (evt.target.value == document.querySelectorAll('.effects__radio')[z].value) {
     document.querySelector('.img-upload__preview').classList.toggle(effects[z])
     if (document.querySelector('.img-upload__preview').className == 'img-upload__preview effects__preview--none') {
      document.querySelector('.img-upload__effect-level').classList.add('hidden')
     } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden')
     }
   }
  }
})

