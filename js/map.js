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
  'washer',
  'elevator',
  'conditioner',
],
MAP = document.querySelector('.map'),
MAP_PIN = document.querySelector('template').content.querySelector('.map__pin'),
MAP_PINS = MAP.querySelector('.map__pins'),
MAP_CARD = document.querySelector('template').content.querySelector('.map__card'),
MAP_FORM = document.querySelector('.ad-form'),
MAIN_PIN = MAP.querySelector('.map__pin--main'),
ENTER_KEY = 13,
ESC_KEY = 27;


// Этот массив хранит обьекты обявлений
var ads = [],
    pinsList, // Хранит все пины на карте
    count = 1; // Вспомогательная переменная для увеличения значения в аватарке



// Функции и обработчики событий

// Шаблон обьекта обявления
function Template() {
  this.author = {
    avatar: 'img/avatars/user0' + count++ + '.png'
  };
  this.location = {
    x: randomInteger(300, 900) + 25,
    y: randomInteger(100, 500) + 70
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


// Функция добавления пина на страницу
function adPin() {
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(i));
  }

  MAP_PINS.appendChild(fragment);
}

// Функция создания обьявления
function createAd(i) {
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
  }

  adFeatures.appendChild(fragment);

  return ad;
}

// Отрисовка обьявлений на карте
(function adAdOnMap() {
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < ads.length; i++) {
    fragment.appendChild(createAd(i));
  };

  MAP.appendChild(fragment);
})();


// Функция делает поля формы активными или неактивными в зависимости от аргумента bool
function changeFieldsetCondition(bool) {
  var fieldset = MAP_FORM.querySelectorAll('fieldset');

  fieldset.forEach((item, i) => fieldset[i].disabled = bool);
}

// Функция при нажатии на кнопку в центре добавляет пины и активирует форму
function onMainPinClick() {
  MAP.classList.remove('map--faded');
  adPin();
  MAP_FORM.classList.remove('ad-form--disabled');
  changeFieldsetCondition(false);
  pinsList = MAP_PINS.querySelectorAll('.map__pin:not(.map__pin--main)');
}

// При загрузке страницы все поля формы недоступны
document.addEventListener('DOMContentLoaded', changeFieldsetCondition(true));


// При нажатии на главный пин запускается функция onMainPinClick
MAIN_PIN.addEventListener('mouseup', onMainPinClick);

// Функция вешает класс актив на пин
function onPinClickEvent(e) {
  var btn = e.target.parentElement;
  
	if(btn.type === 'button') {
	  pinsList.forEach((item, i) => pinsList[i].classList.remove('map__pin--active'));
    
    btn.classList.add('map__pin--active');
  };

  for(var i = 0; i < pinsList.length; i++) {
    if(pinsList[i].classList.contains('map__pin--active')) {
     showAd(i);
     break;
    };
  };

  MAP.addEventListener('click', closeAd);
};


// Функция показывает обьявления соответствующие нажатому пину
function showAd(value) {
  var adsList = MAP.querySelectorAll('.map__card');

  for(var i = 0; i < adsList.length; i++) {
    if(adsList[i].classList.contains('hidden')) continue;
    adsList[i].classList.add('hidden');
  }

  adsList[value].classList.remove('hidden');
}

// Функция скрывает обьявления по нажатию на крестик, также убирает класс active у пина
function closeAd(e) {
  if(e.target.parentElement.classList.contains('map__card')) {
    e.target.parentElement.classList.add('hidden');
    for(var i = 0; i < pinsList.length; i++) {
      if(pinsList[i].classList.contains('map__pin--active')) {
        pinsList[i].classList.remove('map__pin--active');
        break;
      };
    };
    MAP.removeEventListener('click', closeAd);
  }
}

// Обработчик события нажатия на пин
MAP_PINS.addEventListener('click', onPinClickEvent);
MAP_PINS.addEventListener('keydown', openClose);

// Функция открытия и закрытия по нажатию на клавишы
function openClose(e) {
  var adsList = MAP.querySelectorAll('.map__card');
  if(e.keyCode === ESC_KEY) {
    for(var i = 0; i < pinsList.length; i++) {
      if(pinsList[i].classList.contains('map__pin--active')) {
        pinsList[i].classList.remove('map__pin--active');
        adsList[i].classList.add('hidden');
        break;
      }
    }
  } else if(e.keyCode === ENTER_KEY) {
    for(var i = 0; i < pinsList.length; i++) {
      pinsList.forEach((item, i) => pinsList[i].classList.remove('map__pin--active'));
    
      e.target.classList.add('map__pin--active');
    }
  };
}
 

var timeIn = document.querySelector('#timein'),
    timeOut = document.querySelector('#timeout'),
    houseType = document.querySelector('#type');

timeIn.addEventListener('click', function(e) {
  var timeOutOptions = timeOut.querySelectorAll('option');
      
  for(var i = 0; i < timeOutOptions.length; i++) {
    if(timeOutOptions[i].value === e.target.value) {
        timeOutOptions[i].selected = true;
        break;
    };
  ;}
});


houseType.addEventListener('click', function(e) {
	var price = document.querySelector('#price');
	if(e.target.value === 'flat') {
		price.min = '1000';
    } else if (e.target.value === 'bungalo') {
    	price.min = '0'
	} else if (e.target.value === 'palace') {
    	price.min = '10000'
	} else {
    	price.min = '5000'
	}
});

