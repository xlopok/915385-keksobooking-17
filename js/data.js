'use strict';

(function () {
  var map = document.querySelector('.map');
  // модуль, который создаёт данные;
  // 1. Создайте массив, состоящий из 8 сгенерированных JS объектов

  var housingTypeArray = ['palace', 'flat', 'house', 'bungalo'];
  var pinWidth = 50;
  var pinHeight = 70;

  // Получить рандомное число от и до
  function myRandom(from, to) {
    return Math.floor((Math.random() * (to - from + 1)) + from);
  }

  // Получить рандомное значение Х метки в зависисости от ширины блока
  var getMapWidth = function (block) {
    return myRandom(0, block.offsetWidth);
  };

  var mockerDataGenerator = function () {
    var dataArray = [];

    for (var i = 0; i < 8; i++) {

      dataArray[i] = {
        'author': {
          'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
          // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },
        'offer': {
          'type': myRandom(0, housingTypeArray.length - 1)
          // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        },

        'location': {
          'x': (getMapWidth(map) + (pinWidth / 2) + 'px'),
          //  случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
          'y': (myRandom(130, 630) + pinHeight + 'px')
          // случайное число, координата y метки на карте от 130 до 630.
        }
      };
    }
    return dataArray;
  };

  window.data = {
    mockerDataGenerator: mockerDataGenerator(),
    map: map
  };

})();
