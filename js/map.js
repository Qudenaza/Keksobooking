'use strict';

(function() {
  // Переменные и константы
window.MAP = document.querySelector('.map');
window.MAP_PINS = MAP.querySelector('.map__pins');
window.MAP_PIN = document.querySelector('template').content.querySelector('.map__pin');

const MAP_CARD = document.querySelector('template').content.querySelector('.map__card'),
      MAP_FORM = document.querySelector('.ad-form'),
      MAIN_PIN = MAP.querySelector('.map__pin--main'),
      FORM_ADDRESS = document.querySelector('#address');


var pinsList, // Хранит все пины на карте
    count = 1; // Вспомогательная переменная для увеличения значения в аватарке


// Функции и обработчики событий
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
  MAIN_PIN.removeEventListener('mouseup', onMainPinClick);
}

// При загрузке страницы все поля формы недоступны
document.addEventListener('DOMContentLoaded', changeFieldsetCondition(true));


// При нажатии на главный пин запускается функция onMainPinClick
MAIN_PIN.addEventListener('mouseup', onMainPinClick);

MAP.addEventListener('click', function(e) {
  console.log(e.clientY);
})
MAIN_PIN.addEventListener('mousedown', function(e) {
  e.preventDefault();
  
  var cords = {
    x: e.clientX,
    y: e.clientY
  };

  function onMouseMove(evt) {
    evt.preventDefault();

    var shift = {
      x: cords.x - evt.clientX,
      y: cords.y - evt.clientY
    };

    cords = {
      x: evt.clientX,
      y: evt.clientY
    };

    if(cords.y < 150) MAIN_PIN.style.top = '90px';
    
    MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + 'px';
    MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + 'px';

    FORM_ADDRESS.value = `${evt.clientX} - ${evt.clientY}`;
  };

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    MAP.removeEventListener('mousemove', onMouseMove);
    MAP.removeEventListener('mouseup', onMouseUp);
  };

  MAP.addEventListener('mousemove', onMouseMove);
  MAP.addEventListener('mouseup', onMouseUp);
});


})();


// dialogHandle.addEventListener('mousedown', function(e) {
//   e.preventDefault();

//   function onMouseMove(evt) {
//     evt.preventDefault();

//     userDialog.style.top = (evt.clientY - 25) + 'px';
//     userDialog.style.left = (evt.clientX + 355) + 'px';

//   };

//   function onMouseUp(upEvt) {
//     upEvt.preventDefault();
//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
//   };

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// })