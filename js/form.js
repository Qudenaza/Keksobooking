'use strict';

(function() {

const TIME_IN = document.querySelector('#timein'),
      TIME_OUT = document.querySelector('#timeout'),
      HOUSE_TYPE = document.querySelector('#type'),
      ROOMS = document.querySelector('#room_number'),
      CAPACITY = document.querySelector('#capacity');

// Синхронизация времени вьезда и выезда
TIME_IN.addEventListener('change', function(e) {
  for(var key in this.children) {
    if(this.children[key].selected) TIME_OUT.children[key].selected = true;
  };
});


// Синхронизация типа жилья и минимальной цены
HOUSE_TYPE.addEventListener('click', function(e) {
  var price = document.querySelector('#price');
  switch(e.target.value) {
    case 'bungalo':
      price.min = '0';
      break;
    case 'flat':
      price.min = '1000';
      break;
    case 'house':
      price.min = '5000';
      break;
    case 'palace':
      price.min = '10000';
      break;
    default:
      price.min = '0';
      break;        
  };
});

// При изменение количества комнат меняетья вместимость
ROOMS.addEventListener('change', function(e) {
  for(var key in this.children) {
    if(this.children[key].selected) CAPACITY.children[key].selected = true;
  };
});      

})();