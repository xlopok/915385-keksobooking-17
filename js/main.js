'use strict';

// 1. Создайте массив, состоящий из 8 сгенерированных JS объектов

var housingTypeArray = ['palace', 'flat', 'house', 'bungalo'];

// Получить рандомное число от и до
function myRandom (from, to) {
  return Math.floor((Math.random() * (to - from + 1)) + from)
};

// Получить раномный элемент из массива
var getRandomArrayElement = function (myArray) {
  var rand = myArray[Math.floor(Math.random() * myArray.length)];
  return rand;
};

// Получить рандомное значение Х метки в зависисости от ширины блока

var getMapWidth = function (block) {
  return myRandom (0, block.offsetWidth)
}

var mockerDataGenerator = function () {
  var dataArray = [];

  for (var i = 0; i < 8; i++) {

    dataArray[i] = {
      "author": {
        "avatar": 'img/avatars/user' + '0' + myRandom (1, 8) +'.png'
        // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },
      "offer": {
        "type": getRandomArrayElement(housingTypeArray)
        // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      },

      "location": {
        "x": (getMapWidth(map) + 'px'),
        //  случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        "y": (myRandom (130, 630) + 'px')
        // случайное число, координата y метки на карте от 130 до 630.
      }
    }
  }
  return dataArray;
}

// --------------------------------------------------------------------

//2. У блока .map уберите класс .map--faded.

var map = document.querySelector('.map');
map.classList.remove('map--faded');
// --------------------------------------------------------------------


// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.

var labelsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderLabels = function (label) {
  var labelElement = labelsTemplate.cloneNode(true);

  labelElement.style.left = label.location.x;
  labelElement.style.top = label.location.y;
  labelElement.querySelector('img').src = label.author.avatar;
  labelElement.querySelector('img').alt = label.offer.type;

  return labelElement;
}

// Вызываем функцию для создания массива объектов с данными (пока не получаем данные с сервера)
var mocker = mockerDataGenerator();

// -------------------------------------------------------------------------------------------------------------------------------------------------

// 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.

var labelsEmbeded = map.querySelector('.map__pins');

var fragment = document.createDocumentFragment();
for (var i = 0; i < mocker.length; i++) {
  fragment.appendChild(renderLabels(mocker[i]));
}

labelsEmbeded.appendChild(fragment);

console.log(renderLabels(mocker[0]));
// console.log(renderLabels(mocker));

console.log(mockerDataGenerator());
