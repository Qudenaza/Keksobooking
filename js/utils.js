'use strict';

(function() {

  window.utils = {
    randomInteger: function(min, max) { // Функция поиска случайного целого числа в диапозоне от min до max
      var rand = Math.floor(min + Math.random() * (max + 1 - min));
      return rand;
    },
    randomType: function(arr) { // Функция возвращает случайный элемент массива
      return arr[window.utils.randomInteger(0, arr.length - 1)];
    },
    randomFeatures: function(arr) { // Функция возвращает массив строк преимуществ случайной длины
      return arr.slice(window.utils.randomInteger(0, arr.length - 1, window.utils.randomInteger(0, arr.length - 1)));
    }
  };
})();