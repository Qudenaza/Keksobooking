'use strict';

(function() {
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
    'washer',
    'elevator',
    'conditioner',
  ],
  MAP_CARD = document.querySelector('template').content.querySelector('.map__card'); // Шаблон объявления

window.ads = []; // Этот массив хранит обьекты обявлений
var count = 1; // Вспомогательная переменная для увеличения значения в аватарке


// Шаблон обьекта обявления
function Template() {
  this.author = {
    avatar: 'img/avatars/user0' + count++ + '.png'
  };
  this.location = {
    x: window.utils.randomInteger(300, 900) + 25,
    y: window.utils.randomInteger(100, 500) + 70
  };
  this.offer = {
    title: window.utils.randomType(OFFER_TITLE),
    address: `${this.location.x}-${this.location.y}`,
    price: window.utils.randomInteger(1000, 10000),
    type: window.utils.randomType(OFFER_TYPE),
    rooms: window.utils.randomInteger(1, 5),
    guests: window.utils.randomInteger(1, 10),
    checkin: window.utils.randomType(OFFER_CHECKIN),
    checkout: window.utils.randomType(OFFER_CHECKOUT),
    features: window.utils.randomFeatures(OFFER_FEATURES),
    description: '',
    photos: []
  };
};  


// Функция создания обьявления
window.createAd = function(i) {
  var ad = MAP_CARD.cloneNode(true),
      adImg = ad.querySelector('.popup__avatar'),
      adTitle = ad.querySelector('.popup__title'),
      adAddress = ad.querySelector('.popup__text--address'),
      adPrice = ad.querySelector('.popup__text--price'),
      adType = ad.querySelector('.popup__type'),
      adCapacity = ad.querySelector('.popup__text--capacity'),
      adTime = ad.querySelector('.popup__text--time'),
      adFeatures = ad.querySelector('.popup__features'),
      adDescr = ad.querySelector('.popup__description'),
      fragment = document.createDocumentFragment();

  adTitle.textContent = ads[i].offer.title;
  adAddress.textContent = ads[i].offer.address;
  adPrice.innderHTML = `<p class="popup__text popup__text--price">${ads[i].offer.price}&#x20bd;<span>/ночь</span></p>`;
  adType.textContent = ads[i].offer.type === 'flat' ? 'Квартира' :
  ads[i].offer.type === 'house' ? 'Дом' : 'Бунгало';
  adCapacity.textContent = `${ads[i].offer.rooms} комнаты(-ы) для ${ads[i].offer.guests} гостей`;
  adTime.textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
  adDescr.textContent = ads[i].offer.description;
  adImg.src = ads[i].author.avatar;

  for(var j = 0; j < ads[i].offer.features.length; j++) {
    var li = document.createElement('li');
    li.className = `popup__feature popup__feature--${ads[i].offer.features[j]}`;

    fragment.appendChild(li);
  };

  adFeatures.appendChild(fragment);

  return ad;
};

// Создает восемь объявлений и добавляет их в глобальный массив ads
(function createAds() {
  for(var i = 0; i < 8; i++) {
    ads.push(new Template())
  }
})();


})();