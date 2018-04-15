'use strict';

(function() {



  // Отрисовка обьявлений на карте
(function adAdOnMap() {
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < ads.length; i++) {
    fragment.appendChild(createAd(i));
  };

  MAP.appendChild(fragment);

})();


window.card = {
  show: function(value) {  // Функция показывает обьявления соответствующие нажатому пину
    for(var key in MAP.children) {
      if(key === '0' || key === '1') continue;
      if(key === 'length') break;
      if(MAP.children[key].classList.contains('hidden')) continue;
      MAP.children[key].classList.add('hidden');
    };
    MAP.children[value].classList.remove('hidden');
  
    MAP.addEventListener('click', function(e) {
      card.close(e, value);
    });
  
    MAP.addEventListener('keydown', function(e) {
      if(e.keyCode === 27) card.close(e, value);
    });
  },
  close: function(e, value) { // Функция закрытия окна подробностей обьявления и снятия класса map__pin--active
    if(e.target.className === 'popup__close' || e.keyCode === 27) {
      MAP.children[value].classList.add('hidden');
      MAP_PINS.children[value].classList.remove('map__pin--active');
      MAP.removeEventListener('click', function(e) {
        card.close(e, value);
      });
    
      MAP.removeEventListener('keydown', function(e) {
        if(e.keyCode === 27) card.close(e, value);
      });
    };
  }
};

})();