'use strict';

(function() {

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
window.adPin = function() {
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(i));
  };

  MAP_PINS.appendChild(fragment);
};

// Функция подсвечивает пин при клике на него и делает его активным
function onPinClickEvent(e) {
  for(var key in MAP_PINS.children) {
    if(key === '0' || key === '1') {
      continue;
    } else if(key === 'length') {
      break;
    };
    MAP_PINS.children[key].classList.remove('map__pin--active');

    if(MAP_PINS.children[key].firstChild === e.target || MAP_PINS.children[key] === e.target) {
      MAP_PINS.children[key].classList.add('map__pin--active');
      card.show(key);
    };
  };
};

// Обработчик события нажатия на пин
MAP_PINS.addEventListener('click', onPinClickEvent);
MAP_PINS.addEventListener('keydown', function(e) {
  if(e.keyCode === 27) {
    onPinClickEvent(e);
  };
});

})();