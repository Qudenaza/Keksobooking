'use strict';

// Переменные и константы
const OFFER_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
],
OFFER_TYPE = [
  'flat',
  'house',
  'bungalo'
],
OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
],
OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
],
OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'wahser',
  'elevator',
  'conditioner',
],
MAP_PIN = document.querySelector('template').content.querySelector('.map__pin'),
MAP_PINS = document.querySelector('.map__pins');

// Этот массив хранит обьекты обявлений
var ads = [],
    count = 1; // Вспомогательная переменная для увеличения значения в аватарке



// Функции и обработчики событий

// Шаблон обьекта обявления
function Template() {
  this.author = {
    avatar: 'img/avatars/user0' + count++ + '.png'
  };
  this.location = {
    x: randomInteger(300, 900),
    y: randomInteger(100, 500)
  };
  this.offer = {
    title: randomType(OFFER_TITLE),
    address: `${this.location.x}-${this.location.y}`,
    price: randomInteger(1000, 10000),
    type: randomType(OFFER_TYPE),
    rooms: randomInteger(1, 5),
    guests: randomInteger(1, 10),
    checkin: randomType(OFFER_CHECKIN),
    checkout: randomType(OFFER_CHECKOUT),
    features: randomFeatures(OFFER_FEATURES),
    description: '',
    photos: []
  };
};

// Эта функция создает восемь случайных обьявлений и добавляет их в массив
(function createAds() {
  for(var i = 0; i < 8; i++) {
    ads.push(new Template())
  }
})();

// Функция поиска случайного целого числа в диапозоне от min до max
function randomInteger(min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
}

// Функция возвращает случайный элемент массива
function randomType(arr) {
  return arr[randomInteger(0, arr.length - 1)];
}

// Функция возвращает массив строк преимуществ случайной длины
function randomFeatures(arr) {
  return arr.slice(randomInteger(0, arr.length - 1, randomInteger(0, arr.length - 1)));
}

// Функция создания пина
function createPin(i) {
  var pin = MAP_PIN.cloneNode(true),
      pinImg = pin.firstElementChild;
  
  pin.style.left = ads[i].location.x + 'px';
  pin.style.top = ads[i].location.y + 'px';

  pinImg.src = ads[i].author.avatar;

  return pin;
};

var fragment = document.createDocumentFragment();

for(var i = 0; i < ads.length; i++) {
  fragment.appendChild(createPin(i));
}

MAP_PINS.appendChild(fragment);
