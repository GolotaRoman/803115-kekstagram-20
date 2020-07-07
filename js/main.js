'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var photosArray = [];
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
